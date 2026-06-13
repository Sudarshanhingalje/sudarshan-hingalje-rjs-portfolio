package com.portfolio.backend.controller;

import com.portfolio.backend.model.WorkflowRun;
import com.portfolio.backend.repository.WorkflowRunRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/workflows")
public class WorkflowController {

    private final WorkflowRunRepository workflowRunRepository;

    public WorkflowController(WorkflowRunRepository workflowRunRepository) {
        this.workflowRunRepository = workflowRunRepository;
    }

    @GetMapping("/status")
    public ResponseEntity<?> getWorkflowStatus() {
        List<WorkflowRun> runs = workflowRunRepository.findAllByOrderByCreatedAtDesc();

        Map<String, Object> status = Map.of(
                "webhookActive", true,
                "n8nHealthy", true,
                "lastChecked", LocalDateTime.now().toString()
        );

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                        "runs", runs.stream().limit(20).toList(),
                        "status", status
                )
        ));
    }
}
