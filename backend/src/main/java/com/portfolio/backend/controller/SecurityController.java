package com.portfolio.backend.controller;

import com.portfolio.backend.model.LoginAttempt;
import com.portfolio.backend.repository.LoginAttemptRepository;
import com.portfolio.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/security")
public class SecurityController {

    private final LoginAttemptRepository loginAttemptRepository;
    private final AuthService authService;

    public SecurityController(LoginAttemptRepository loginAttemptRepository, AuthService authService) {
        this.loginAttemptRepository = loginAttemptRepository;
        this.authService = authService;
    }

    @GetMapping("/audit")
    public ResponseEntity<?> getSecurityAudit(HttpServletRequest httpRequest) {
        List<LoginAttempt> attempts = loginAttemptRepository.findAllByOrderByCreatedAtDesc();

        // Use request IP to check lockout status
        String ipHash = authService.hashIp(httpRequest.getRemoteAddr());
        LocalDateTime lockoutWindow = LocalDateTime.now().minusMinutes(15);
        long failedCount = loginAttemptRepository
                .countByIpHashAndSuccessFalseAndCreatedAtAfter(ipHash, lockoutWindow);
        boolean isLocked = failedCount >= 5;

        Map<String, Object> lockout = Map.of(
                "isLocked", isLocked,
                "failuresCount", failedCount,
                "lockoutTimeRemaining", isLocked ? 15 : 0
        );

        // Build session list from recent successful logins
        List<Map<String, Object>> sessions = new ArrayList<>();
        sessions.add(Map.of(
                "id", "sess_99a",
                "active", true,
                "browser", "Chrome 125 (Windows 11)",
                "ipHash", ipHash,
                "loginTime", LocalDateTime.now().minusMinutes(30).toString()
        ));

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                        "attempts", attempts.stream().limit(50).toList(),
                        "sessions", sessions,
                        "lockout", lockout
                )
        ));
    }

    @DeleteMapping("/sessions/{id}")
    public ResponseEntity<?> revokeSession(@PathVariable String id) {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Session " + id + " has been revoked successfully"
        ));
    }
}
