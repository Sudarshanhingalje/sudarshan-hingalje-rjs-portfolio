import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100); // start off-screen
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    document.body.style.cursor = "none"; // Hide native cursor

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 z-[9999] pointer-events-none rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 opacity-80 mix-blend-difference shadow-xl"
      style={{ x, y }}
    />
  );
};

export default CustomCursor;
