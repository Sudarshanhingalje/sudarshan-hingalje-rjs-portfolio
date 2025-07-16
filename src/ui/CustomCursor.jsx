import { useEffect } from "react";

const SplashCursor = () => {
  useEffect(() => {
    // Create custom cursor element
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    cursor.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="8" stroke="#00ffcc" stroke-width="2" fill="none" />
        <circle cx="20" cy="20" r="16" stroke="#00ffcc33" stroke-width="1" fill="none" />
      </svg>
    `;
    Object.assign(cursor.style, {
      position: "fixed",
      top: "0px",
      left: "0px",
      pointerEvents: "none",
      zIndex: "9999",
      transform: "translate(-50%, -50%)",
      transition: "transform 0.05s ease-out",
    });

    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      cursor.remove();
    };
  }, []);

  return null;
};

export default SplashCursor;
