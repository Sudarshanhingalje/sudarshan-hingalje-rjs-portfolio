package com.portfolio.backend.controller;

import com.portfolio.backend.model.Settings;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.SettingsRepository;
import com.portfolio.backend.repository.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/settings")
public class SettingsController {

    private final SettingsRepository settingsRepository;
    private final ProjectRepository projectRepository;

    public SettingsController(SettingsRepository settingsRepository, ProjectRepository projectRepository) {
        this.settingsRepository = settingsRepository;
        this.projectRepository = projectRepository;
    }


    @GetMapping
    public ResponseEntity<?> getSettings() {
        Settings settings = settingsRepository.findAll().stream().findFirst()
                .orElse(Settings.builder()
                        .ownerName("Sudarshan Hingalje")
                        .tagline("Full Stack Developer")
                        .githubUrl("https://github.com/Sudarshanhingalje")
                        .linkedinUrl("https://linkedin.com/in/sudarshan-hingalje-b07993158")
                        .whatsappNumber("9579853955")
                        .systemPrompt("")
                        .build());

        String dbPort = System.getProperty("DB_PORT");
        if (dbPort == null || dbPort.isEmpty()) {
            dbPort = "3306";
        }
        String smtpPort = System.getProperty("SMTP_PORT");
        if (smtpPort == null || smtpPort.isEmpty()) {
            smtpPort = "587";
        }

        java.util.Map<String, Object> data = new java.util.HashMap<>();
        data.put("id", settings.getId());
        data.put("ownerName", settings.getOwnerName());
        data.put("tagline", settings.getTagline());
        data.put("githubUrl", settings.getGithubUrl());
        data.put("linkedinUrl", settings.getLinkedinUrl());
        data.put("whatsappNumber", settings.getWhatsappNumber());
        data.put("videoUrl", settings.getVideoUrl());
        data.put("systemPrompt", settings.getSystemPrompt());
        data.put("adEnabled", settings.isAdEnabled());
        data.put("adMode", settings.getAdMode());
        data.put("adProjectId", settings.getAdProjectId());
        data.put("dbPort", dbPort);
        data.put("smtpPort", smtpPort);

        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @PutMapping
    public ResponseEntity<?> updateSettings(@RequestBody java.util.Map<String, Object> payload) {
        Settings settings = settingsRepository.findAll().stream().findFirst()
                .orElse(new Settings());

        settings.setOwnerName((String) payload.get("ownerName"));
        settings.setTagline((String) payload.get("tagline"));
        settings.setGithubUrl((String) payload.get("githubUrl"));
        settings.setLinkedinUrl((String) payload.get("linkedinUrl"));
        settings.setWhatsappNumber((String) payload.get("whatsappNumber"));
        settings.setVideoUrl((String) payload.get("videoUrl"));

        if (payload.containsKey("adEnabled")) {
            settings.setAdEnabled(Boolean.TRUE.equals(payload.get("adEnabled")));
        }
        if (payload.containsKey("adMode") && payload.get("adMode") != null) {
            settings.setAdMode((String) payload.get("adMode"));
        }
        if (payload.containsKey("adProjectId")) {
            Object projId = payload.get("adProjectId");
            if (projId == null) {
                settings.setAdProjectId(null);
            } else if (projId instanceof Number) {
                settings.setAdProjectId(((Number) projId).longValue());
            } else {
                try { settings.setAdProjectId(Long.parseLong(projId.toString())); } catch (Exception ignored) {}
            }
        }

        if (settings.getSystemPrompt() == null) {
            settings.setSystemPrompt("You are an assistant for Sudarshan's portfolio.");
        }

        Settings saved = settingsRepository.save(settings);

        String dbPort = (String) payload.get("dbPort");
        String smtpPort = (String) payload.get("smtpPort");
        if (dbPort != null && smtpPort != null) {
            updateEnvFile(dbPort, smtpPort);
        }

        java.util.Map<String, Object> data = new java.util.HashMap<>();
        data.put("id", saved.getId());
        data.put("ownerName", saved.getOwnerName());
        data.put("tagline", saved.getTagline());
        data.put("githubUrl", saved.getGithubUrl());
        data.put("linkedinUrl", saved.getLinkedinUrl());
        data.put("whatsappNumber", saved.getWhatsappNumber());
        data.put("videoUrl", saved.getVideoUrl());
        data.put("systemPrompt", saved.getSystemPrompt());
        data.put("adEnabled", saved.isAdEnabled());
        data.put("adMode", saved.getAdMode());
        data.put("adProjectId", saved.getAdProjectId());
        data.put("dbPort", dbPort != null ? dbPort : System.getProperty("DB_PORT", "3306"));
        data.put("smtpPort", smtpPort != null ? smtpPort : System.getProperty("SMTP_PORT", "587"));

        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    /**
     * Public endpoint — resolves the active advertisement project for the portfolio homepage.
     * No auth required so the public portfolio page can fetch it.
     */
    @GetMapping("/ad")
    public ResponseEntity<?> getAdProject() {
        Settings settings = settingsRepository.findAll().stream().findFirst().orElse(null);

        if (settings == null || !settings.isAdEnabled()) {
            return ResponseEntity.ok(Map.of("success", true, "adEnabled", false));
        }

        Project project = null;
        if ("SPECIFIC".equalsIgnoreCase(settings.getAdMode()) && settings.getAdProjectId() != null) {
            project = projectRepository.findById(settings.getAdProjectId()).orElse(null);
        }
        if (project == null) {
            project = projectRepository.findTopByOrderByIdDesc();
        }

        if (project == null) {
            return ResponseEntity.ok(Map.of("success", true, "adEnabled", false));
        }

        return ResponseEntity.ok(Map.of("success", true, "adEnabled", true, "project", project));
    }

    private void updateEnvFile(String dbPort, String smtpPort) {
        try {
            java.io.File envFile = new java.io.File(".env");
            if (!envFile.exists()) {
                envFile.createNewFile();
            }
            java.util.List<String> lines = java.nio.file.Files.readAllLines(envFile.toPath());
            boolean dbPortUpdated = false;
            boolean smtpPortUpdated = false;

            for (int i = 0; i < lines.size(); i++) {
                String line = lines.get(i).trim();
                if (line.startsWith("DB_PORT=")) {
                    lines.set(i, "DB_PORT=" + dbPort);
                    dbPortUpdated = true;
                } else if (line.startsWith("SMTP_PORT=")) {
                    lines.set(i, "SMTP_PORT=" + smtpPort);
                    smtpPortUpdated = true;
                }
            }

            if (!dbPortUpdated) {
                lines.add("DB_PORT=" + dbPort);
            }
            if (!smtpPortUpdated) {
                lines.add("SMTP_PORT=" + smtpPort);
            }

            java.nio.file.Files.write(envFile.toPath(), lines);
            System.setProperty("DB_PORT", dbPort);
            System.setProperty("SMTP_PORT", smtpPort);
            System.out.println("🌱 Updated .env with DB_PORT=" + dbPort + " and SMTP_PORT=" + smtpPort);
        } catch (Exception e) {
            System.err.println("⚠️ Failed to update .env file: " + e.getMessage());
        }
    }
}
