import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimation() {
  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // ✅ Header hide on scroll down
    gsap.to("#header", {
      y: -100,
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // ✅ Pin About Section with parallax
    gsap.to("#about .about-bg", {
      yPercent: -20,
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // ✅ Stagger skill cards using timeline
    const skillTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    skillTimeline.from(".skill-card", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)",
    });

    // ✅ Wipe animation between sections
    const sections = document.querySelectorAll(".section");

    sections.forEach((section, i) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ✅ Project zoom-in effect
    gsap.from("#projects .project-card", {
      scale: 0.8,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#projects",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // ✅ Experience timeline slide in
    gsap.utils.toArray(".timeline-item").forEach((el, i) => {
      gsap.from(el, {
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ✅ Contact form bounce
    gsap.from("#contact .contact-form", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "bounce.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // ✅ Section background fade transitions
    gsap.utils.toArray(".section").forEach((section, i) => {
      gsap.fromTo(
        section,
        { backgroundColor: "transparent" },
        {
          backgroundColor: "#0f0f0f",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );
    });

    // Optional: Refresh ScrollTrigger on image load
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  }, []);
}
