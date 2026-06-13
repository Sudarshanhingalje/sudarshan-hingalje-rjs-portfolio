package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "visitor_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VisitorLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "ip_hash")
    private String ipHash;

    private String country;

    private String city;

    private Double latitude;

    private Double longitude;

    private String device;

    private String browser;

    private String os;

    @Builder.Default
    @Column(name = "session_duration")
    private long sessionDuration = 0; // in seconds

    @Builder.Default
    @Column(name = "page_views")
    private int pageViews = 1;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
