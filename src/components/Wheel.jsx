import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const WheelScrollAnimation = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".spoke",
      {
        scaleY: 0,
        opacity: 0,
      },
      {
        scaleY: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
        transformOrigin: "center",
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      {/* Wheel image */}
      <img
        src="/assets/Wheel.png" // replace with your path
        alt="Wheel"
        className="absolute w-[300px] h-[300px] object-contain"
      />

      {/* SVG over wheel */}
      <svg
        ref={svgRef}
        viewBox="0 0 300 300"
        className="absolute w-[300px] h-[300px]"
      >
        {[...Array(8)].map((_, i) => {
          const angle = (360 / 8) * i;
          const x = 150 + 100 * Math.cos((angle * Math.PI) / 180);
          const y = 150 + 100 * Math.sin((angle * Math.PI) / 180);
          return (
            <line
              key={i}
              x1="150"
              y1="150"
              x2={x}
              y2={y}
              stroke="white"
              strokeWidth="2"
              className="spoke"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default WheelScrollAnimation;
