package com.portfolio.backend.service;

import com.portfolio.backend.model.Admin;
import com.portfolio.backend.model.LoginAttempt;
import com.portfolio.backend.model.PasswordResetToken;
import com.portfolio.backend.repository.AdminRepository;
import com.portfolio.backend.repository.LoginAttemptRepository;
import com.portfolio.backend.repository.PasswordResetTokenRepository;
import com.portfolio.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthService {

    private final AdminRepository adminRepository;
    private final LoginAttemptRepository loginAttemptRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String mailSenderUser;

    public AuthService(
            AdminRepository adminRepository,
            LoginAttemptRepository loginAttemptRepository,
            PasswordResetTokenRepository tokenRepository,
            JwtUtil jwtUtil,
            PasswordEncoder passwordEncoder,
            JavaMailSender mailSender) {
        this.adminRepository = adminRepository;
        this.loginAttemptRepository = loginAttemptRepository;
        this.tokenRepository = tokenRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    public String hashIp(String ipAddress) {
        if (ipAddress == null) return "unknown";
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(ipAddress.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString().substring(0, 16); // Masked IP prefix
        } catch (Exception e) {
            return "hash_error";
        }
    }

    @Transactional
    public String authenticate(String email, String password, String ipAddress) {
        String ipHash = hashIp(ipAddress);

        // Check for Lockout
        LocalDateTime lockoutWindow = LocalDateTime.now().minusMinutes(15);
        long failedAttempts = loginAttemptRepository.countByIpHashAndSuccessFalseAndCreatedAtAfter(ipHash, lockoutWindow);
        if (failedAttempts >= 5) {
            throw new LockedException("Too many failed login attempts. IP locked for 15 minutes.");
        }

        Optional<Admin> adminOpt = adminRepository.findByEmail(email);
        boolean success = false;
        String failureReason = null;

        try {
            if (adminOpt.isPresent()) {
                Admin admin = adminOpt.get();
                if (!admin.isActive()) {
                    failureReason = "Account Disabled";
                    throw new LockedException("Account is disabled.");
                }
                if (passwordEncoder.matches(password, admin.getPasswordHash())) {
                    success = true;
                    admin.setLastLogin(LocalDateTime.now());
                    adminRepository.save(admin);
                    return jwtUtil.generateToken(email);
                } else {
                    failureReason = "Incorrect Password";
                }
            } else {
                failureReason = "Admin Email Not Found";
            }
            throw new IllegalArgumentException("Invalid email or password.");
        } finally {
            // Log Login Attempt
            LoginAttempt attempt = LoginAttempt.builder()
                    .ipHash(ipHash)
                    .username(email)
                    .success(success)
                    .failureReason(failureReason)
                    .build();
            loginAttemptRepository.save(attempt);
        }
    }

    @Transactional
    public void generateAndSendOtp(String email) {
        // Ensure email matches an existing admin
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Admin account with this email does not exist."));

        // Generate 6-digit code
        String otp = String.format("%06d", new Random().nextInt(1000000));

        // Save Token
        PasswordResetToken token = PasswordResetToken.builder()
                .email(email)
                .token(otp)
                .used(false)
                .build();
        tokenRepository.save(token);

        // Send Email via Gmail SMTP
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailSenderUser);
            message.setTo(email);
            message.setSubject("Ember Studio Admin - OTP Security Code");
            message.setText("Hello,\n\nYou requested a password reset. Your OTP verification code is:\n\n"
                    + otp + "\n\nThis code is valid for 5 minutes. If you did not request this, please ignore this email.");
            mailSender.send(message);
        } catch (Exception e) {
            // Log error, but throw standard message so users aren't exposed
            throw new RuntimeException("Failed to send OTP email. Please verify SMTP connection settings.");
        }
    }

    public void verifyOtp(String email, String otp) {
        LocalDateTime validityWindow = LocalDateTime.now().minusMinutes(5);
        tokenRepository.findByEmailAndTokenAndUsedFalseAndCreatedAtAfter(email, otp, validityWindow)
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired OTP code."));
    }

    @Transactional
    public void resetPassword(String email, String otp, String newPassword) {
        LocalDateTime validityWindow = LocalDateTime.now().minusMinutes(5);
        PasswordResetToken token = tokenRepository.findByEmailAndTokenAndUsedFalseAndCreatedAtAfter(email, otp, validityWindow)
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired OTP. Password reset aborted."));

        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Admin account not found."));

        admin.setPasswordHash(passwordEncoder.encode(newPassword));
        adminRepository.save(admin);

        token.setUsed(true);
        tokenRepository.save(token);
    }
}
