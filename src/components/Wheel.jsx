import { useEffect, useRef, useState } from "react";
import wheelImg from "../assets/wheel.png";

// Sections should match the section IDs in your HTML
const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "personal", label: "Personal" },
  { id: "contact", label: "Contact" },
];

const Wheel = () => {
  const wheelRef = useRef(null);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const elements = sections.map(({ id }) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex((s) => s.id === entry.target.id);
            const newAngle = index * (360 / sections.length);
            setAngle(newAngle);

            // Apply CSS transform manually
            if (wheelRef.current) {
              wheelRef.current.style.transform = `translateY(-50%) rotate(${newAngle}deg)`;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach((el) => el && observer.observe(el));
    return () => elements.forEach((el) => el && observer.unobserve(el));
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={wheelRef}
      className="fixed top-1/2 right-6 z-50 w-24 h-24 md:w-32 md:h-32 transition-transform duration-700 ease-out"
      style={{
        transform: "translateY(-50%) rotate(0deg)",
        transformOrigin: "50% 50%",
      }}
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
    </div>
  );
};

export default Wheel;
