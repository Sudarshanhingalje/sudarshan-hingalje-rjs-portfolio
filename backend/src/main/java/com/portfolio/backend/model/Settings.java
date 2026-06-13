package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "owner_name")
    private String ownerName;

    @Column(nullable = false)
    private String tagline;

    @Column(nullable = false, name = "github_url")
    private String githubUrl;

    @Column(nullable = false, name = "linkedin_url")
    private String linkedinUrl;

    @Column(nullable = false, name = "whatsapp_number")
    private String whatsappNumber;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(nullable = false, name = "system_prompt", columnDefinition = "TEXT")
    private String systemPrompt;
}
