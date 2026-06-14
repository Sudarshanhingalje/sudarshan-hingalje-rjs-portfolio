package com.portfolio.backend.controller;

import com.portfolio.backend.model.ChatLog;
import com.portfolio.backend.model.Settings;
import com.portfolio.backend.repository.ChatLogRepository;
import com.portfolio.backend.repository.SettingsRepository;
import com.portfolio.backend.service.OllamaService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping
public class AiController {

    private final ChatLogRepository chatLogRepository;
    private final SettingsRepository settingsRepository;
    private final OllamaService ollamaService;

    private boolean isChatbotActive = true;
    private String lastError = "None";

    // Default portfolio context used when DB has none
    private static final String DEFAULT_CONTEXT =
        "Name: Sudarshan Hingalje\n" +
        "Role: Full Stack Java Developer & Software Engineer\n\n" +
        "=== SKILLS ===\n" +
        "Frontend: React.js, HTML, CSS, JavaScript, Redux, Tailwind CSS, Next.js, Vite\n" +
        "Backend: Java, Spring Boot, Spring Security, JWT, REST APIs, Node.js\n" +
        "Database: MySQL, MongoDB, Supabase\n" +
        "Cloud & Tools: AWS EC2, Git, GitHub, Vercel, Netlify, Postman\n\n" +
        "=== PROJECTS ===\n" +
        "1. Wild Oasis Hotel Suite — Next.js + Supabase full-stack hotel booking & admin dashboard\n" +
        "2. ScrapSavvy — Java Spring Boot + React waste management platform (AWS EC2 deployed)\n" +
        "3. Fast React Pizza — React + Redux real-time pizza ordering app\n" +
        "4. Pizza Delivery App — Full stack MERN with Razorpay payment integration\n" +
        "5. Elevora AI — AI-powered business automation platform\n" +
        "6. Denta AI — Smart dental clinic management system\n\n" +
        "=== EXPERIENCE ===\n" +
        "- Full Stack Developer (Project Work) — Wild Oasis Project (2025–Present)\n" +
        "- Frontend Developer Intern — Harshad Enterprises, Pune (Jan–Jun 2023)\n" +
        "- CDAC Trainee (PG-DAC) — Advanced Computing, Pune (Jan–Sep 2024)\n\n" +
        "=== EDUCATION ===\n" +
        "- Post Graduate Diploma in Advanced Computing (PG-DAC) — CDAC Pune, 2024\n" +
        "- Bachelor of Engineering — Computer Engineering\n\n" +
        "=== CONTACT & LINKS ===\n" +
        "Email: sudarshanhigalje1@gmail.com\n" +
        "GitHub: https://github.com/Sudarshanhingalje\n" +
        "LinkedIn: https://linkedin.com/in/sudarshan-hingalje-b07993158\n" +
        "WhatsApp: +91 9579853955\n" +
        "Location: Pune, Maharashtra, India\n\n" +
        "=== ABOUT ===\n" +
        "Sudarshan is a passionate Full Stack Java Developer with expertise in building scalable " +
        "web applications. He has strong fundamentals in both frontend (React) and backend (Java/Spring Boot) " +
        "development, with hands-on experience in REST APIs, JWT authentication, MySQL, and cloud deployment.";

    public AiController(ChatLogRepository chatLogRepository,
                        SettingsRepository settingsRepository,
                        OllamaService ollamaService) {
        this.chatLogRepository = chatLogRepository;
        this.settingsRepository = settingsRepository;
        this.ollamaService = ollamaService;
    }

    // ─── Helper: get portfolio context from DB ────────────────────────────────
    private String getPortfolioContext() {
        return settingsRepository.findAll().stream().findFirst()
                .map(s -> {
                    String ctx = s.getPortfolioContext();
                    return (ctx != null && !ctx.isBlank()) ? ctx : DEFAULT_CONTEXT;
                })
                .orElse(DEFAULT_CONTEXT);
    }

