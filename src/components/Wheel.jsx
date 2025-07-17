import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import wheelImg from "../assets/wheel.png";

// Match IDs to your existing section components
const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "personal", label: "Personal" },
  { id: "contact", label: "Contact" },
];

const Wheel = () => {
  const [angle, setAngle] = useState(0);

  const sectionEls = useRef([]);

  useEffect(() => {
    sectionEls.current = sections.map(({ id }) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex((s) => s.id === entry.target.id);
            setAngle(index * (360 / sections.length));
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sectionEls.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionEls.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="fixed top-1/2 right-6 -translate-y-1/2 z-50 w-24 h-24 md:w-32 md:h-32"
      animate={{ rotate: angle }}
      transition={{ type: "spring", stiffness: 70 }}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      <img
        src={wheelImg}
        alt="Navigation Wheel"
        className="w-full h-full select-none pointer-events-none"
      />
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
  );
};

export default Wheel;
