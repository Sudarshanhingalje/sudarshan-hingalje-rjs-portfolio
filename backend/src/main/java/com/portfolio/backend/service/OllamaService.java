package com.portfolio.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

/**
 * OllamaService — calls the local Ollama /api/generate endpoint.
 *
 * POST http://localhost:11434/api/generate
 * Body: { "model": "llama3.2:3b", "prompt": "...", "stream": false }
 * Response: { "response": "AI reply text here", ... }
 */
@Service
public class OllamaService {

    private final RestTemplate restTemplate;

    @Value("${app.ollama.url}")
    private String ollamaUrl;

    @Value("${app.ollama.model}")
    private String ollamaModel;

    // Fallback message shown when Ollama is not running
    private static final String OFFLINE_FALLBACK =
            "I'm currently offline, but I can tell you that Sudarshan Hingalje is a " +
            "Full Stack Java Developer (Java, Spring Boot, React, MySQL). " +
            "📧 Contact: sudarshanhigalje1@gmail.com | " +
            "🐙 GitHub: github.com/Sudarshanhingalje";

    public OllamaService(RestTemplateBuilder builder) {
        this.restTemplate = builder
                .connectTimeout(Duration.ofSeconds(10))
                .readTimeout(Duration.ofSeconds(90))
                .build();
    }

    /**
     * Ask Ollama a question with portfolio context prepended.
     *
     * @param portfolioContext the portfolio bio/skills/projects text (from DB)
     * @param userMessage      the visitor's question
     * @return AI-generated reply string
     */
    public String ask(String portfolioContext, String userMessage) {
        try {
            // Build the full prompt
            String contextSection = (portfolioContext != null && !portfolioContext.isBlank())
                    ? portfolioContext
                    : "Name: Sudarshan Hingalje\nRole: Full Stack Java Developer\n" +
                      "Skills: Java, Spring Boot, React, MySQL, REST APIs, JWT\n" +
                      "Email: sudarshanhigalje1@gmail.com\n" +
                      "GitHub: https://github.com/Sudarshanhingalje";

            String fullPrompt = String.format(
                    "You are Sudarshan Hingalje. Answer in the FIRST PERSON as Sudarshan himself. " +
                    "Detect the language of the User Question. You MUST reply in the same language:\n" +
                    "- If the question is in Marathi (मराठी), answer in fluent Marathi.\n" +
                    "- If the question is in Hindi (हिंदी), answer in fluent Hindi.\n" +
                    "- If the question is in English, answer in English.\n" +
                    "Use ONLY the context below to answer. If replying in Marathi or Hindi, translate the portfolio details into that language accurately and naturally. " +
                    "Be natural, extremely concise, and friendly.\n" +
                    "CRITICAL: Answer in exactly 2 to 5 lines (maximum 7 lines). Never exceed 7 lines under any circumstances.\n" +
                    "Be direct and conversational. Do not write long essays or add unnecessary background details.\n\n" +
                    "=== PORTFOLIO CONTEXT ===\n%s\n=== END CONTEXT ===\n\n" +
                    "User Question: %s\n\nAnswer (in first person as Sudarshan, matching the question's language):",
                    contextSection.trim(),
                    userMessage.trim()
            );

            // Build request
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", ollamaModel);
            requestBody.put("prompt", fullPrompt);
            requestBody.put("stream", false);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // POST to Ollama /api/generate
            ResponseEntity<Map> response = restTemplate.postForEntity(ollamaUrl, entity, Map.class);

            Map<?, ?> body = response.getBody();
            if (body != null && body.containsKey("response")) {
                String reply = (String) body.get("response");
                return reply != null ? reply.trim() : OFFLINE_FALLBACK;
            }

            return OFFLINE_FALLBACK;

        } catch (ResourceAccessException e) {
            // Ollama is not running or unreachable
            System.err.println("⚠️  OllamaService: Ollama is OFFLINE — " + e.getMessage());
            return OFFLINE_FALLBACK;

        } catch (Exception e) {
            System.err.println("⚠️  OllamaService: Unexpected error — " + e.getMessage());
            return OFFLINE_FALLBACK;
        }
    }

    /** Returns the configured Ollama URL (for admin debug panel) */
    public String getOllamaUrl() { return ollamaUrl; }

    /** Returns the configured model name (for admin debug panel) */
    public String getOllamaModel() { return ollamaModel; }
}
