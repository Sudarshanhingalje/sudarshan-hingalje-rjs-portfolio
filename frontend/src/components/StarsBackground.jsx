// src/components/StarsBackground.jsx
import { useEffect, useState } from "react";

const StarsBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 500 }).map(() => ({
      id: crypto.randomUUID(),
      size:
        Math.random() < 0.1 ? Math.random() * 5 + 5 : Math.random() * 2 + 0.5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      color: ["#ffffff", "#a5f3fc", "#c084fc", "#facc15", "#38bdf8"][
        Math.floor(Math.random() * 5)
      ],
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
      fallDuration: Math.random() * 40 + 30,
    }));
    setStars(generatedStars);

    const container = document.getElementById("stars-container");
    const createShootingStar = () => {
      const star = document.createElement("div");
      star.className = "shooting-star";
      star.style.top = `${Math.random() * 70}%`;
      star.style.left = `${100 + Math.random() * 20}%`;
      container.appendChild(star);
      setTimeout(() => container.removeChild(star), 2000);
    };

    const interval = setInterval(createShootingStar, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="stars-container"
      className="fixed inset-0 -z-10 overflow-hidden bg-black"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite, starFall ${star.fallDuration}s linear infinite`,
            animationDelay: `${star.delay}s`,
            position: "absolute",
            borderRadius: "9999px",
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;
