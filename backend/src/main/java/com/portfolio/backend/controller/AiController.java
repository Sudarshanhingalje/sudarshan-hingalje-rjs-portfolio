package com.portfolio.backend.controller;

import com.portfolio.backend.model.ChatLog;
import com.portfolio.backend.model.Settings;
import com.portfolio.backend.repository.ChatLogRepository;
import com.portfolio.backend.repository.SettingsRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping
public class AiController {

    private final ChatLogRepository chatLogRepository;
    private final SettingsRepository settingsRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${app.ollama.url}")
    private String ollamaUrl;

    @Value("${app.ollama.model}")
    private String ollamaModel;

    private boolean isChatbotActive = true;
    private String lastError = "None";

    public AiController(ChatLogRepository chatLogRepository, SettingsRepository settingsRepository) {
        this.chatLogRepository = chatLogRepository;
        this.settingsRepository = settingsRepository;
    }

    // Public Voice Assistant endpoint (used by the n8n webhook & header.jsx)
    @PostMapping("/webhook/chat")
    public ResponseEntity<?> handleVoiceAssistant(@RequestBody Map<String, String> req,
                                                   HttpServletRequest httpRequest) {
        String userQuery = req.get("message");
        if (userQuery == null || userQuery.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Message cannot be empty"));
        }

        if (!isChatbotActive) {
            return ResponseEntity.ok(Map.of("message", "The AI voice assistant is currently disabled by the owner."));
        }

        String aiResponse = "Sorry, I am unable to connect to the AI brain right now.";
        int tokenCost = 0;

        try {
            // Get System Prompt behavioral instructions from settings
            Settings settings = settingsRepository.findAll().stream().findFirst()
                    .orElse(Settings.builder()
                            .systemPrompt("You are an assistant for Sudarshan's portfolio. Be concise and professional.")
                            .build());

            // Format Ollama request body
            Map<String, Object> systemMsg = new HashMap<>();
            systemMsg.put("role", "system");
            systemMsg.put("content", settings.getSystemPrompt());

            Map<String, Object> userMsg = new HashMap<>();
            userMsg.put("role", "user");
            userMsg.put("content", userQuery);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", ollamaModel);
            requestBody.put("messages", List.of(systemMsg, userMsg));
            requestBody.put("stream", false);

            // Call local Ollama API
            ResponseEntity<Map> response = restTemplate.postForEntity(ollamaUrl, requestBody, Map.class);
            Map<?, ?> body = response.getBody();

            if (body != null && body.containsKey("message")) {
                Map<?, ?> messageObj = (Map<?, ?>) body.get("message");
                if (messageObj != null && messageObj.containsKey("content")) {
                    aiResponse = (String) messageObj.get("content");
                }
            }

            // Rough token estimation (1 word ≈ 1.3 tokens)
            tokenCost = (int) Math.round(
                    (userQuery.split("\\s+").length + aiResponse.split("\\s+").length) * 1.3);

        } catch (Exception e) {
            System.err.println("⚠️ AiController: Ollama API call failed: " + e.getMessage());
            this.lastError = e.getClass().getSimpleName() + ": " + e.getMessage();
            if (e instanceof org.springframework.web.client.HttpStatusCodeException) {
                this.lastError += " | Body: " + ((org.springframework.web.client.HttpStatusCodeException) e).getResponseBodyAsString();
            }
            aiResponse = "I'm having trouble reaching my AI right now, but Sudarshan Hingalje is a "
                    + "Full Stack Java Developer. Contact: sudarshanhigalje1@gmail.com";
        } finally {
            // Always log the interaction
            ChatLog log = ChatLog.builder()
                    .sessionHash(UUID.randomUUID().toString().substring(0, 8))
                    .userQuery(userQuery)
                    .aiResponse(aiResponse)
                    .tokens(tokenCost)
                    .build();
            chatLogRepository.save(log);
        }

        return ResponseEntity.ok(Map.of("message", aiResponse));
    }

    // Admin: Get AI management panel data
    @GetMapping("/ai/management")
    public ResponseEntity<?> getAiManagement() {
        Settings settings = settingsRepository.findAll().stream().findFirst()
                .orElse(Settings.builder().systemPrompt("").build());

        List<ChatLog> logs = chatLogRepository.findAllByOrderByCreatedAtDesc();
        long totalTokens = logs.stream().mapToLong(ChatLog::getTokens).sum();

        Map<String, Object> stats = Map.of(
                "usage", logs.size(),
                "limit", 1000,
                "active", isChatbotActive,
                "totalTokens", totalTokens
        );

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                        "systemPrompt", settings.getSystemPrompt(),
                        "chatLogs", logs.subList(0, Math.min(logs.size(), 20)),
                        "stats", stats,
                        "lastError", lastError
                )
        ));
    }

    // Admin: Update system prompt instructions
    @PutMapping("/ai/system-prompt")
    public ResponseEntity<?> updateSystemPrompt(@RequestBody Map<String, String> req) {
        String newPrompt = req.get("systemPrompt");
        if (newPrompt == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "systemPrompt is required"));
        }

        Settings settings = settingsRepository.findAll().stream().findFirst()
                .orElse(new Settings());
        settings.setSystemPrompt(newPrompt);
        settingsRepository.save(settings);

        return ResponseEntity.ok(Map.of("success", true, "message", "System prompt updated"));
    }

    // Admin: Toggle chatbot on/off
    @PutMapping("/ai/toggle")
    public ResponseEntity<?> toggleChatbot(@RequestBody Map<String, Boolean> req) {
        Boolean active = req.get("active");
        if (active == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "active field is required"));
        }
        this.isChatbotActive = active;
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Chatbot status updated to: " + (active ? "ENABLED" : "DISABLED")
        ));
    }

    // Debug: Get last Gemini API call error
    @GetMapping("/ai/debug")
    public ResponseEntity<?> getAiDebug() {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "lastError", lastError != null ? lastError : "None",
                "ollamaUrl", ollamaUrl,
                "ollamaModel", ollamaModel
        ));
    }
}
