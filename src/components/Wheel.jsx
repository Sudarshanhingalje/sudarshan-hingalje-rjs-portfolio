import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const labels = [
  "Design",
  "Frontend",
  "Backend",
  "Cloud",
  "AI/ML",
  "Soft Skills",
  "Testing",
  "DevOps",
];

export default function Wheel() {
  const angle = useMotionValue(0);
  const wheelRef = useRef(null);

  // Allow scroll to rotate the wheel
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      angle.set(scrollY * 0.5); // Control rotation speed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [angle]);

  // Convert angle to rotation string for transform
  const rotate = useTransform(angle, (a) => `rotate(${a}deg)`);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <motion.div
        ref={wheelRef}
        drag
        dragMomentum={false}
        style={{ rotate }}
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        dragElastic={0.1}
        className="relative w-[300px] h-[300px] rounded-full border-[8px] border-[#00f3] flex items-center justify-center"
      >
        {labels.map((label, i) => {
          const angle = (360 / labels.length) * i;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[130px] origin-center"
              style={{
                transform: `rotate(${angle}deg) translateY(-130px)`,
              }}
            >
              <span className="text-white text-sm">{label}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
