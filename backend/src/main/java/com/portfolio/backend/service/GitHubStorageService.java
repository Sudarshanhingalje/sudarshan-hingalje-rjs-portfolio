package com.portfolio.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GitHubStorageService {

    @Value("${GITHUB_TOKEN:}")
    private String githubToken;

    @Value("${GITHUB_ASSET_REPO:}")
    private String githubAssetRepo;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Upload a file to GitHub. Handles 409 conflicts by always fetching
     * the existing SHA before PUT, and falls back to a uniquified filename
     * if a directory collision occurs.
     *
     * @param folder    Sub-folder inside the repo (e.g. "resumes", "projects")
     * @param fileName  Target filename
     * @param fileBytes Raw bytes of the file
     * @return Public download URL (raw.githubusercontent.com)
     */
    public String uploadFile(String folder, String fileName, byte[] fileBytes) {
        if (githubToken == null || githubToken.isEmpty()) {
            throw new IllegalStateException("GITHUB_TOKEN is not configured in environment.");
        }
        if (githubAssetRepo == null || githubAssetRepo.isEmpty()) {
            throw new IllegalStateException("GITHUB_ASSET_REPO is not configured in environment.");
        }

        // Normalise repo path – strip https://github.com/ prefix and trailing slash
        String repoPath = githubAssetRepo
                .replace("https://github.com/", "")
                .replaceAll("/+$", "")
                .trim();

        // Sanitise folder name (no leading/trailing slashes)
        String cleanFolder = folder.replaceAll("^/+|/+$", "").trim();

        // Build the API URL
        String apiUrl = String.format(
                "https://api.github.com/repos/%s/contents/%s/%s",
                repoPath, cleanFolder, fileName);

        HttpHeaders headers = buildHeaders();

        // ── Step 1: Try to get existing file SHA ─────────────────────────────
        String sha = fetchSha(apiUrl, headers);

        // ── Step 2: If item exists but is a directory (sha == null despite 200),
        //            we rename the file to avoid the conflict.
        // This should rarely happen but guards against stale repo structure.

        // ── Step 3: Base64-encode the file content ────────────────────────────
        String base64Content = Base64.getEncoder().encodeToString(fileBytes);

        // ── Step 4: Build PUT payload ─────────────────────────────────────────
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", "Upload via Portfolio Admin: " + cleanFolder + "/" + fileName);
        body.put("content", base64Content);
        if (sha != null && !sha.isBlank()) {
            body.put("sha", sha); // required when overwriting an existing file
        }

        HttpEntity<Map<String, Object>> putEntity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> putResponse =
                    restTemplate.exchange(apiUrl, HttpMethod.PUT, putEntity, Map.class);

            if (putResponse.getStatusCode().is2xxSuccessful() && putResponse.getBody() != null) {
                return extractDownloadUrl(putResponse.getBody(), repoPath, cleanFolder, fileName);
            }
            throw new RuntimeException("GitHub PUT returned: " + putResponse.getStatusCode());

        } catch (HttpClientErrorException.Conflict ex) {
            // 409 still happened – the file is locked or path is a directory.
            // Retry with a UUID-suffixed filename to break the conflict.
            String[] parts = fileName.split("\\.");
            String baseName = parts.length > 1 ? String.join(".", Arrays.copyOf(parts, parts.length - 1)) : fileName;
            String ext = parts.length > 1 ? "." + parts[parts.length - 1] : "";
            String newFileName = baseName + "_" + UUID.randomUUID().toString().substring(0, 6) + ext;

            String retryUrl = String.format(
                    "https://api.github.com/repos/%s/contents/%s/%s",
                    repoPath, cleanFolder, newFileName);

            Map<String, Object> retryBody = new LinkedHashMap<>();
            retryBody.put("message", "Upload via Portfolio Admin (retry): " + cleanFolder + "/" + newFileName);
            retryBody.put("content", base64Content);

            HttpEntity<Map<String, Object>> retryEntity = new HttpEntity<>(retryBody, headers);
            ResponseEntity<Map> retryResponse =
                    restTemplate.exchange(retryUrl, HttpMethod.PUT, retryEntity, Map.class);

            if (retryResponse.getStatusCode().is2xxSuccessful() && retryResponse.getBody() != null) {
                return extractDownloadUrl(retryResponse.getBody(), repoPath, cleanFolder, newFileName);
            }
            throw new RuntimeException("GitHub upload failed even on retry: " + retryResponse.getStatusCode());

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file to GitHub: " + e.getMessage(), e);
        }
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private HttpHeaders buildHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + githubToken);
        headers.set("Accept", "application/vnd.github+json");
        headers.set("X-GitHub-Api-Version", "2022-11-28");
        headers.set("User-Agent", "Portfolio-Spring-Backend/1.0");
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    /**
     * Fetch the SHA of an existing file. Returns null if file does not exist.
     */
    private String fetchSha(String url, HttpHeaders headers) {
        try {
            HttpEntity<?> getEntity = new HttpEntity<>(headers);
            ResponseEntity<Map> getResponse =
                    restTemplate.exchange(url, HttpMethod.GET, getEntity, Map.class);
            if (getResponse.getStatusCode().is2xxSuccessful() && getResponse.getBody() != null) {
                Object sha = getResponse.getBody().get("sha");
                return sha != null ? sha.toString() : null;
            }
        } catch (HttpClientErrorException.NotFound ignored) {
            // File doesn't exist yet — that's fine
        } catch (Exception ignored) {
            // Any other error — proceed without SHA
        }
        return null;
    }

    /**
     * Extract the public raw download URL from GitHub's PUT response.
     * Falls back to constructing the raw URL if download_url is absent.
     */
    @SuppressWarnings("unchecked")
    private String extractDownloadUrl(Map<?, ?> responseBody, String repoPath, String folder, String fileName) {
        Object contentObj = responseBody.get("content");
        if (contentObj instanceof Map<?, ?> contentMap) {
            Object downloadUrl = contentMap.get("download_url");
            if (downloadUrl != null && !downloadUrl.toString().isBlank()) {
                return downloadUrl.toString();
            }
        }
        // Fallback: construct raw URL manually
        // Extract owner/repo from repoPath
        String[] parts = repoPath.split("/");
        String owner = parts.length > 0 ? parts[0] : "";
        String repo  = parts.length > 1 ? parts[1] : "";
        return String.format("https://raw.githubusercontent.com/%s/%s/main/%s/%s",
                owner, repo, folder, fileName);
    }
}
