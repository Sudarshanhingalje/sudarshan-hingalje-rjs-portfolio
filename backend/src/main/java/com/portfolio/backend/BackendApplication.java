package com.portfolio.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

// ─── Main Application Entry ──────────────────────────────────────────────────
// Initializes the Spring context, enables database auditing and background schedulers.
// ─────────────────────────────────────────────────────────────────────────────

@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
public class BackendApplication {
    public static void main(String[] args) {
        try {
            java.io.File envFile = new java.io.File(".env");
            if (envFile.exists()) {
                java.nio.file.Files.lines(envFile.toPath()).forEach(line -> {
                    line = line.trim();
                    if (!line.isEmpty() && !line.startsWith("#") && line.contains("=")) {
                        int index = line.indexOf("=");
                        String key = line.substring(0, index).trim();
                        String value = line.substring(index + 1).trim();
                        if (value.startsWith("\"") && value.endsWith("\"") && value.length() > 1) {
                            value = value.substring(1, value.length() - 1);
                        } else if (value.startsWith("'") && value.endsWith("'") && value.length() > 1) {
                            value = value.substring(1, value.length() - 1);
                        }
                        System.setProperty(key, value);
                    }
                });
                System.out.println("🌱 Loaded environment variables from: " + envFile.getAbsolutePath());
            }
        } catch (Exception e) {
            System.err.println("⚠️ Failed to load .env file: " + e.getMessage());
        }

        SpringApplication.run(BackendApplication.class, args);
    }
}
