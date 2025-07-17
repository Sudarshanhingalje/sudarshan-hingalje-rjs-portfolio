// components/Wheel.jsx
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import wheelImg from "../assets/wheel.png"; // adjust path if needed

const sections = ["home", "about", "skills", "projects", "contact"];

export default function Wheel() {
  const rotation = useMotionValue(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 🔄 Rotate wheel based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY;
      setLastScrollY(currentY);
      animate(rotation, rotation.get() + diff * 0.3, {
        type: "spring",
        stiffness: 60,
        damping: 12,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 🌀 Scroll page when wheel is rotated manually
  const handleWheelRotate = (_, info) => {
    const delta = info.delta.x || info.delta.y;
    const direction = delta > 0 ? 1 : -1;

    const currentSectionIndex = sections.findIndex((id) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      );
    });

    const nextIndex = Math.min(
      sections.length - 1,
      Math.max(0, currentSectionIndex + direction)
    );
    const nextSection = document.getElementById(sections[nextIndex]);

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }

    animate(rotation, rotation.get() + direction * 60, {
      type: "spring",
      stiffness: 70,
      damping: 10,
    });
  };

  return (
    <motion.div
      className="fixed bottom-10 right-10 z-50 w-24 h-24 md:w-32 md:h-32 "
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleWheelRotate}
      style={{ rotate: rotation }}
    >
      <img
        src={wheelImg}
        alt="Navigation Wheel"
        className="w-full h-full object-contain select-none pointer-events-none"
      />
    </motion.div>
  );
}
