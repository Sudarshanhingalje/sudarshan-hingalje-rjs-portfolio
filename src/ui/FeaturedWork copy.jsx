// src/components/FeaturedWork.jsx
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import TechParallax from "./TechNamesScrolling";

const FeaturedWork = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateX = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const springX = useSpring(translateX, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] overflow-hidden bg-black flex items-center"
    >
      <motion.div
        style={{ x: springX }}
        className="flex gap-10 px-10 whitespace-nowrap"
      >
        {TechParallax.map((item, index) => (
          <div
            key={index}
            className="min-w-[400px] h-[500px] bg-[#1c1c1c] text-white rounded-2xl overflow-hidden shadow-xl border border-neutral-800"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-2/3 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-neutral-400">{item.description}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedWork;
