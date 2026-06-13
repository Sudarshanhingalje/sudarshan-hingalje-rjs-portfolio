package com.portfolio.backend.repository;

import com.portfolio.backend.model.VisitorLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VisitorLogRepository extends JpaRepository<VisitorLog, Long> {
    List<VisitorLog> findAllByOrderByCreatedAtDesc();
    List<VisitorLog> findByCreatedAtAfter(LocalDateTime since);
}
