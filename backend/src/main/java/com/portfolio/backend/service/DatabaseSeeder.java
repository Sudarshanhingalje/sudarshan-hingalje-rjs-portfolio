package com.portfolio.backend.service;

import com.portfolio.backend.model.*;
import com.portfolio.backend.repository.*;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

// ─── Database Seeder ──────────────────────────────────────────────────────────
// Seeds the database with the EXACT data from the portfolio UI static files.
// All mock/dummy data is replaced with real portfolio content.
// Only seeds if the table is empty (safe to restart without duplicating).
// ─────────────────────────────────────────────────────────────────────────────

@Component
public class DatabaseSeeder implements ApplicationListener<ApplicationReadyEvent> {

    private final AdminRepository adminRepository;
    private final SettingsRepository settingsRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final CertificationRepository certificationRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(
            AdminRepository adminRepository,
            SettingsRepository settingsRepository,
            ProjectRepository projectRepository,
            SkillRepository skillRepository,
            ExperienceRepository experienceRepository,
            CertificationRepository certificationRepository,
            PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.settingsRepository = settingsRepository;
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.experienceRepository = experienceRepository;
        this.certificationRepository = certificationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        if (projectRepository.count() < 5) {
            System.out.println("🧹 Clearing projects table to reseed real data...");
            projectRepository.deleteAll();
        }
        if (skillRepository.count() < 32) {
            System.out.println("🧹 Clearing skills table to reseed real data...");
            skillRepository.deleteAll();
        }
        if (experienceRepository.count() < 3) {
            System.out.println("🧹 Clearing experiences table to reseed real data...");
            experienceRepository.deleteAll();
        }
        if (certificationRepository.count() < 11) {
            System.out.println("🧹 Clearing certifications table to reseed real data...");
            certificationRepository.deleteAll();
        }

        seedAdmin();
        seedSettings();
        seedProjects();
        seedSkills();
        seedExperience();
        seedCertifications();
    }

    private void seedAdmin() {
        if (adminRepository.count() == 0) {
            Admin admin = Admin.builder()
                    .name("Sudarshan Hingalje")
                    .email("sudarshanhigalje1@gmail.com")
                    .passwordHash(passwordEncoder.encode("Sudu@1308"))
                    .isActive(true)
                    .build();
            adminRepository.save(admin);
            System.out.println("🌱 Seeded: Admin user");
        }
    }

