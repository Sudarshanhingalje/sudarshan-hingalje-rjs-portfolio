// hooks/useGSAPScrollTransition.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const useGSAPScrollTransition = () => {
  const headerAvatarRef = useRef(null);
  const aboutImageRef = useRef(null);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    const headerAvatar = headerAvatarRef.current;
    const aboutImage = aboutImageRef.current;
    const aboutSection = aboutSectionRef.current;

    if (!headerAvatar || !aboutImage || !aboutSection) return;

    // Create a timeline for the transition
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
        start: "top 80%", // When about section is 80% from top
        end: "top 20%", // When about section is 20% from top
        scrub: 1.5, // Smooth scrubbing effect
        invalidateOnRefresh: true, // Recalculate on resize
        onUpdate: (self) => {
          // Optional: Add custom logic during scroll
          console.log("Scroll progress:", self.progress);
        },
      },
    });

    // Get positions for smooth transition
    const headerRect = headerAvatar.getBoundingClientRect();
    const aboutRect = aboutImage.getBoundingClientRect();

    // Calculate the distance and scale needed
    const xDistance = aboutRect.left - headerRect.left;
    const yDistance = aboutRect.top - headerRect.top;
    const scaleRatio = aboutRect.width / headerRect.width;

    // Animate the header avatar
    tl.to(
      headerAvatar,
      {
        x: xDistance,
        y: yDistance,
        scale: scaleRatio,
        opacity: 0.3,
        zIndex: 100,
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );

    // Simultaneously animate the about image
    tl.fromTo(
      aboutImage,
      {
        opacity: 0.3,
        scale: 0.8,
        filter: "blur(5px)",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );

    // Optional: Add a subtle rotation or other effects
    tl.to(
      headerAvatar,
      {
        rotation: 360,
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return {
    headerAvatarRef,
    aboutImageRef,
    aboutSectionRef,
  };
};

// Alternative: More advanced morphing effect
export const useAdvancedMorphTransition = () => {
  const headerAvatarRef = useRef(null);
  const aboutImageRef = useRef(null);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    const headerAvatar = headerAvatarRef.current;
    const aboutImage = aboutImageRef.current;
    const aboutSection = aboutSectionRef.current;

    if (!headerAvatar || !aboutImage || !aboutSection) return;

    // Create master timeline
    const masterTL = gsap.timeline();

    // First: Setup the morph transition
    ScrollTrigger.create({
      trigger: aboutSection,
      start: "top 90%",
      end: "top 10%",
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress;

        // Morphing calculation
        const headerRect = headerAvatar.getBoundingClientRect();
        const aboutRect = aboutImage.getBoundingClientRect();

        const x = gsap.utils.interpolate(
          0,
          aboutRect.left - headerRect.left,
          progress
        );
        const y = gsap.utils.interpolate(
          0,
          aboutRect.top - headerRect.top,
          progress
        );
        const scale = gsap.utils.interpolate(
          1,
          aboutRect.width / headerRect.width,
          progress
        );
        const opacity = gsap.utils.interpolate(1, 0.2, progress);

        gsap.set(headerAvatar, {
          x: x,
          y: y,
          scale: scale,
          opacity: opacity,
          zIndex: 1000,
        });

        // About image fade in
        gsap.set(aboutImage, {
          opacity: gsap.utils.interpolate(0.2, 1, progress),
          scale: gsap.utils.interpolate(0.8, 1, progress),
          filter: `blur(${gsap.utils.interpolate(8, 0, progress)}px)`,
        });
      },
    });

    // Add entrance animations for about section content
    const aboutContent = aboutSection.querySelectorAll(".about-content > *");

    ScrollTrigger.batch(aboutContent, {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      },
      start: "top 80%",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return {
    headerAvatarRef,
    aboutImageRef,
    aboutSectionRef,
  };
};
