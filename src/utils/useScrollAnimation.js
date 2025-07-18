// src/utils/useScrollAnimation.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // 🔽 Header hide on scroll
      gsap.to("#header", {
        y: -80,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: "#about",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 👤 Parallax About Avatar
      gsap.to("#about .about-avatar", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 💡 Animate skill cards
      gsap.from(".skill-card", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: "#skills",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // ✨ Fade up each section
      gsap.utils.toArray(".section").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // 🔍 Project cards zoom-in
      gsap.from("#projects .project-card", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#projects",
          start: "top 80%",
        },
      });

      // 📜 Timeline slide-in
      gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
          x: i % 2 === 0 ? -120 : 120,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
        });
      });

      // 📮 Contact form bounce
      gsap.from("#contact .contact-form", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 85%",
        },
      });

      // 🎨 Background fade per section
      gsap.utils.toArray(".section").forEach((section) => {
        gsap.fromTo(
          section,
          { backgroundColor: "transparent" },
          {
            backgroundColor: "#0f0f0f",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          }
        );
      });
    });

    const handleImageLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleImageLoad);

    return () => {
      ctx.revert(); // ✅ Clean GSAP context
      window.removeEventListener("load", handleImageLoad);
    };
  }, []);
}
