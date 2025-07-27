import { useEffect, useState } from "react";
import techPlanets from "../data/techPlanets";
import FeaturedWork from "../ui/FeaturedWork";

const getScreenSize = () => {
  const width = window.innerWidth;
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

const containerSizes = {
  mobile: 320,
  tablet: 480,
  desktop: 600,
};

const orbitRadii = {
  mobile: [40, 60, 80, 100, 120, 140],
  tablet: [60, 90, 120, 150, 180, 210],
  desktop: [80, 120, 160, 200, 240, 280],
};

const Skills = () => {
  const [paused, setPaused] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🌀 Inject orbit keyframes dynamically
  useEffect(() => {
    const style = document.createElement("style");
    style.type = "text/css";
    const keyframes = techPlanets
      .filter((p) => p.orbit && typeof p.orbit === "object")
      .map(
        (p) => `
        @keyframes orbit-${p.id} {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `
      )
      .join("\n");
    style.innerHTML = keyframes;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const Planet = ({ planet }) => {
    const size = planet.size[screenSize];
    const orbit = planet.orbit?.[screenSize] || 0;
    const isCenter = orbit === 0;

    if (isCenter) {
      return (
        <div
          className="absolute rounded-full shadow-xl ring-4 ring-orange-400/40 animate-pulse flex items-center justify-center sun-core z-20"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: planet.color,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: `
              0 0 40px ${planet.color},
              0 0 60px ${planet.color}AA,
              0 0 100px ${planet.color}66
            `,
          }}
        >
          <img
            src={planet.image}
            alt={planet.name}
            className="w-2/3 h-2/3 object-contain"
          />
          <div
            className="absolute rounded-full glow-ring z-[-1]"
            style={{
              width: `${size * 3}px`,
              height: `${size * 3}px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: `0 0 80px 40px ${planet.color}33`,
            }}
          />
        </div>
      );
    }

    return (
      <div
        className="absolute"
        style={{
          width: `${orbit * 2}px`,
          height: `${orbit * 2}px`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: paused
            ? "none"
            : `orbit-${planet.id} ${planet.speed}s linear infinite`,
        }}
      >
        <div
          className="absolute rounded-full shadow-md"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: planet.color,
            border: `2px solid ${planet.color}`,
            top: 0,
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${planet.offset}deg)`,
          }}
        >
          <img
            src={planet.image}
            alt={planet.name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  };

  const OrbitRing = ({ radius, color = "#2d04fa8b" }) => (
    <div
      className="absolute rounded-full border border-dashed border-white/20"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        borderColor: color,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );

  const PlanetLabel = ({ planet }) => {
    const orbit = planet.orbit?.[screenSize] || 0;
    if (!showLabels || orbit === 0) return null;

    return (
      <div
        className="absolute"
        style={{
          width: `${orbit * 2}px`,
          height: `${orbit * 2}px`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: paused
            ? "none"
            : `orbit-${planet.id} ${planet.speed}s linear infinite`,
        }}
      >
        <div
          className="absolute text-xs sm:text-sm text-white bg-black/70 px-2 py-1 rounded"
          style={{
            top: `-30px`,
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${planet.offset || 0}deg)`,
            whiteSpace: "nowrap",
          }}
        >
          {planet.name}
        </div>
      </div>
    );
  };

  // Responsive container size and orbit radii
  const containerSize = containerSizes[screenSize];
  const radii = orbitRadii[screenSize];

  return (
    <div
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-4"
    >
      <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 text-center">
        My Tech Solar System
      </h1>

      <FeaturedWork />

      <div
        className="relative my-6 mx-auto"
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          maxWidth: "100vw",
          maxHeight: "80vw",
        }}
      >
        {radii.map((r) => (
          <OrbitRing key={r} radius={r} />
        ))}

        {techPlanets.map((planet) => (
          <div key={planet.id}>
            <Planet planet={planet} />
            <PlanetLabel planet={planet} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => setShowLabels(!showLabels)}
          className={`px-4 py-2 rounded transition ${
            showLabels ? "bg-blue-600" : "bg-gray-600"
          } text-white`}
        >
          {showLabels ? "🏷️ Hide Labels" : "🏷️ Show Labels"}
        </button>
      </div>
    </div>
  );
};

export default Skills;
