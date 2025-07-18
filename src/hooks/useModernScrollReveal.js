// src/hooks/useModernScrollReveal.js
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useModernScrollReveal() {
  useEffect(() => {
    // Reset all triggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // ✨ Header fade and slide out on scroll
    gsap.to("#header", {
      y: -100,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

    // 👤 About section image parallax
    gsap.to(".about-avatar", {
      yPercent: -15,
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // 💬 About text reveal
    gsap.utils
      .toArray("#about p, #about h2, #about blockquote")
      .forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.1,
        });
      });

    // 🎬 Avatar entrance bounce
    gsap.from(".about-avatar img", {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".about-avatar",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);
}
