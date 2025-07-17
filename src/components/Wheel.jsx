import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import wheelImg from "../assets/wheel.png";

const sections = ["hero", "about", "projects", "contact"];

const Wheel = () => {
  const [angle, setAngle] = useState(0);
  const controls = useAnimation();

  // Map section names to ref & observer
  const sectionRefs = sections.map(() => useRef());
  const inViewRefs = sectionRefs.map((ref) =>
    useInView({ threshold: 0.5, triggerOnce: false })
  );

  // Rotate on scroll when section enters view
  useEffect(() => {
    inViewRefs.forEach(([ref, inView], i) => {
      if (inView) {
        const newAngle = i * 45;
        setAngle(newAngle);
        controls.start({ rotate: newAngle });
      }
    });
  }, [inViewRefs.map(([_, inView]) => inView).join(",")]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Fixed wheel */}
      <motion.div
        className="fixed top-4 right-4 z-50 w-24 h-24 md:w-36 md:h-36 cursor-pointer"
        animate={controls}
        transition={{ type: "spring", stiffness: 60 }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <img
          src={wheelImg}
          alt="wheel"
          className="w-full h-full select-none pointer-events-none"
        />
        {/* Invisible clickable segments */}
        <div className="absolute inset-0 flex flex-wrap items-center justify-center">
          {sections.map((section, i) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="absolute w-1/2 h-1/2 bg-transparent"
              style={{
                transform: `rotate(${i * 90}deg) translateY(-50%)`,
                transformOrigin: "50% 100%",
              }}
              aria-label={`Go to ${section}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Dummy content for each section */}
      {sections.map((section, i) => (
        <div
          key={section}
          id={section}
          ref={sectionRefs[i]}
          className="h-screen flex items-center justify-center text-4xl font-bold bg-slate-100 border-b"
        >
          {section.toUpperCase()}
        </div>
      ))}
    </>
  );
};

export default Wheel;
