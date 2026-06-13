package com.portfolio.backend.controller;

import com.portfolio.backend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final VisitorLogRepository visitorLogRepository;
    private final ContactRepository contactRepository;
    private final ProjectRepository projectRepository;
    private final LoginAttemptRepository loginAttemptRepository;

    public DashboardController(
            VisitorLogRepository visitorLogRepository,
            ContactRepository contactRepository,
            ProjectRepository projectRepository,
            LoginAttemptRepository loginAttemptRepository) {
        this.visitorLogRepository = visitorLogRepository;
        this.contactRepository = contactRepository;
        this.projectRepository = projectRepository;
        this.loginAttemptRepository = loginAttemptRepository;
    }

    @GetMapping("/summary")
    public ResponseEntity<?> getDashboardSummary() {
        long totalVisitors = visitorLogRepository.count();
        long contactsCount = contactRepository.count();
        long activeProjects = projectRepository.count();

        long resumeDownloads = 0; // Track actual downloads via dedicated endpoint in future

        Map<String, Long> stats = Map.of(
                "totalVisitors", totalVisitors,
                "resumeDownloads", resumeDownloads,
                "contactsCount", contactsCount,
                "activeProjects", activeProjects
        );

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                        "stats", stats,
                        "recentContacts", contactRepository.findAllByOrderByCreatedAtDesc().stream().limit(5).toList(),
                        "recentAudits", loginAttemptRepository.findAllByOrderByCreatedAtDesc().stream().limit(5).toList()
                )
        ));
    }
}
