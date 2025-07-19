import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Smooth but responsive
      easing: (t) => t * (2 - t), // Ease-out
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // clean up on unmount
      lenis.on("scroll", ScrollTrigger.update);
    };
  }, []);

  return <>{children}</>;
}
