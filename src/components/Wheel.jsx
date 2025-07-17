import { animate, motion, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import clickSoundFile from "../assets/click.mp3";
import wheelImg from "../assets/wheel.png"; // ✅ Must have visible markings

// 📌 Section IDs must match your page structure
const sections = [
  "header",
  "about",
  "skills",
  "projects",
  "experience",
  "personal",
  "contact",
  "footer",
];

export default function Wheel() {
  const rotation = useMotionValue(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const centerRef = useRef(null);
  const isDragging = useRef(false);
  const lastAngle = useRef(null);
  const lastTime = useRef(null);
  const velocity = useRef(0);
  const currentIndex = useRef(0);

  const anglePerSection = 360 / sections.length;

  const playClick = () => {
    const audio = new Audio(clickSoundFile);
    audio.play().catch(() => {});
  };

  // 🔁 Scroll-based rotation (snap to section)
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY;
      setLastScrollY(currentY);

      const direction = diff > 0 ? 1 : -1;
      rotateToSection(currentIndex.current + direction);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 🌀 Mouse wheel hover over the wheel
  const handleManualWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY || e.deltaX;
    const direction = delta > 0 ? 1 : -1;
    rotateToSection(currentIndex.current + direction);
  }, []);

  // 🔁 Scroll + rotate to section
  const rotateToSection = (newIndex) => {
    newIndex = Math.max(0, Math.min(sections.length - 1, newIndex));
    currentIndex.current = newIndex;

    const angle = newIndex * anglePerSection;

    animate(rotation, angle, {
      type: "spring",
      stiffness: 80,
      damping: 18,
    });

    const target = document.getElementById(sections[newIndex]);
    if (target) target.scrollIntoView({ behavior: "smooth" });

    playClick();
  };

  // 👆 Drag to rotate freely
  const handlePointerDown = (e) => {
    isDragging.current = true;
    lastAngle.current = getAngle(e);
    lastTime.current = Date.now();
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const angle = getAngle(e);
    const now = Date.now();

    if (lastAngle.current !== null) {
      const diff = angle - lastAngle.current;
      const timeDiff = now - lastTime.current;
      velocity.current = diff / timeDiff;
      rotation.set(rotation.get() + diff);
    }

    lastAngle.current = angle;
    lastTime.current = now;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    lastAngle.current = null;
    lastTime.current = null;

    const inertiaAngle = velocity.current * 1500;
    const finalAngle = rotation.get() + inertiaAngle;
    const snapped = Math.round(finalAngle / anglePerSection) * anglePerSection;

    const snappedIndex = Math.round(snapped / anglePerSection);
    currentIndex.current = Math.max(
      0,
      Math.min(sections.length - 1, snappedIndex)
    );

    animate(rotation, snapped, {
      type: "spring",
      stiffness: 80,
      damping: 18,
    });

    const target = document.getElementById(sections[currentIndex.current]);
    if (target) target.scrollIntoView({ behavior: "smooth" });

    playClick();

    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  const getAngle = (e) => {
    const rect = centerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  // 🖱️ CLICK to rotate (left/right half)
  const handleClick = (e) => {
    const rect = centerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const isRightHalf = clickX > rect.width / 2;
    const direction = isRightHalf ? 1 : -1;
    rotateToSection(currentIndex.current + direction);
  };

  return (
    <motion.div
      ref={centerRef}
      className="fixed bottom-10 right-10 z-50 w-24 h-24 md:w-32 md:h-32 cursor-grab active:cursor-grabbing select-none"
      style={{ rotate: rotation }}
      onWheel={handleManualWheel}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      {/* 🔺 Rotation indicator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full z-20 shadow" />

      {/* 🖼️ Wheel image (must show rotation marks!) */}
      <img
        src={wheelImg}
        alt="Navigation Wheel"
        className="w-full h-full object-contain pointer-events-auto"
      />
    </motion.div>
  );
}