    private void seedSettings() {
        if (settingsRepository.count() == 0) {
            String portfolioContext =
                "Name: Sudarshan Hingalje\n" +
                "Role: Full Stack Java Developer & Software Engineer\n\n" +
                "=== SKILLS ===\n" +
                "Frontend: React.js, HTML, CSS, JavaScript, Redux, Tailwind CSS, Next.js, Vite\n" +
                "Backend: Java, Spring Boot, Spring Security, JWT, REST APIs, Node.js\n" +
                "Database: MySQL, MongoDB, Supabase\n" +
                "Cloud & Tools: AWS EC2, Git, GitHub, Vercel, Netlify, Postman\n\n" +
                "=== PROJECTS ===\n" +
                "1. Wild Oasis Hotel Suite — Next.js + Supabase full-stack hotel booking & admin dashboard\n" +
                "2. ScrapSavvy — Java Spring Boot + React waste management platform (AWS EC2 deployed)\n" +
                "3. Fast React Pizza — React + Redux real-time pizza ordering app\n" +
                "4. Pizza Delivery App — Full stack MERN with Razorpay payment integration\n" +
                "5. Elevora AI — AI-powered business automation platform\n" +
                "6. Denta AI — Smart dental clinic management system\n\n" +
                "=== EXPERIENCE ===\n" +
                "- Full Stack Developer (Project Work) — Wild Oasis Project (2025–Present)\n" +
                "- Frontend Developer Intern — Harshad Enterprises, Pune (Jan–Jun 2023)\n" +
                "- CDAC Trainee (PG-DAC) — Advanced Computing, Pune (Jan–Sep 2024)\n\n" +
                "=== EDUCATION ===\n" +
                "- Post Graduate Diploma in Advanced Computing (PG-DAC) — CDAC Pune, 2024\n" +
                "- Bachelor of Engineering — Computer Engineering\n\n" +
                "=== CONTACT & LINKS ===\n" +
                "Email: sudarshanhigalje1@gmail.com\n" +
                "GitHub: https://github.com/Sudarshanhingalje\n" +
                "LinkedIn: https://linkedin.com/in/sudarshan-hingalje-b07993158\n" +
                "WhatsApp: +91 9579853955\n" +
                "Location: Pune, Maharashtra, India\n\n" +
                "=== ABOUT ===\n" +
                "Sudarshan is a passionate Full Stack Java Developer with expertise in building scalable " +
                "web applications. He has strong fundamentals in both frontend (React) and backend (Java/Spring Boot) " +
                "development, with hands-on experience in REST APIs, JWT authentication, MySQL, and cloud deployment.";

            Settings settings = Settings.builder()
                    .ownerName("Sudarshan Hingalje")
                    .tagline("Full Stack Java Developer & Software Engineer")
                    .githubUrl("https://github.com/Sudarshanhingalje")
                    .linkedinUrl("https://linkedin.com/in/sudarshan-hingalje-b07993158")
                    .whatsappNumber("9579853955")
                    .videoUrl("/assets/projectvideo.mp4")
                    .systemPrompt("You are an AI assistant on Sudarshan Hingalje's portfolio website. He is a Full Stack Developer specializing in Java, Spring Boot, MySQL, and React. Answer visitor questions concisely, highlight his projects including Wild Oasis Hotel Suite, ScrapSavvy, and Pizza Delivery App. Be professional and encouraging. Guide interested visitors to use the contact form.")
                    .portfolioContext(portfolioContext)
                    .build();
            settingsRepository.save(settings);
            System.out.println("🌱 Seeded: Site settings with portfolio context");
        }
    }


    // Real projects from src/data/projects/ProjectDone.jsx
    private void seedProjects() {
        if (projectRepository.count() == 0) {
            projectRepository.save(Project.builder()
                    .title("The Wild Oasis - Complete Hotel Management Suite")
                    .description("A comprehensive full-stack hotel booking platform featuring both customer-facing website and admin dashboard. Includes real-time booking management, payment processing, user authentication, and advanced analytics dashboard.")
                    .imageUrl("/project/thewildoasiswebsite.png")
                    .liveUrl("https://the-wild-oasis-website-cabins.vercel.app/")
                    .githubUrl("https://github.com/Sudarshanhingalje/the-wild-oasis-website")
                    .displayOrder(1).isFeatured(true)
                    .techStack(List.of("Next.js", "Supabase", "Styled-components", "React Query", "React Router"))
                    .build());

            projectRepository.save(Project.builder()
                    .title("Fast React Pizza - Advanced Redux E-commerce Platform")
                    .description("Modern pizza ordering application built with React and Redux Toolkit. Features dynamic cart management, real-time order tracking, GPS location integration, and seamless checkout experience.")
                    .imageUrl("/project/fastreactpizza.png")
                    .liveUrl("https://redux-fast-react-pizza.netlify.app/")
                    .githubUrl("https://github.com/Sudarshanhingalje/fast-react-pizza")
                    .displayOrder(2).isFeatured(true)
                    .techStack(List.of("React", "Redux Toolkit", "Tailwind CSS", "React Router"))
                    .build());

            projectRepository.save(Project.builder()
                    .title("ScrapSavvy - Smart Environmental Waste Management Platform")
                    .description("Innovative collaborative waste management platform connecting users with scrap vendors. Features intelligent pickup scheduling, vendor network management, and real-time tracking with Firebase backend integration.")
                    .imageUrl("/project/scrapsavvy.png")
                    .liveUrl("https://scrapsavvy.netlify.app/")
                    .githubUrl("https://github.com/Sudarshanhingalje/ScrapSavvy-backend")
                    .displayOrder(3).isFeatured(true)
                    .techStack(List.of("HTML", "CSS", "JavaScript", "React", "MySQL", "Java", "Spring Boot", "AWS EC2"))
                    .build());

            projectRepository.save(Project.builder()
                    .title("Pizza Delivery - Enterprise Commerce Solution")
                    .description("Full-featured enterprise pizza delivery system with robust authentication, integrated Razorpay payment processing, MongoDB database, and comprehensive REST API architecture.")
                    .imageUrl("/project/pizzastore.png")
                    .liveUrl("https://pizza-delivery-application-rose.vercel.app/")
                    .githubUrl("https://github.com/Sudarshanhingalje/Pizza-Delivery-Application")
                    .displayOrder(4).isFeatured(true)
                    .techStack(List.of("React", "Redux", "MongoDB", "Razorpay", "REST API", "Axios"))
                    .build());

            projectRepository.save(Project.builder()
                    .title("Wild Oasis Admin - Professional Management Dashboard")
                    .description("Sophisticated admin panel for comprehensive hotel management with interactive analytics, advanced user management, booking oversight, and real-time data visualization.")
                    .imageUrl("/project/thewildoasis.png")
                    .liveUrl("https://hotelthe-wild-oasis.netlify.app/")
                    .githubUrl("https://github.com/Sudarshanhingalje/the-wild-oasis")
                    .displayOrder(5).isFeatured(false)
                    .techStack(List.of("React", "Supabase", "Chart.js", "Tailwind CSS"))
                    .build());

            System.out.println("🌱 Seeded: 5 real projects");
        }
    }

