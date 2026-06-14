package com.portfolio.backend.controller;

import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllProjects() {
        List<Project> list = projectRepository.findAllByOrderByDisplayOrderAsc();
        return ResponseEntity.ok(Map.of("success", true, "data", list));
    }

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        Project saved = projectRepository.save(project);
        return ResponseEntity.ok(Map.of("success", true, "data", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Project updated) {
        return projectRepository.findById(id)
                .map(proj -> {
                    proj.setTitle(updated.getTitle());
                    proj.setDescription(updated.getDescription());
                    proj.setLiveUrl(updated.getLiveUrl());
                    proj.setGithubUrl(updated.getGithubUrl());
                    proj.setImageUrl(updated.getImageUrl());
                    proj.setBannerImageUrl(updated.getBannerImageUrl());
                    proj.setDisplayOrder(updated.getDisplayOrder());
                    proj.setFeatured(updated.isFeatured());
                    proj.setTechStack(updated.getTechStack());
                    proj.setCredentials(updated.getCredentials());
                    Project saved = projectRepository.save(proj);

                    return ResponseEntity.ok(Map.of("success", true, "data", saved));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Project deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }
}
