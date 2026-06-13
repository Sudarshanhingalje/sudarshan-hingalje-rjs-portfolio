package com.portfolio.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.Map;

@RestController
@RequestMapping("/system")
public class SystemController {

    private final DataSource dataSource;

    public SystemController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping("/health")
    public ResponseEntity<?> getSystemHealth() {
        String dbStatus = "DOWN";
        try (Connection conn = dataSource.getConnection()) {
            if (conn.isValid(1000)) {
                dbStatus = "UP";
            }
        } catch (Exception e) {
            dbStatus = "DOWN";
        }

        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "details", Map.of("db", dbStatus)
        ));
    }
}
