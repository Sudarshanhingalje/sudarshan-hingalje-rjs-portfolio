// CustomCursor.jsx
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useEffect, useRef } from "react";

// Register GSAP plugins safely for browser
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable, InertiaPlugin);
}

const CustomCursor = () => {
  const targetRef = useRef(null);
  const followerRefs = useRef([]);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    // Cleanup on unmount
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  useEffect(() => {
    if (!targetRef.current || followerRefs.current.some((el) => !el)) return;

    // Function to create smooth follower movement
    function createFollowerMotion(target, duration) {
      const xTo = gsap.quickTo(target, "x", { duration, ease: "back.out" });
      const yTo = gsap.quickTo(target, "y", { duration, ease: "back.out" });
      return (x, y) => {
        xTo(x);
        yTo(y);
      };
    }

    const followers = followerRefs.current
      .slice()
      .reverse()
      .map((el, i) => createFollowerMotion(el, 0.25 + i * 0.1));

    // Draggable main cursor
    const draggable = Draggable.create(targetRef.current, {
      bounds: window,
      inertia: true,
      onDrag: updateFollowers,
      onThrowUpdate: updateFollowers,
    })[0];

    function updateFollowers() {
      const { x, y } = targetRef.current._gsap;
      followers.forEach((f) => f(x, y));
    }

    return () => {
      draggable?.kill();
    };
  }, []);

  return (
    <>
      {/* Follower dots */}
      {[5, 4, 3].map((size, index) => (
        <div
          key={index}
          ref={(el) => (followerRefs.current[index] = el)}
          className={`fixed top-0 left-0 w-${size} h-${size} rounded-full pointer-events-none z-[9998]`}
          style={{
            background: `linear-gradient(to top right, rgb(240, 113, 181), rgb(139, 92, 246))`,
          }}
        />
      ))}

      {/* Draggable target cursor */}
      <div
        ref={targetRef}
        id="target"
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-tr from-pink-600 to-purple-600 mix-blend-difference shadow-xl z-[9999] pointer-events-none flex items-center justify-center text-white text-[10px] font-bold select-none"
      >
        DRAG
      </div>
    </>
  );
};

export default CustomCursor;
