// src/components/JelloText.jsx
import gsap from "gsap";
import lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import animationData from "../assets/animation.json"; // your Lottie file
import "../styles/index.css";

const JelloText = () => {
  const txtRef = useRef(null);
  const lottieRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [charHeight, setCharHeight] = useState(0);
  const charRefs = useRef([]);
  const initY = useRef(0);
  const finalY = useRef(0);
  const weightInit = 600;
  const weightTarget = 400;
  const stretchInit = 150;
  const stretchTarget = 80;
  const weightDiff = weightInit - weightTarget;
  const stretchDiff = stretchInit - stretchTarget;
  const maxYScale = 2.5;
  const elasticDropOff = 0.8;

  useEffect(() => {
    // Lottie animation
    lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    // Split text
    const split = new SplitType(txtRef.current, {
      types: "chars",
      tagName: "span",
    });

    charRefs.current = split.chars;

    gsap.set(charRefs.current, { transformOrigin: "center bottom" });

    const rect = txtRef.current.getBoundingClientRect();
    setCharHeight(txtRef.current.offsetHeight);

    gsap.from(charRefs.current, {
      y: -1 * (rect.y + rect.height + 500),
      fontWeight: weightTarget,
      fontStretch: stretchTarget,
      scaleY: 2,
      ease: "elastic(0.2, 0.1)",
      duration: 1.5,
      delay: 0.5,
      stagger: { each: 0.05, from: "random" },
    });

    const onMouseMove = (e) => {
      if (!isDragging) return;
      finalY.current = e.clientY;
      updateText();
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      resetText();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  const updateText = () => {
    const distY = initY.current - finalY.current;
    const maxYDragDist = charHeight * (maxYScale - 1);
    let dragYScale = distY / maxYDragDist;
    dragYScale = Math.max(Math.min(dragYScale, maxYScale - 1), -0.5);

    gsap.to(charRefs.current, {
      y: (_, __, i) => {
        const dispersion =
          1 -
          Math.abs(i - selectedCharIndex) /
            (charRefs.current.length * elasticDropOff);
        return dispersion * dragYScale * -50;
      },
      fontWeight: (_, __, i) => {
        const dispersion =
          1 -
          Math.abs(i - selectedCharIndex) /
            (charRefs.current.length * elasticDropOff);
        return weightInit - dispersion * dragYScale * weightDiff;
      },
      fontStretch: (_, __, i) => {
        const dispersion =
          1 -
          Math.abs(i - selectedCharIndex) /
            (charRefs.current.length * elasticDropOff);
        return stretchInit - dispersion * dragYScale * stretchDiff;
      },
      scaleY: (_, __, i) => {
        const dispersion =
          1 -
          Math.abs(i - selectedCharIndex) /
            (charRefs.current.length * elasticDropOff);
        return Math.max(1 + dispersion * dragYScale, 0.5);
      },
      ease: "power4",
      duration: 2,
    });
  };

  const resetText = () => {
    gsap.to(charRefs.current, {
      y: 0,
      fontWeight: weightInit,
      fontStretch: stretchInit,
      scaleY: 1,
      ease: "elastic(0.35, 0.1)",
      duration: 1,
      stagger: { each: 0.02, from: selectedCharIndex },
    });
  };

  const handleMouseDown = (index, e) => {
    initY.current = e.clientY;
    setSelectedCharIndex(index);
    setIsDragging(true);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden font-jello">
      {/* Lottie Background */}
      <div ref={lottieRef} className="absolute inset-0 w-full h-full z-0"></div>

      {/* Jello Text */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <h1
          ref={txtRef}
          className="text-[5vw] font-[200] tracking-[-1vw] leading-[0.6] text-white select-none shadow-jello"
        >
          {"sudarshan PORTFOLIO".split("").map((char, i) => (
            <span
              key={i}
              className={`inline-block cursor-pointer pt-[1.08vw] ${
                char === " " ? "w-[1vw]" : ""
              }`}
              onMouseDown={(e) => handleMouseDown(i, e)}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default JelloText;
