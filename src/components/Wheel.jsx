import { animate, motion, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import clickSoundFile from "../assets/click.mp3";
import wheelImg from "../assets/wheel.png"; // Make sure the image has clear markings

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
  const centerRef = useRef(null);
  const isDragging = useRef(false);
  const lastAngle = useRef(null);
  const lastTime = useRef(null);
  const velocity = useRef(0);

  const playClick = () => {
    const audio = new Audio(clickSoundFile);
    audio.play().catch(() => {});
  };

  // 🔁 Scroll-based rotation
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

  // 🌀 Mouse wheel hover over the wheel
  const handleManualWheel = useCallback(
    (e) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      const direction = delta > 0 ? 1 : -1;
      rotateAndScroll(direction);
    },
    [rotation]
  );

  // 🧭 Helper: rotate wheel + scroll sections
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
    const snapped = Math.round(finalAngle / 60) * 60;

    animate(rotation, snapped, {
      type: "spring",
      stiffness: 80,
      damping: 18,
    });

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

  // 🖱️ CLICK-BASED ROTATION
  const handleClick = (e) => {
    const rect = centerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const isRightHalf = clickX > rect.width / 2;

    if (isRightHalf) {
      rotateAndScroll(1); // Clockwise
    } else {
      rotateAndScroll(-1); // Counterclockwise
    }
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

      {/* 🖼️ Wheel image (must have visible spokes/marks!) */}
      <img
        src={wheelImg}
        alt="Navigation Wheel"
        className="w-full h-full object-contain pointer-events-auto"
      />
    </motion.div>
  );
}