    // ─── Public Chat endpoint (main chatbot) ──────────────────────────────────
    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody Map<String, String> req,
                                  HttpServletRequest httpRequest) {
        return processChat(req.get("message"));
    }

    // ─── Legacy Voice Assistant / n8n webhook endpoint ────────────────────────
    @PostMapping("/webhook/chat")
    public ResponseEntity<?> handleVoiceAssistant(@RequestBody Map<String, String> req,
                                                  HttpServletRequest httpRequest) {
        String userQuery = req.get("message");
        Map<String, Object> result = (Map<String, Object>) processChat(userQuery).getBody();
        // Legacy endpoint returns "message" key instead of "reply"
        String reply = result != null ? (String) result.get("reply") : "Sorry, I cannot connect to the AI.";
        return ResponseEntity.ok(Map.of("message", reply));
    }

    private ResponseEntity<?> processChat(String userQuery) {
        if (userQuery == null || userQuery.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("reply", "Message cannot be empty."));
        }

        if (!isChatbotActive) {
            return ResponseEntity.ok(Map.of(
                "reply", "The AI assistant is currently disabled by the owner. Please check back later!"
            ));
        }

        String portfolioContext = getPortfolioContext();
        String aiReply = "";
        int tokenCost = 0;

        try {
            aiReply = ollamaService.ask(portfolioContext, userQuery);
            tokenCost = (int) Math.round(
                (userQuery.split("\\s+").length + aiReply.split("\\s+").length) * 1.3
            );
            lastError = "None";
        } catch (Exception e) {
            lastError = e.getClass().getSimpleName() + ": " + e.getMessage();
            aiReply = "I'm having trouble connecting to my AI brain right now. " +
                      "Sudarshan Hingalje is a Full Stack Java Developer. " +
                      "📧 sudarshanhigalje1@gmail.com";
        } finally {
            // Always log the interaction
            ChatLog log = ChatLog.builder()
                    .sessionHash(UUID.randomUUID().toString().substring(0, 8))
                    .userQuery(userQuery)
                    .aiResponse(aiReply != null ? aiReply : "")
                    .tokens(tokenCost)
                    .build();
            chatLogRepository.save(log);
        }

        return ResponseEntity.ok(Map.of("reply", aiReply));
    }

    // ─── Admin: Get AI management panel data ─────────────────────────────────
    @GetMapping("/ai/management")
    public ResponseEntity<?> getAiManagement() {
        Settings settings = settingsRepository.findAll().stream().findFirst()
                .orElse(Settings.builder().systemPrompt("").portfolioContext("").build());

        List<ChatLog> logs = chatLogRepository.findAllByOrderByCreatedAtDesc();
        long totalTokens = logs.stream().mapToLong(ChatLog::getTokens).sum();

        Map<String, Object> stats = Map.of(
                "usage", logs.size(),
                "limit", 99999,
                "active", isChatbotActive,
                "totalTokens", totalTokens
        );

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                        "systemPrompt", settings.getSystemPrompt() != null ? settings.getSystemPrompt() : "",
                        "portfolioContext", settings.getPortfolioContext() != null ? settings.getPortfolioContext() : DEFAULT_CONTEXT,
                        "chatLogs", logs.subList(0, Math.min(logs.size(), 20)),
                        "stats", stats,
                        "lastError", lastError,
                        "ollamaModel", ollamaService.getOllamaModel(),
                        "ollamaUrl", ollamaService.getOllamaUrl()
                )
        ));
    }

    // ─── Admin: Get portfolio context ─────────────────────────────────────────
    @GetMapping("/ai/context")
    public ResponseEntity<?> getContext() {
        String ctx = getPortfolioContext();
        return ResponseEntity.ok(Map.of("success", true, "portfolioContext", ctx));
    }

    // ─── Admin: Update portfolio context (text or file upload) ───────────────
    @PutMapping("/ai/context")
    public ResponseEntity<?> updateContext(@RequestBody Map<String, String> req) {
        String newContext = req.get("portfolioContext");
        if (newContext == null || newContext.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "portfolioContext is required"));
        }

        Settings settings = settingsRepository.findAll().stream().findFirst()
                .orElse(new Settings());
        settings.setPortfolioContext(newContext);

        // Ensure required fields are set if this is a new Settings record
        if (settings.getOwnerName() == null) settings.setOwnerName("Sudarshan Hingalje");
        if (settings.getTagline() == null) settings.setTagline("Full Stack Java Developer");
        if (settings.getGithubUrl() == null) settings.setGithubUrl("https://github.com/Sudarshanhingalje");
        if (settings.getLinkedinUrl() == null) settings.setLinkedinUrl("https://linkedin.com/in/sudarshan-hingalje-b07993158");
        if (settings.getWhatsappNumber() == null) settings.setWhatsappNumber("9579853955");
        if (settings.getSystemPrompt() == null) settings.setSystemPrompt("You are Sudarshan's portfolio assistant.");

        settingsRepository.save(settings);
        return ResponseEntity.ok(Map.of("success", true, "message", "Portfolio context updated successfully!"));
    }

    // ─── Admin: Update system prompt behavior instructions ────────────────────
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

    // ─── Admin: Toggle chatbot on/off ─────────────────────────────────────────
    @PutMapping("/ai/toggle")
    public ResponseEntity<?> toggleChatbot(@RequestBody Map<String, Boolean> req) {
        Boolean active = req.get("active");
        if (active == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "active field is required"));
        }
        this.isChatbotActive = active;
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Chatbot " + (active ? "ENABLED" : "DISABLED")
        ));
    }

    // ─── Admin: Debug info ────────────────────────────────────────────────────
    @GetMapping("/ai/debug")
    public ResponseEntity<?> getAiDebug() {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "lastError", lastError,
                "ollamaUrl", ollamaService.getOllamaUrl(),
                "ollamaModel", ollamaService.getOllamaModel(),
                "chatbotActive", isChatbotActive
        ));
    }
}
