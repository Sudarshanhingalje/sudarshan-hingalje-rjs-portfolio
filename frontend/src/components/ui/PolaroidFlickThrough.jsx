import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RefreshCw } from "lucide-react";

// Seeded pseudo-random number generator for deterministic card scatter
class SeededRandom {
  constructor(seed) {
    this.seed = seed;
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  range(min, max) {
    return min + this.next() * (max - min);
  }
}

// Function to calculate stable offsets based on image ID
const getDeterministicOffset = (index, id) => {
  const seed = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) + index;
  const rng = new SeededRandom(seed);
  return {
    x: rng.range(-12, 12),
    y: rng.range(-12, 12),
    rotate: rng.range(-8, 8),
    scale: rng.range(0.96, 1.02)
  };
};

const sampleImages = [
  {
    id: "img5",
    src: "/assets/img5.JPG",
    alt: "Sudarshan Hingalje",
    caption: "Sudarshan Hingalje ✨"
  },
  {
    id: "img0",
    src: "/assets/img0.png",
    alt: "Coding Journey",
    caption: "Building Ideas 💻"
  },
  {
    id: "img1",
    src: "/assets/img1.jpg",
    alt: "Tech Stack & Systems",
    caption: "Tech Stack & Dev ⚙️"
  },
  {
    id: "img2",
    src: "/assets/img2.JPG",
    alt: "Innovative Solutions",
    caption: "Creative Solutions 🧠"
  },
  {
    id: "img3",
    src: "/assets/img3.JPG",
    alt: "Algorithms & Logic",
    caption: "Logic & Algorithms 🚀"
  },
  {
    id: "img4",
    src: "/assets/img4.JPG",
    alt: "Collaboration & Success",
    caption: "Teamwork & Success 🤝"
  }
];

export default function PolaroidFlickThrough({ className = "" }) {
  const [stack, setStack] = React.useState(sampleImages);
  const [exitX, setExitX] = React.useState(0);
  const [exitY, setExitY] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Track the offsets for each card in the stack
  const cardOffsets = React.useMemo(() => {
    return sampleImages.reduce((acc, img, index) => {
      acc[img.id] = getDeterministicOffset(index, img.id);
      return acc;
    }, {});
  }, []);

  const handleDragEnd = (event, info) => {
    if (shouldReduceMotion) return;

    const threshold = 120;
    const swipeX = info.offset.x;
    const swipeY = info.offset.y;

    if (Math.abs(swipeX) > threshold || Math.abs(swipeY) > threshold) {
      const dirX = swipeX > 0 ? 400 : -400;
      const dirY = swipeY > 0 ? 400 : -400;

      if (Math.abs(swipeX) > Math.abs(swipeY)) {
        setExitX(dirX);
        setExitY(0);
      } else {
        setExitX(0);
        setExitY(dirY);
      }
    } else {
      setExitX(0);
      setExitY(0);
    }
  };

  const handleAnimationComplete = () => {
    if (exitX !== 0 || exitY !== 0) {
      // Cycle top card to the bottom of the stack
      setStack((prev) => [...prev.slice(1), prev[0]]);
      setExitX(0);
      setExitY(0);
    }
  };

  const handleReset = () => {
    setStack(sampleImages);
    setExitX(0);
    setExitY(0);
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Cards stack */}
      <div className="relative w-60 h-72 sm:w-72 sm:h-88 flex items-center justify-center">
        {stack.map((img, index) => {
          const isTop = index === 0;
          const offset = cardOffsets[img.id] || { x: 0, y: 0, rotate: 0, scale: 1 };
          
          // Z-index calculation: top card has highest z-index
          const zIndex = stack.length - index;

          return (
            <motion.div
              key={img.id}
              className="absolute w-60 h-72 sm:w-72 sm:h-88 bg-white dark:bg-slate-800 p-3 pb-8 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between cursor-grab active:cursor-grabbing transform-gpu"
              style={{
                zIndex,
                originX: 0.5,
                originY: 0.5,
              }}
              drag={isTop && !shouldReduceMotion}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              onAnimationComplete={isTop ? handleAnimationComplete : undefined}
              animate={
                isTop
                  ? {
                      x: exitX,
                      y: exitY,
                      rotate: 0,
                      scale: 1.04,
                    }
                  : {
                      x: offset.x,
                      y: offset.y,
                      rotate: offset.rotate,
                      scale: offset.scale,
                    }
              }
              transition={
                isTop && (exitX !== 0 || exitY !== 0)
                  ? { duration: 0.35, ease: "easeOut" }
                  : { type: "spring", stiffness: 320, damping: 25 }
              }
              whileHover={isTop ? { scale: 1.06, rotate: 1 } : {}}
            >
              {/* Image Container */}
              <div className="w-full aspect-square overflow-hidden rounded bg-slate-100 dark:bg-slate-900 border border-slate-200/20 shadow-inner">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover pointer-events-none"
                  loading="eager"
                />
              </div>

              {/* Polaroid Caption */}
              <div className="text-center font-script text-2xl tracking-wide text-slate-800 dark:text-slate-200 truncate mt-2">
                {img.caption}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Reshuffle Button */}
      <button
        onClick={handleReset}
        className="absolute -bottom-14 right-2 sm:right-6 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md text-slate-700 dark:text-slate-300 p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 group z-[100]"
        title="Reset Stack"
      >
        <RefreshCw className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
      </button>
    </div>
  );
}
