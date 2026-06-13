package com.portfolio.backend.controller;

import com.portfolio.backend.model.Admin;
import com.portfolio.backend.repository.AdminRepository;
import com.portfolio.backend.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final AdminRepository adminRepository;

    public AuthController(AuthService authService, AdminRepository adminRepository) {
        this.authService = authService;
        this.adminRepository = adminRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req, HttpServletRequest request, HttpServletResponse response) {
        String email = req.get("email");
        String password = req.get("password");

        try {
            String jwt = authService.authenticate(email, password, request.getRemoteAddr());

            // Write HTTP-Only JWT Cookie
            Cookie cookie = new Cookie("token", jwt);
            cookie.setHttpOnly(true);
            cookie.setSecure(false); // Set true in production with HTTPS
            cookie.setPath("/");
            cookie.setMaxAge(24 * 60 * 60); // 1 day
            response.addCookie(cookie);

            Admin admin = adminRepository.findByEmail(email).orElseThrow();
            Map<String, Object> adminInfo = Map.of(
                    "id", admin.getId(),
                    "email", admin.getEmail(),
                    "name", admin.getName()
            );

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", Map.of("adminInfo", adminInfo)
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Clear HTTP-Only Cookie
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Successfully logged out"
        ));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        try {
            authService.generateAndSendOtp(email);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "OTP security code sent successfully to " + email
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String otp = req.get("otp");
        try {
            authService.verifyOtp(email, otp);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "OTP verified successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String otp = req.get("otp");
        String newPassword = req.get("newPassword");
        try {
            authService.resetPassword(email, otp, newPassword);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Password reset successfully. Proceed to login."
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }
}