    // Real skills from src/data/skills/SkillsLerned.jsx
    private void seedSkills() {
        if (skillRepository.count() == 0) {
            // Frontend
            List<Object[]> frontend = List.of(
                new Object[]{"HTML", "html.svg", 90},
                new Object[]{"CSS", "css.svg", 88},
                new Object[]{"JavaScript", "javascript.svg", 85},
                new Object[]{"React.js", "reactjs.svg", 88},
                new Object[]{"Redux", "redux.svg", 80},
                new Object[]{"React Query", "reactquery.svg", 75},
                new Object[]{"react-router-dom", "router.svg", 82},
                new Object[]{"Bootstrap", "bootstrap.svg", 78},
                new Object[]{"Tailwind", "tailwind.svg", 85},
                new Object[]{"Next.js", "nextjs.svg", 75},
                new Object[]{"Vite", "vitejs.svg", 80},
                new Object[]{"styled-components", "styledcomponents.svg", 72}
            );
            for (Object[] s : frontend) {
                skillRepository.save(Skill.builder().name((String)s[0]).iconImage((String)s[1])
                        .category("Frontend").proficiency((int)s[2]).build());
            }

            // Backend
            List<Object[]> backend = List.of(
                new Object[]{"Java", "java.svg", 90},
                new Object[]{"Spring Boot", "springboot.svg", 88},
                new Object[]{"NextAuth", "nextauth.svg", 70},
                new Object[]{"Node.js", "nodejs.svg", 72},
                new Object[]{"Postman", "postman.svg", 80},
                new Object[]{"NPM", "npm.svg", 78},
                new Object[]{"Express.js", "expressjs.svg", 70}
            );
            for (Object[] s : backend) {
                skillRepository.save(Skill.builder().name((String)s[0]).iconImage((String)s[1])
                        .category("Backend").proficiency((int)s[2]).build());
            }

            // Database
            List<Object[]> database = List.of(
                new Object[]{"MongoDB", "mongodb.svg", 75},
                new Object[]{"MySQL", "mysql.svg", 88},
                new Object[]{"Supabase", "supabase.svg", 78}
            );
            for (Object[] s : database) {
                skillRepository.save(Skill.builder().name((String)s[0]).iconImage((String)s[1])
                        .category("Database").proficiency((int)s[2]).build());
            }

            // Tools & Platforms
            List<Object[]> tools = List.of(
                new Object[]{"Git", "git.svg", 85},
                new Object[]{"GitHub", "github.svg", 88},
                new Object[]{"GDrive", "gdrive.svg", 80},
                new Object[]{"Vercel", "vercel.svg", 82},
                new Object[]{"VS Code", "vscode.svg", 90},
                new Object[]{"Netlify", "netlify.svg", 78},
                new Object[]{"Canva", "canva.svg", 70},
                new Object[]{"Notion", "notion.svg", 72},
                new Object[]{"Jira", "jira.svg", 68}
            );
            for (Object[] s : tools) {
                skillRepository.save(Skill.builder().name((String)s[0]).iconImage((String)s[1])
                        .category("Tools & Platforms").proficiency((int)s[2]).build());
            }

            System.out.println("🌱 Seeded: " + skillRepository.count() + " real skills");
        }
    }

