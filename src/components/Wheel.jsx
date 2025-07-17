import { useEffect } from "react";
import "./SplashCursor.css";

const SplashCursor = () => {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "splash-cursor";
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
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
