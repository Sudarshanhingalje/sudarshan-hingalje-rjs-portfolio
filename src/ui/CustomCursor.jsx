// CustomCursor.jsx
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(Draggable, InertiaPlugin);

const CustomCursor = () => {
  const targetRef = useRef(null);
  const followerRefs = useRef([]);

  useEffect(() => {
    // Init follower animation logic
    function follower(target, duration) {
      let xTo = gsap.quickTo(target, "x", { duration, ease: "back" }),
        yTo = gsap.quickTo(target, "y", { duration, ease: "back" });
      return (x, y) => {
        xTo(x);
        yTo(y);
      };
    }

    // Get references in reverse order for trail
    const followers = followerRefs.current
      .slice()
      .reverse()
      .map((el, i) => follower(el, 0.25 + i * 0.1));

    // Create draggable cursor
    Draggable.create(targetRef.current, {
      bounds: window,
      inertia: true,
      onDrag: updateFollowers,
      onThrowUpdate: updateFollowers,
    });

    function updateFollowers() {
      const { x, y } = targetRef.current._gsap;
      followers.forEach((f) => f(x, y));
    }

    // Hide default cursor
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Follower dots */}
      <div
        ref={(el) => (followerRefs.current[2] = el)}
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-gradient-to-tr from-pink-300 to-purple-300 pointer-events-none z-[9998]"
      ></div>
      <div
        ref={(el) => (followerRefs.current[1] = el)}
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 pointer-events-none z-[9998]"
      ></div>
      <div
        ref={(el) => (followerRefs.current[0] = el)}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 pointer-events-none z-[9998]"
      ></div>

      {/* Main draggable cursor */}
      <div
        ref={targetRef}
        id="target"
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-tr from-pink-600 to-purple-600 mix-blend-difference shadow-xl z-[9999] pointer-events-none flex items-center justify-center text-white text-xs font-bold select-none"
      >
        DRAG
      </div>
    </>
  );
};

export default CustomCursor;