    // Real experience from src/data/experienceTaken/ExperiencesTaken.jsx
    private void seedExperience() {
        if (experienceRepository.count() == 0) {
            experienceRepository.save(Experience.builder()
                    .role("Full Stack Developer (Project Work)")
                    .company("The Wild Oasis Project")
                    .location("Remote")
                    .startDate("2025-01").endDate("Present")
                    .displayOrder(1)
                    .bullets(List.of(
                        "Built a boutique hotel full-stack app using Next.js, Tailwind CSS, Supabase, and PostgreSQL.",
                        "Includes full booking management, authentication, real-time data, and 3D animations.",
                        "Designed and implemented complete hotel admin dashboard with analytics and user management."
                    )).build());

            experienceRepository.save(Experience.builder()
                    .role("Frontend Developer (Internship)")
                    .company("Harshad Enterprises")
                    .location("Pune")
                    .startDate("2023-01").endDate("2023-06")
                    .displayOrder(2)
                    .bullets(List.of(
                        "Contributed to UI development, debugging, and code optimization in real-time web applications.",
                        "Worked with HTML, CSS, JavaScript to create responsive and interactive interfaces.",
                        "Collaborated with senior developers to resolve UI/UX issues and improve performance."
                    )).build());

            experienceRepository.save(Experience.builder()
                    .role("CDAC Trainee - Advanced Computing")
                    .company("CDAC Pune")
                    .location("Pune")
                    .startDate("2024-01").endDate("2024-09")
                    .displayOrder(3)
                    .bullets(List.of(
                        "Completed Post Graduate Diploma in Advanced Computing (PG-DAC).",
                        "Core focus areas: Java, Spring Boot, Data Structures, DBMS, and Web Technologies.",
                        "Built multiple Java Spring Boot projects with full REST API architecture and MySQL integration."
                    )).build());

            System.out.println("🌱 Seeded: 3 real experiences");
        }
    }

    // Real certifications from src/components/CertificateWall.jsx
    private void seedCertifications() {
        if (certificationRepository.count() == 0) {
            List<Object[]> certs = List.of(
                new Object[]{"Full-Stack Web Development Certificate", "Udemy / Online", "2024-06", "certificates/1.png"},
                new Object[]{"ReactJS & Redux Toolkit Course", "Udemy", "2024-03", "certificates/2.png"},
                new Object[]{"Java & CDAC Graduate Diploma (PG-DAC)", "CDAC Pune", "2024-09", "certificates/3.png"},
                new Object[]{"Spring Boot & RESTful APIs Development", "Udemy / Online", "2024-08", "certificates/4.png"},
                new Object[]{"AWS EC2 & Cloud Hosting Services", "Amazon Web Services", "2024-05", "certificates/5.png"},
                new Object[]{"SQL & Relational Databases (MySQL)", "Udemy / Online", "2023-12", "certificates/6.png"},
                new Object[]{"Tailwind CSS & Modern UI Components", "Udemy / Online", "2024-02", "certificates/7.png"},
                new Object[]{"Git & GitHub Team Collaboration", "Udemy / Online", "2023-11", "certificates/8.png"},
                new Object[]{"State Management with Redux Pro", "Udemy / Online", "2024-01", "certificates/9.png"},
                new Object[]{"Responsive Web Design & Mobile UX", "Udemy / Online", "2023-10", "certificates/10.png"},
                new Object[]{"Single Page Application (SPA) Routing & Security", "Udemy / Online", "2024-04", "certificates/11.png"}
            );

            for (Object[] c : certs) {
                certificationRepository.save(Certification.builder()
                        .name((String) c[0])
                        .issuer((String) c[1])
                        .issueDate((String) c[2])
                        .imageUrl((String) c[3])
                        .build());
            }
            System.out.println("🌱 Seeded: 11 real certifications");
        }
    }
}
