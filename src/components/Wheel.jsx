import { useEffect, useRef } from "react";

const SpinningWheel = () => {
  const wheelRef = useRef(null);

  useEffect(() => {
    const wheel = wheelRef.current;
    let angle = 0;

    const animate = () => {
      angle += 1; // Adjust speed here
      wheel.style.transform = `rotate(${angle}deg)`;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <svg
        ref={wheelRef}
        width="150"
        height="150"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#00ffcc"
          strokeWidth="2"
          fill="none"
        />

        {/* Spokes */}
        {[...Array()].map((_, i) => {
          const angle = (i * 360) / 8;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + 45 * Math.cos(rad);
          const y = 50 + 45 * Math.sin(rad);
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="#00ffcc"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default SpinningWheel;
