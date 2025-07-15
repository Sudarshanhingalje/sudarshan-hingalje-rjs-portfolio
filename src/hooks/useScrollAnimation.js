// /hooks/useScrollAnimation.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const useScrollAnimation = () => {
  useEffect(() => {
    // Header to About
    gsap.fromTo(
      "#about",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // About to Skills
    gsap.fromTo(
      "#skills",
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Skills to Projects
    gsap.fromTo(
      "#projects",
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Projects to Contact
    gsap.fromTo(
      "#contact",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
};

export default useScrollAnimation;
