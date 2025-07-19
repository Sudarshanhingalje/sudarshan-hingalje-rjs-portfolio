import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import { motion } from "framer-motion";
import "./SmoothScroll.css";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => t * (2 - t),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

// ScrollSnapping.css
/* Place this CSS in a separate file (e.g., SmoothScroll.css) and import it */
html,
body {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

section {
  scroll-snap-align: start;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
}