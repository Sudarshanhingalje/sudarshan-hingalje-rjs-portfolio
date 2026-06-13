package com.portfolio.backend.repository;

import com.portfolio.backend.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    Optional<Resume> findByIsActiveTrue();
    List<Resume> findAllByOrderByCreatedAtDesc();
}
