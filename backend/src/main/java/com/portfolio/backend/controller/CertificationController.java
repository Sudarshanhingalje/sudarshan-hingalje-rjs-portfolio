package com.portfolio.backend.controller;

import com.portfolio.backend.model.Certification;
import com.portfolio.backend.repository.CertificationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/certifications")
public class CertificationController {

    private final CertificationRepository certificationRepository;

    public CertificationController(CertificationRepository certificationRepository) {
        this.certificationRepository = certificationRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllCertifications() {
        List<Certification> list = certificationRepository.findAll();
        return ResponseEntity.ok(Map.of("success", true, "data", list));
    }

    @PostMapping
    public ResponseEntity<?> createCertification(@RequestBody Certification certification) {
        Certification saved = certificationRepository.save(certification);
        return ResponseEntity.ok(Map.of("success", true, "data", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCertification(@PathVariable Long id, @RequestBody Certification updated) {
        return certificationRepository.findById(id)
                .map(cert -> {
                    cert.setName(updated.getName());
                    cert.setIssuer(updated.getIssuer());
                    cert.setIssueDate(updated.getIssueDate());
                    cert.setCredentialId(updated.getCredentialId());
                    cert.setCredentialUrl(updated.getCredentialUrl());
                    Certification saved = certificationRepository.save(cert);
                    return ResponseEntity.ok(Map.of("success", true, "data", saved));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCertification(@PathVariable Long id) {
        if (certificationRepository.existsById(id)) {
            certificationRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Certification deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }
}
