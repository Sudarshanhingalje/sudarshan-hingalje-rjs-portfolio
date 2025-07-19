// src/components/ParallaxImage.jsx
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function ParallaxImage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const layers = container.querySelectorAll(".layer");

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = 0.5 - e.pageX / innerWidth;
      const offsetY = 0.5 - e.pageY / innerHeight;

      layers.forEach((layer, i) => {
        const depth = (i + 1) * 10;
        gsap.to(layer, {
          duration: 0.5,
          x: offsetX * depth,
          y: offsetY * depth,
          ease: "power3.out",
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-[400px] h-[500px] mx-auto mt-12 perspective-1000"
    >
      <img
        src="css.png"
        className="layer absolute top-0 left-0 w-full h-full object-cover z-10"
        alt="Background Layer"
      />
      <img
        src="html.png"
        className="layer absolute top-0 left-0 w-full h-full object-cover z-20"
        alt="Middle Layer"
      />
      <img
        src="java.png"
        className="layer absolute top-0 left-0 w-full h-full object-cover z-30"
        alt="Front Layer"
      />
    </div>
  );
}
