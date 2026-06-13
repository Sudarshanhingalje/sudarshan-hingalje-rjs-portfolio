package com.portfolio.backend.controller;

import com.portfolio.backend.model.Experience;
import com.portfolio.backend.repository.ExperienceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/experience")
public class ExperienceController {

    private final ExperienceRepository experienceRepository;

    public ExperienceController(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllExperiences() {
        List<Experience> list = experienceRepository.findAllByOrderByDisplayOrderAsc();
        return ResponseEntity.ok(Map.of("success", true, "data", list));
    }

    @PostMapping
    public ResponseEntity<?> createExperience(@RequestBody Experience experience) {
        Experience saved = experienceRepository.save(experience);
        return ResponseEntity.ok(Map.of("success", true, "data", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExperience(@PathVariable Long id, @RequestBody Experience updated) {
        return experienceRepository.findById(id)
                .map(exp -> {
                    exp.setRole(updated.getRole());
                    exp.setCompany(updated.getCompany());
                    exp.setLocation(updated.getLocation());
                    exp.setStartDate(updated.getStartDate());
                    exp.setEndDate(updated.getEndDate());
                    exp.setBullets(updated.getBullets());
                    exp.setDisplayOrder(updated.getDisplayOrder());
                    Experience saved = experienceRepository.save(exp);
                    return ResponseEntity.ok(Map.of("success", true, "data", saved));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExperience(@PathVariable Long id) {
        if (experienceRepository.existsById(id)) {
            experienceRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Experience deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }
}
