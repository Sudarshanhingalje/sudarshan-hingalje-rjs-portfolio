package com.portfolio.backend.controller;

import com.portfolio.backend.model.Contact;
import com.portfolio.backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/contacts")
public class ContactController {

    private final ContactRepository contactRepository;
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String mailSenderUser;

    @Value("${app.mail.receiver}")
    private String mailReceiver;

    public ContactController(ContactRepository contactRepository, JavaMailSender mailSender) {
        this.contactRepository = contactRepository;
        this.mailSender = mailSender;
    }

    // Public endpoint: Submit contact form
    @PostMapping
    public ResponseEntity<?> submitContactForm(@RequestBody Contact contact) {
        // Save to Database
        contact.setStatus("NEW");
        Contact saved = contactRepository.save(contact);

        // Send Email Notification (Non-blocking or catch exception so client doesn't 500)
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(mailSenderUser);
            mailMessage.setTo(mailReceiver);
            mailMessage.setSubject("Portfolio Contact Inquiry: " + contact.getSubject());
            mailMessage.setText("New message received from your portfolio site:\n\n"
                    + "Name: " + contact.getName() + "\n"
                    + "Email: " + contact.getEmail() + "\n"
                    + "Subject: " + contact.getSubject() + "\n"
                    + "Message:\n" + contact.getMessage());
            mailSender.send(mailMessage);
        } catch (Exception e) {
            System.err.println("⚠️ ContactController: SMTP delivery failed: " + e.getMessage());
            // Fail silently so DB insert is preserved and client gets success
        }

        return ResponseEntity.ok(Map.of("success", true, "data", saved));
    }

    // Admin endpoint: List messages
    @GetMapping
    public ResponseEntity<?> getAllContacts() {
        List<Contact> list = contactRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(Map.of("success", true, "data", list));
    }

    // Admin endpoint: Update ticket status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateContactStatus(@PathVariable Long id, @RequestBody Map<String, String> req) {
        String newStatus = req.get("status");
        if (newStatus == null) return ResponseEntity.badRequest().body("Status is required");

        return contactRepository.findById(id)
                .map(contact -> {
                    contact.setStatus(newStatus);
                    Contact saved = contactRepository.save(contact);
                    return ResponseEntity.ok(Map.of("success", true, "data", saved));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
