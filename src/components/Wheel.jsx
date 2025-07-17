import { useEffect } from "react";
import wheelImg from "../assets/wheel.png"; // make sure this path is correct

const SplashCursor = () => {
  useEffect(() => {
    const cursor = document.createElement("img");
    cursor.src = wheelImg;
    cursor.id = "custom-cursor";
    cursor.style.position = "fixed";
    cursor.style.width = "40px";
    cursor.style.height = "40px";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "9999";
    cursor.style.transition = "transform 0.1s ease-out, opacity 0.2s ease";
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX - 20}px`; // center the cursor
      cursor.style.top = `${e.clientY - 20}px`;

      // Splash effect: quickly scale up then back down
      cursor.style.transform = "scale(1.5)";
      cursor.style.opacity = "0.7";
      setTimeout(() => {
        cursor.style.transform = "scale(1)";
        cursor.style.opacity = "1";
      }, 100);
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
