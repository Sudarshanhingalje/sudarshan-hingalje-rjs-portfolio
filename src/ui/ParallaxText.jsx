import { wrap } from "@motionone/utils";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Children, useRef } from "react";

export default function ParallaxText({ children }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 40,
    stiffness: 300,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    directionFactor.current = velocityFactor.get() < 0 ? -1 : 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const childArray = Children.toArray(children);

  return (
    <div className="overflow-hidden whitespace-nowrap w-full">
      <motion.div
        className="flex gap-12 text-lg font-semibold items-center text-black"
        style={{ x }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-8 items-center">
            {[...Children.toArray(children)].map((child, index) => (
              <span key={index}>{child}</span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
