import { animate, motion, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import clickSoundFile from "../assets/click.mp3";
import wheelImg from "../assets/wheel-fixed.svg";

const sections = [
  "header",
  "about",
  "skills",
  "projects",
  "experience",
  "personal",
  "certificates",
  "contact",
  "footer",
];

export default function Wheel() {
  const rotation = useMotionValue(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBouncingArrow, setShowBouncingArrow] = useState(false);
  const centerRef = useRef(null);
  const isDragging = useRef(false);
  const lastAngle = useRef(null);
  const lastTime = useRef(null);
  const velocity = useRef(0);
  const anglePerSection = 360 / sections.length;

  useEffect(() => {
    // Only show if it's the first visit
    const isFirstVisit = localStorage.getItem("portfolio_first_visit") !== "false";
    setShowBouncingArrow(isFirstVisit);

    // Hide arrow once user starts interacting with the page
    const handleInteraction = () => {
      setShowBouncingArrow(false);
      localStorage.setItem("portfolio_first_visit", "false");
    };

    // Listen only to explicit user inputs to ignore browser layout scroll restoration on load
    window.addEventListener("wheel", handleInteraction, { passive: true });
    window.addEventListener("touchmove", handleInteraction, { passive: true });
    window.addEventListener("pointerdown", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  const playClick = () => {
    const audio = new Audio(clickSoundFile);
    audio.play().catch(() => {});
  };

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

  const handleManualWheel = useCallback(
    (e) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      const direction = delta > 0 ? 1 : -1;
      rotateAndScroll(direction);
    },
    [rotation]
  );

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

    animate(rotation, rotation.get() + direction * anglePerSection, {
      type: "spring",
      stiffness: 70,
      damping: 12,
    });

    playClick();
  };

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

  const handleClick = (e) => {
    const rect = centerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const isRightHalf = clickX > rect.width / 2;
    rotateAndScroll(isRightHalf ? 1 : -1);
  };

  return (
    <>
      {/* Bouncing arrow — fixed independently above the wheel */}
      {showBouncingArrow && (
        <div className="fixed bottom-[9.5rem] right-[3.5rem] md:bottom-[11.5rem] md:right-[4rem] z-[60] flex flex-col items-center pointer-events-none animate-bounce">
          <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400 bg-slate-950/90 border border-yellow-400/30 px-2.5 py-0.5 rounded-full shadow-lg mb-1 whitespace-nowrap animate-pulse">
            Sudarshan Chakra
          </span>
          <svg
            className="w-7 h-7 text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7-7-7m14-6l-7 7-7-7"
            />
          </svg>
        </div>
      )}

      {/* Original wheel — untouched fixed position */}
      <motion.div
        ref={centerRef}
        className="fixed bottom-10 right-10 z-50 w-32 h-32 md:w-40 md:h-40 cursor-grab active:cursor-grabbing select-none"
        style={{ rotate: rotation }}
        onWheel={handleManualWheel}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full z-20 shadow" />
        <img
          src={wheelImg}
          alt="Navigation Wheel"
          className="w-full h-full object-contain pointer-events-auto"
        />
      </motion.div>
    </>
  );
}
