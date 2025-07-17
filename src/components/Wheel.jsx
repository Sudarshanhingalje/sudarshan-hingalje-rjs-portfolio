import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SNAP = false; // Set to true if you want snap-to-section rotation

const sections = 6;
const anglePerSection = 360 / sections;

export default function Wheel() {
  const wheelRef = useRef(null);
  const angle = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastY = useRef(0);
  const velocity = useRef(0);

  // Rotate on page scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      angle.set(scrollY % 360); // Keep it within 0-360
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [angle]);

  // Mouse wheel rotate
  useEffect(() => {
    const handleWheel = (e) => {
      if (wheelRef.current && wheelRef.current.contains(e.target)) {
        e.preventDefault();
        const delta = e.deltaY;
        angle.set((prev) => prev + delta * 0.5);
        window.scrollBy({ top: delta, behavior: "smooth" });
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [angle]);

  // Drag with mouse
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (wheelRef.current && wheelRef.current.contains(e.target)) {
        setIsDragging(true);
        lastY.current = e.clientY;
      }
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const delta = e.clientY - lastY.current;
      velocity.current = delta;
      angle.set((prev) => prev + delta);
      lastY.current = e.clientY;
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);

        if (SNAP) {
          const currentAngle = angle.get();
          const snapped =
            Math.round(currentAngle / anglePerSection) * anglePerSection;
          animate(angle, snapped, {
            type: "spring",
            stiffness: 200,
            damping: 20,
          });
        }
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [angle]);

  const rotate = useTransform(angle, (a) => `rotate(${a}deg)`);

  return (
    <motion.div
      ref={wheelRef}
      style={{
        transform: rotate,
        width: 300,
        height: 300,
        borderRadius: "50%",
        border: "10px solid #ccc",
        position: "fixed",
        top: "10%",
        left: "50%",
        translateX: "-50%",
        zIndex: 999,
        cursor: isDragging ? "grabbing" : "grab",
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: "24px",
      }}
    >
      🎡 WHEEL
    </motion.div>
  );
}
