package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "live_url")
    private String liveUrl;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "banner_image_url")
    private String bannerImageUrl;

    @Builder.Default
    @Column(name = "display_order")
    private int displayOrder = 0;

    @Builder.Default
    @Column(name = "is_featured")
    private boolean isFeatured = false;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_tech_stack", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "technology")
    @Builder.Default
    private List<String> techStack = new ArrayList<>();

    @Column(name = "credentials")
    private String credentials;
}

