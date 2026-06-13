package com.portfolio.backend.controller;

import com.portfolio.backend.model.Resume;
import com.portfolio.backend.repository.ResumeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/resumes")
public class ResumeController {

    private final ResumeRepository resumeRepository;

    public ResumeController(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    // Admin endpoint: List all versions
    @GetMapping
    public ResponseEntity<?> getAllResumes() {
        List<Resume> list = resumeRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(Map.of("success", true, "data", list));
    }

    // Public endpoint: Fetch current active download
    @GetMapping("/active")
    public ResponseEntity<?> getActiveResume() {
        return resumeRepository.findByIsActiveTrue()
                .map(r -> ResponseEntity.ok(Map.of("success", true, "data", r)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> createResume(@RequestBody Resume resume) {
        // If set to active, make sure others are deactivated
        if (resume.isActive()) {
            deactivateAll();
        } else if (resumeRepository.count() == 0) {
            // Force active if it's the first upload
            resume.setActive(true);
        }
        Resume saved = resumeRepository.save(resume);
        return ResponseEntity.ok(Map.of("success", true, "data", saved));
    }

    @PutMapping("/{id}/activate")
    @Transactional
    public ResponseEntity<?> activateResume(@PathVariable Long id) {
        return resumeRepository.findById(id)
                .map(resume -> {
                    deactivateAll();
                    resume.setActive(true);
                    resumeRepository.save(resume);
                    return ResponseEntity.ok(Map.of("success", true, "message", "Resume activated"));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deleteResume(@PathVariable Long id) {
        return resumeRepository.findById(id)
                .map(resume -> {
                    if (resume.isActive()) {
                        return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Cannot delete active resume version. Activate another version first."));
                    }
                    resumeRepository.delete(resume);
                    return ResponseEntity.ok(Map.of("success", true, "message", "Resume version deleted"));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private void deactivateAll() {
        List<Resume> activeResumes = resumeRepository.findAll();
        for (Resume r : activeResumes) {
            if (r.isActive()) {
                r.setActive(false);
                resumeRepository.save(r);
            }
        }
    }
}
