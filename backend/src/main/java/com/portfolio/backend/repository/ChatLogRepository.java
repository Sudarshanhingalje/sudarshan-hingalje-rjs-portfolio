package com.portfolio.backend.repository;

import com.portfolio.backend.model.ChatLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLog, Long> {
    List<ChatLog> findAllByOrderByCreatedAtDesc();
}
