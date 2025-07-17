// components/Wheel.jsx
import { animate, motion, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import wheelImg from "../assets/wheel.png";

const sections = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "personal",
  "contact",
];

export default function Wheel() {
  const rotation = useMotionValue(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dragStartAngle = useRef(0);

  // 🔄 Rotate wheel on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY;
      setLastScrollY(currentY);

      animate(rotation, rotation.get() + diff * 0.3, {
        type: "spring",
        stiffness: 60,
        damping: 14,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, rotation]);

  // 🌀 Rotate + scroll manually using wheel
  const handleManualWheel = useCallback(
    (e) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      const direction = delta > 0 ? 1 : -1;

      rotateAndScroll(direction);
    },
    [rotation]
  );

  // 🧠 Helper for scrolling & rotating
  const rotateAndScroll = (direction) => {
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
      damping: 12,
    });
  };

  // 🎯 Manual drag to rotate & scroll
  const handleDragEnd = (_, info) => {
    const delta = info.offset.x; // horizontal drag
    const threshold = 30; // adjust as needed
    if (Math.abs(delta) > threshold) {
      const direction = delta > 0 ? 1 : -1;
      rotateAndScroll(direction);
    }
  };

  return (
    <motion.div
      className="fixed bottom-10 right-10 z-50 w-24 h-24 md:w-32 md:h-32 cursor-grab active:cursor-grabbing"
      style={{ rotate: rotation }}
      onWheel={handleManualWheel}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    >
      <img
        src={wheelImg}
        alt="Navigation Wheel"
        className="w-full h-full object-contain select-none pointer-events-auto"
      />
    </motion.div>
  );
}
