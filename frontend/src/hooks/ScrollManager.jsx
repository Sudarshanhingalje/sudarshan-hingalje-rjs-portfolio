import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ScrollManager = ({ children }) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);

  // Smooth spring scroll (keeping your exact settings)
  const smoothScrollY = useSpring(scrollY, {
    damping: 50,
    stiffness: 100,
    restSpeed: 0.1,
  });

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = (e) => {
      if (e.deltaY) {
        e.preventDefault();
        setIsScrolling(true);

        const scrollSpeed = 0.8;
        const targetScrollTop = window.scrollY + e.deltaY * scrollSpeed;

        window.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
      }
    };

    const options = { passive: false };
    window.addEventListener("wheel", handleScroll, options);

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
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Your exact progress calculation
  const scrollProgress = useTransform(scrollY, [0, 4000], [0, 1]);
  const scaleY = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restSpeed: 0.01,
  });

  // Enhanced visual elements
  const progressOpacity = useTransform(
    scrollY,
    [0, 100, 3900, 4000],
    [0.6, 1, 1, 0.6]
  );
  const glowIntensity = isScrolling ? 1 : 0.3;

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        className="fixed left-4 top-[40%] -translate-y-1/2 w-1.5 h-[60vh] z-50 rounded-full"
        style={{ opacity: progressOpacity }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full border border-white/20" />

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 origin-top rounded-full"
          style={{ scaleY }}
        />

        <motion.div
          className="absolute -inset-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 origin-top rounded-full blur-sm"
          style={{
            scaleY,
            opacity: glowIntensity,
          }}
          animate={{ opacity: isScrolling ? [0.3, 0.8, 0.3] : 0.3 }}
          transition={{ duration: 0.6, repeat: isScrolling ? Infinity : 0 }}
        />

        <motion.div
          className="absolute w-3 h-3  rounded-full -right-0.5  shadow-lg border border-white/30"
          style={{
            top: useTransform(
              scrollProgress,
              [0, 1],
              ["0%", "calc(100% - 12px)"]
            ),
          }}
          animate={
            isScrolling
              ? {
                  scale: [1, 1.4, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(255,255,255,0.4)",
                    "0 0 0 8px rgba(255,255,255,0)",
                    "0 0 0 0 rgba(255,255,255,0)",
                  ],
                }
              : { scale: 1 }
          }
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      <motion.div
        className="fixed top-8 left-4 text-black/70 dark:text-white/70 text-xs font-mono tracking-wider"
        animate={{
          opacity: isScrolling ? 1 : 0,
          y: isScrolling ? 0 : -10,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1 h-1 bg-blue-400 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          SCROLLING
        </div>
      </motion.div>

      {/* Scroll hint (bottom of screen) */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm flex flex-col items-center gap-3"
        style={{
          opacity: useTransform(scrollY, [0, 200], [1, 0]),
        }}
      >
        <div className="font-light tracking-wide">Scroll to explore</div>
        <motion.div
          className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-0.5 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Your exact scrollable content */}
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
