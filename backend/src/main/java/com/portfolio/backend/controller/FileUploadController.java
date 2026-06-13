package com.portfolio.backend.controller;

import com.portfolio.backend.service.GitHubStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/upload")
public class FileUploadController {

    private final GitHubStorageService gitHubStorageService;

    public FileUploadController(GitHubStorageService gitHubStorageService) {
        this.gitHubStorageService = gitHubStorageService;
    }

    @PostMapping("/project")
    public ResponseEntity<?> uploadProjectImage(@RequestParam("file") MultipartFile file) {
        return handleUpload("projects", file);
    }

    @PostMapping("/certificate")
    public ResponseEntity<?> uploadCertificateImage(@RequestParam("file") MultipartFile file) {
        return handleUpload("certificates", file);
    }

    @PostMapping("/resume")
    public ResponseEntity<?> uploadResumePdf(@RequestParam("file") MultipartFile file) {
        return handleUpload("resumes", file);
    }

    @PostMapping("/video")
    public ResponseEntity<?> uploadIntroVideo(@RequestParam("file") MultipartFile file) {
        return handleUpload("videos", file);
    }

    private ResponseEntity<?> handleUpload(String folder, MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "File is empty."));
        }

        try {
            // Generate a safe unique filename preserving original extension
            String originalName = file.getOriginalFilename();
            String extension = "";
            if (originalName != null && originalName.contains(".")) {
                extension = originalName.substring(originalName.lastIndexOf("."));
                originalName = originalName.substring(0, originalName.lastIndexOf("."));
            }
            
            // Sanitize filename
            String cleanName = originalName.replaceAll("[^a-zA-Z0-9-_]", "_");
            String fileName = cleanName + "_" + UUID.randomUUID().toString().substring(0, 8) + extension;

            byte[] bytes = file.getBytes();
            String downloadUrl = gitHubStorageService.uploadFile(folder, fileName, bytes);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "url", downloadUrl,
                    "fileName", fileName
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Failed to upload file to GitHub: " + e.getMessage()
            ));
        }
    }
}
