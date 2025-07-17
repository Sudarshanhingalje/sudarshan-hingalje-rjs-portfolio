import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import wheelImg from "../assets/wheel.png";

// Define sections (must match your real IDs)
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

  // One observer for each section
  const sectionRefs = sections.map(({ id }) =>
    useInView({
      triggerOnce: false,
      threshold: 0.5,
      rootMargin: "-10% 0px",
    })
  );

  // Rotate when a section is in view
  useEffect(() => {
    const activeIndex = sectionRefs.findIndex(([, inView]) => inView);
    if (activeIndex !== -1) {
      const angle = activeIndex * (360 / sections.length);
      controls.start({ rotate: angle });
    }
  }, [sectionRefs.map(([, inView]) => inView).join("")]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Wheel: sticky and always visible */}
      <motion.div
        className="fixed top-1/2 right-4 -translate-y-1/2 z-50 w-24 h-24 md:w-32 md:h-32 cursor-pointer"
        animate={controls}
        transition={{ type: "spring", stiffness: 60 }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <img
          src={wheelImg}
          alt="wheel"
          className="w-full h-full select-none pointer-events-none"
        />
        {/* Clickable segments */}
        <div className="absolute inset-0 flex flex-wrap items-center justify-center">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="absolute w-1/2 h-1/2 bg-transparent"
              style={{
                transform: `rotate(${
                  i * (360 / sections.length)
                }deg) translateY(-50%)`,
                transformOrigin: "50% 100%",
              }}
              aria-label={`Go to ${section.label}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Hidden observer divs */}
      <div className="hidden">
        {sectionRefs.map(([ref], i) => (
          <div key={sections[i].id} ref={ref} />
        ))}
      </div>
    </>
  );
};

export default Wheel;
