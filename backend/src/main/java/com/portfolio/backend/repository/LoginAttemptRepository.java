package com.portfolio.backend.repository;

import com.portfolio.backend.model.LoginAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoginAttemptRepository extends JpaRepository<LoginAttempt, Long> {
    List<LoginAttempt> findAllByOrderByCreatedAtDesc();
    long countByIpHashAndSuccessFalseAndCreatedAtAfter(String ipHash, LocalDateTime time);
}
