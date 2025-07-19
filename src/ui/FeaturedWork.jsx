// src/components/FeaturedTechNames.jsx
import { motion, useMotionValue, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { techNames } from "../data/TechNamesScrolling";

export default function FeaturedTechNames() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const baseX = useMotionValue(0);
  let lastScrollY = 0;

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      const currentScrollY = scrollY.get();
      const direction = currentScrollY > lastScrollY ? -1 : 1;
      lastScrollY = currentScrollY;

      baseX.set(baseX.get() + direction * 2);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollY, baseX]);

  return (
    <section
      ref={ref}
      className="relative h-[80vh] overflow-hidden flex items-center justify-center bg-black"
    >
      <motion.div
        style={{ x: baseX }}
        className="absolute flex gap-10 items-center text-[25vw] font-cinzel uppercase text-[#1f1f1f] whitespace-nowrap opacity-80"
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-10">
            {techNames.map((name, idx) => (
              <span
                key={`${i}-${idx}`}
                className="image-text-hover transition-all duration-300"
              >
                {name}
              </span>
            ))}
          </div>
        ))}
      </motion.div>

      <h2 className="z-10 text-white text-5xl md:text-6xl lg:text-7xl font-light text-center image-text-hover">
        Featured Tech
      </h2>
    </section>
  );
}
