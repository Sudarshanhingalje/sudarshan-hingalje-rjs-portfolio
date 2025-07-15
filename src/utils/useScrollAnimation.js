import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimation() {
  useEffect(() => {
    // Clean up previous scroll triggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // 🔹 Header Animation
    gsap.to("#header", {
      y: -80,
      opacity: 0.85,
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
        scrub: true,
      },
    });

    // 🔹 About Section
    gsap.from("#about .about-text", {
      opacity: 0,
      y: 60,
      duration: 1,
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from("#about .about-image", {
      opacity: 0,
      x: 100,
      duration: 1,
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // 🔹 Skills Section
    gsap.from("#skills", {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: "#skills",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // 🔹 Projects Section
    gsap.from("#projects", {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      scrollTrigger: {
        trigger: "#projects",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // 🔹 Experience Section
    gsap.from("#experience", {
      opacity: 0,
      x: -80,
      duration: 1,
      scrollTrigger: {
        trigger: "#experience",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // 🔹 Personal Section
    gsap.from("#personal", {
      opacity: 0,
      y: 80,
      duration: 1,
      scrollTrigger: {
        trigger: "#personal",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // 🔹 Contact Section
    gsap.from("#contact", {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: "#contact",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Smooth fade transition between sections
    const sections = [
      "#about",
      "#skills",
      "#projects",
      "#experience",
      "#personal",
      "#contact",
    ];

    sections.forEach((section, i) => {
      const next = sections[i + 1];
      if (next) {
        gsap.fromTo(
          section,
          { opacity: 1 },
          {
            opacity: 0.3,
            scrollTrigger: {
              trigger: next,
              start: "top 90%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
      }
    });
  }, []);
}
