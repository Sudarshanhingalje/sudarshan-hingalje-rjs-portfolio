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
  mobile: 280,
  tablet: 480,
  desktop: 600,
};

const orbitRadii = {
  mobile: [35, 55, 75, 95, 115, 135],
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
        @keyframes counter-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
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
          className="absolute"
          style={{
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div
            className="text-xs text-white bg-black/70 px-2 py-1 rounded shadow-md"
            style={{
              animation: paused
                ? "none"
                : `counter-rotate ${planet.speed}s linear infinite`,
              transformOrigin: "center",
              whiteSpace: "nowrap",
            }}
          >
            {planet.name}
          </div>
        </div>
      </div>
    );
  };

  const containerSize = containerSizes[screenSize];
  const radii = orbitRadii[screenSize];

  return (
    <div
      id="skills"
      className="flex flex-col items-center justify-center px-4 py-8 sm:py-12"
    >
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text mb-4 sm:mb-6 text-center tracking-tight hover:scale-105 transition-transform duration-300">
        My Tech Solar System
      </h1>

      <FeaturedWork />

      <div
        className="relative mx-auto my-4 sm:my-6"
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          maxWidth: "90vw",
          maxHeight: "90vw",
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

      <div className="mt-4 sm:mt-6 flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => setShowLabels(!showLabels)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 border-2 text-sm sm:text-base ${
            showLabels
              ? "bg-gradient-to-r from-blue-600 to-purple-600 border-blue-700 hover:from-blue-700 hover:to-purple-700"
              : "bg-gradient-to-r from-gray-600 to-gray-800 border-gray-700 hover:from-gray-700 hover:to-gray-900"
          } text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
          <span className="text-sm sm:text-lg">{showLabels ? "🏷️" : "🚫"}</span>
          <span>{showLabels ? "Hide Labels" : "Show Labels"}</span>
        </button>
      </div>
    </div>
  );
};

export default Skills;
