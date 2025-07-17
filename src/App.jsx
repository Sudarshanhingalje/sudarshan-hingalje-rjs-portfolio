import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import wheelImg from "./assets/wheel.png";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "personal", label: "Personal" },
  { id: "contact", label: "Contact" },
];

const Wheel = () => {
  const controls = useAnimation();
  const refs = useRef([]);

  // Create a ref for each section using IntersectionObserver
  const observers = sections.map((_, i) => {
    const [ref, inView] = useInView({ threshold: 0.6 });
    refs.current[i] = ref;
    return inView;
  });

  // Rotate wheel when a section is in view
  useEffect(() => {
    const activeIndex = observers.findIndex((v) => v === true);
    if (activeIndex !== -1) {
      const angle = activeIndex * 45;
      controls.start({ rotate: angle });
    }
  }, [observers.join("")]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Sticky wheel */}
      <motion.div
        className="fixed top-1/2 right-6 -translate-y-1/2 z-50 w-24 h-24 md:w-32 md:h-32 cursor-pointer"
        animate={controls}
        transition={{ type: "spring", stiffness: 80 }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <img
          src={wheelImg}
          alt="wheel"
          className="w-full h-full select-none pointer-events-none"
        />
        {/* Transparent buttons */}
        <div className="absolute inset-0 flex flex-wrap items-center justify-center">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="absolute w-1/2 h-1/2 bg-transparent"
              style={{
                transform: `rotate(${
                  i * (360 / sections.length)
                }deg) translateY(-50%)`,
                transformOrigin: "50% 100%",
              }}
              aria-label={`Go to ${s.label}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Hidden intersection refs (attach to your real section components) */}
      <div className="hidden">
        {sections.map((_, i) => (
          <div key={i} ref={refs.current[i]} />
        ))}
      </div>
    </>
  );
};

export default Wheel;
