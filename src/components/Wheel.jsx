import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";
import wheelImg from "../assets/wheel.png";

const ScrollWheel = () => {
  const { scrollY } = useScroll();
  const rotateScroll = useTransform(scrollY, [0, 1000], [0, 360]);

  // Optional: Add rotation on mouse move
  const mouseRotate = useMotionValue(0);
  const combinedRotate = useTransform(
    [rotateScroll, mouseRotate],
    ([scrollR, mouseR]) => scrollR + mouseR
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth - 80; // ~ right-10 + half img width
      const centerY = window.innerHeight / 2;
      const angle =
        (Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180) /
        Math.PI /
        10;

      mouseRotate.set(angle); // rotate a little based on pointer angle
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseRotate]);

  return (
    <motion.img
      src={wheelImg}
      alt="Steering Wheel"
      style={{ rotate: combinedRotate }}
      className="fixed right-10 top-1/2 -translate-y-1/2 w-32 h-32 z-50 pointer-events-none select-none"
    />
  );
};

export default ScrollWheel;
