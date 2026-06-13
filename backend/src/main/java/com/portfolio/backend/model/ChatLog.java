package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "session_hash")
    private String sessionHash;

    @Column(nullable = false, name = "user_query", columnDefinition = "TEXT")
    private String userQuery;

    @Column(nullable = false, name = "ai_response", columnDefinition = "TEXT")
    private String aiResponse;

    @Builder.Default
    private int tokens = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
