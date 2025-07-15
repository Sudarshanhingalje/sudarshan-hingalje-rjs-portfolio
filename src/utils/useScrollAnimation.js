// Install GSAP and ScrollMagic:
// npm install gsap scrollmagic

import { gsap } from "gsap";
import { useEffect } from "react";
import ScrollMagic from "scrollmagic";

export default function useScrollAnimation() {
  useEffect(() => {
    const controller = new ScrollMagic.Controller();

    // Animate Header on scroll
    gsap.set("#header", { opacity: 1 });

    new ScrollMagic.Scene({
      triggerElement: "#about",
      triggerHook: 0.5,
      duration: "100%",
    })
      .on("progress", (event) => {
        gsap.to("#header", {
          opacity: 1 - event.progress,
          y: -100 * event.progress,
          ease: "power2.out",
        });
      })
      .addTo(controller);

    // Animate About section when it comes in view
    gsap.set("#about .about-content", { opacity: 0, y: 100 });

    new ScrollMagic.Scene({
      triggerElement: "#about",
      triggerHook: 0.8,
      reverse: false,
    })
      .on("enter", () => {
        gsap.to("#about .about-content", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
        });
      })
      .addTo(controller);

    return () => controller.destroy();
  }, []);
}
