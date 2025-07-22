import { useEffect } from "react";

const StarsBackground = () => {
  useEffect(() => {
    const container = document.getElementById("stars-container");

    const createShootingStar = () => {
      const star = document.createElement("div");
      star.classList.add("shooting-star");
      star.style.top = `${Math.random() * 80}%`;
      star.style.left = `${100 + Math.random() * 20}%`;

      container.appendChild(star);
      setTimeout(() => container.removeChild(star), 2000);
    };

    const interval = setInterval(createShootingStar, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="stars-container"
      className="fixed inset-0 overflow-hidden -z-10 dark:block hidden starfield"
    >
      {/* Nebula Glow */}
      <div className="absolute inset-0 z-[-2] bg-[radial-gradient(circle_at_40%_20%,_#a855f7_10%,_transparent_60%)] opacity-30 blur-3xl" />
      <div className="absolute inset-0 z-[-3] bg-[radial-gradient(circle_at_60%_70%,_#0ea5e9_15%,_transparent_70%)] opacity-20 blur-2xl" />

      {/* Galaxy Parallax Layers */}
      <div className="absolute inset-0 bg-[url('/assets/galaxy1.png')] bg-cover bg-no-repeat z-[-4] animate-parallaxSlow" />
      <div className="absolute inset-0 bg-[url('/assets/galaxy2.png')] bg-cover bg-no-repeat z-[-5] animate-parallaxFast" />

      {/* Random Moving Stars */}
      {[...Array(300)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full star"
          style={{
            width: `${Math.random() * 2 + 0.5}px`,
            height: `${Math.random() * 2 + 0.5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.2,
            animationDuration: `${Math.random() * 30 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default StarsBackground;
