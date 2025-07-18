import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";

// Register plugin once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function useModernScrollReveal() {
  useEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // ✅ Header hides on scroll
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

    // ✅ About avatar parallax effect
    gsap.to("#about .about-avatar", {
      yPercent: -20,
      scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });

    // ✅ Skills reveal animation
    gsap.utils.toArray(".skill-card").forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          delay: i * 0.1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // ✅ Projects zoom-in animation
    gsap.utils.toArray("#projects .project-card").forEach((card, i) => {
      gsap.from(card, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ✅ Experience timeline animation
    gsap.utils.toArray("#experience .timeline-item").forEach((item, i) => {
      gsap.from(item, {
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ✅ Personal goals stagger in
    gsap.utils.toArray("#personal .goal-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: i * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Refresh ScrollTrigger after page load
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }, []);
}
