import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const ScrollManager = ({ children }) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Smooth scroll spring physics
  const smoothScrollY = useSpring(scrollY, {
    damping: 50,
    stiffness: 100,
    restSpeed: 0.1,
  });

  useEffect(() => {
    // Custom smooth scrolling behavior
    const handleScroll = (e) => {
      if (e.deltaY) {
        e.preventDefault();
        const scrollSpeed = 0.8;
        const targetScrollTop = window.scrollY + e.deltaY * scrollSpeed;

        window.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      }
    };

    // Enhanced scroll behavior for different devices
    const options = { passive: false };
    window.addEventListener("wheel", handleScroll, options);

    // Smooth scroll for touch devices
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      touchEndY = e.changedTouches[0].screenY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > 50) {
        const scrollSpeed = diff * 2;
        window.scrollTo({
          top: window.scrollY + scrollSpeed,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Progressive scroll indicator
  const scrollProgress = useTransform(scrollY, [0, 4000], [0, 1]);
  const scaleX = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restSpeed: 0.01,
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Main Content */}
      <motion.div
        style={{
          y: useTransform(smoothScrollY, [0, 1000], [0, -50]),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollManager;
