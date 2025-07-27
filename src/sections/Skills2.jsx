import { useState } from "react";
import FeaturedWork from "../ui/FeaturedWork";

const Skills = () => {
  const [paused, setPaused] = useState(false);
  const [showLabels, setShowLabels] = useState(true);

  const techPlanets = [
    // Core (You - Full Stack Developer)
    {
      id: "developer",
      name: "Full Stack Dev",
      orbit: 0,
      size: { mobile: 30, tablet: 40, desktop: 50 },
      color: "#FFD700",
      image: "/skill/developer.svg",
    },

    // Frontend Layer - each with different speeds
    {
      id: "HTML",
      name: "HTML",
      orbit: { mobile: 60, tablet: 80, desktop: 100 },
      size: { mobile: 18, tablet: 25, desktop: 28 },
      color: "#ff2f00",
      image: "/skill/html.svg",
      speed: 8,
      offset: 0,
    },
    {
      id: "react",
      name: "React",
      orbit: { mobile: 60, tablet: 80, desktop: 100 },
      size: { mobile: 18, tablet: 25, desktop: 28 },
      color: "#61DAFB",
      image: "/skill/reactjs.svg",
      speed: 8,
      offset: 0,
    },
    {
      id: "nextjs",
      name: "Next.js",
      orbit: { mobile: 60, tablet: 80, desktop: 100 },
      size: { mobile: 16, tablet: 20, desktop: 24 },
      color: "#000000",
      image: "/skill/nextjs.svg",
      speed: 10,
      offset: 120,
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      orbit: { mobile: 60, tablet: 80, desktop: 100 },
      size: { mobile: 14, tablet: 18, desktop: 22 },
      color: "#06B6D4",
      image: "/skill/tailwind.svg",
      speed: 12,
      offset: 240,
    },
    {
      id: "javascript",
      name: "JavaScript",
      orbit: { mobile: 60, tablet: 80, desktop: 100 },
      size: { mobile: 14, tablet: 16, desktop: 20 },
      color: "#F7DF1E",
      image: "/skill/javascript.svg",
      speed: 14,
      offset: 300,
    },

    // Backend Layer - each with different speeds
    {
      id: "nodejs",
      name: "Node.js",
      orbit: { mobile: 90, tablet: 140, desktop: 160 },
      size: { mobile: 16, tablet: 22, desktop: 26 },
      color: "#339933",
      image: "/skill/nodejs.svg",
      speed: 15,
      offset: 0,
    },
    {
      id: "express",
      name: "Express.js",
      orbit: { mobile: 90, tablet: 140, desktop: 160 },
      size: { mobile: 14, tablet: 18, desktop: 22 },
      color: "#000000",
      image: "/skill/expressjs.svg",
      speed: 18,
      offset: 90,
    },
    {
      id: "mongodb",
      name: "MongoDB",
      orbit: { mobile: 90, tablet: 140, desktop: 160 },
      size: { mobile: 15, tablet: 20, desktop: 24 },
      color: "#47A248",
      image: "/skill/mongodb.svg",
      speed: 20,
      offset: 180,
    },
    {
      id: "supabase",
      name: "supabase",
      orbit: { mobile: 90, tablet: 140, desktop: 160 },
      size: { mobile: 15, tablet: 20, desktop: 24 },
      color: "#336791",
      image: "/skill/supabase.svg",
      speed: 22,
      offset: 270,
    },

    // Cloud & DevOps Layer - each with different speeds
    {
      id: "aws",
      name: "AWS",
      orbit: { mobile: 120, tablet: 200, desktop: 220 },
      size: { mobile: 16, tablet: 24, desktop: 28 },
      color: "#FF9900",
      image: "/skill/aws.svg",
      speed: 25,
      offset: 0,
    },
    {
      id: "docker",
      name: "Docker",
      orbit: { mobile: 120, tablet: 200, desktop: 220 },
      size: { mobile: 14, tablet: 20, desktop: 24 },
      color: "#2496ED",
      image: "/skill/docker.svg",
      speed: 28,
      offset: 72,
    },

    // {
    //   id: "terraform",
    //   name: "Terraform",
    //   orbit: { mobile: 120, tablet: 200, desktop: 220 },
    //   size: { mobile: 13, tablet: 18, desktop: 22 },
    //   color: "#7B42BC",
    //   image: "/skill/terraform.svg",
    //   speed: 32,
    //   offset: 216,
    // },
    {
      id: "jenkins",
      name: "Jenkins",
      orbit: { mobile: 120, tablet: 200, desktop: 220 },
      size: { mobile: 13, tablet: 18, desktop: 22 },
      color: "#D33833",
      image: "/skill/jenkins.svg",
      speed: 35,
      offset: 288,
    },

    // Tools & Version Control Layer - each with different speeds
    {
      id: "git",
      name: "Git",
      orbit: { mobile: 150, tablet: 260, desktop: 280 },
      size: { mobile: 14, tablet: 20, desktop: 24 },
      color: "#F05032",
      image: "/skill/git.svg",
      speed: 38,
      offset: 0,
    },
    {
      id: "github",
      name: "GitHub",
      orbit: { mobile: 150, tablet: 260, desktop: 280 },
      size: { mobile: 14, tablet: 20, desktop: 24 },
      color: "#181717",
      image: "/skill/github.svg",
      speed: 40,
      offset: 60,
    },
    {
      id: "vscode",
      name: "VS Code",
      orbit: { mobile: 150, tablet: 260, desktop: 280 },
      size: { mobile: 13, tablet: 18, desktop: 22 },
      color: "#007ACC",
      image: "/skill/vscode.svg",
      speed: 42,
      offset: 120,
    },
    {
      id: "postman",
      name: "Postman",
      orbit: { mobile: 150, tablet: 260, desktop: 280 },
      size: { mobile: 12, tablet: 16, desktop: 20 },
      color: "#FF6C37",
      image: "/skill/postman.svg",
      speed: 45,
      offset: 180,
    },
    {
      id: "figma",
      name: "Figma",
      orbit: { mobile: 150, tablet: 260, desktop: 280 },
      size: { mobile: 12, tablet: 16, desktop: 20 },
      color: "#F24E1E",
      image: "/skill/figma.svg",
      speed: 47,
      offset: 240,
    },
    {
      id: "slack",
      name: "Slack",
      orbit: { mobile: 150, tablet: 260, desktop: 280 },
      size: { mobile: 12, tablet: 16, desktop: 20 },
      color: "#4A154B",
      image: "/skill/slack.svg",
      speed: 50,
      offset: 300,
    },
  ];

  // Responsive helper functions
  const getResponsiveValue = (values) => {
    if (typeof values === "number") return values;
    return `${values.mobile} md:${values.tablet} lg:${values.desktop}`;
  };

  const getResponsiveOrbit = (orbit) => {
    if (typeof orbit === "number") return orbit;
    return orbit.desktop; // Use desktop value for calculations
  };

  const getResponsiveSize = (size) => {
    if (typeof size === "number") return size;
    return size.desktop; // Use desktop value for calculations
  };

  const Planet = ({ planet }) => {
    const isCenter = planet.orbit === 0;
    const orbitValue = getResponsiveOrbit(planet.orbit);
    const sizeValue = getResponsiveSize(planet.size);

    if (isCenter) {
      return (
        <div
          className="absolute rounded-full flex items-center justify-center shadow-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-300 dark:to-yellow-500"
          style={{
            width: `${sizeValue}px`,
            height: `${sizeValue}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 30px ${planet.color}80, 0 0 60px ${planet.color}40`,
            zIndex: 10,
          }}
        >
          <img
            src={planet.image}
            alt={planet.name}
            className="transition-all duration-300 hover:scale-110"
            style={{
              width: `${sizeValue * 0.7}px`,
              height: `${sizeValue * 0.7}px`,
            }}
          />
        </div>
      );
    }

    return (
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: `${orbitValue * 2}px`,
          height: `${orbitValue * 2}px`,
          transform: "translate(-50%, -50%)",
          animation: paused
            ? "none"
            : `orbit-${planet.id} ${planet.speed}s linear infinite`,
          zIndex: 5,
        }}
      >
        <div
          className="absolute rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer bg-white/10 dark:bg-white/5 backdrop-blur-sm"
          style={{
            width: `${sizeValue}px`,
            height: `${sizeValue}px`,
            border: `2px solid ${planet.color}`,
            left: "50%",
            top: "0",
            transform: `translate(-50%, -50%) rotate(${planet.offset || 0}deg)`,
            boxShadow: `0 0 15px ${planet.color}40, inset 0 0 15px ${planet.color}20`,
          }}
        >
          <img
            src={planet.image}
            alt={planet.name}
            className="transition-transform duration-300 group-hover:rotate-12"
            style={{
              width: `${sizeValue * 0.6}px`,
              height: `${sizeValue * 0.6}px`,
            }}
          />
        </div>
      </div>
    );
  };

  const OrbitRing = ({ radius }) => (
    <div
      className="absolute rounded-full border border-white/20 dark:border-white/10"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );

  const PlanetLabel = ({ planet }) => {
    if (!showLabels || planet.orbit === 0) return null;

    const orbitValue = getResponsiveOrbit(planet.orbit);

    return (
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: `${orbitValue * 2}px`,
          height: `${orbitValue * 2}px`,
          transform: "translate(-50%, -50%)",
          animation: paused
            ? "none"
            : `orbit-${planet.id} ${planet.speed}s linear infinite`,
          zIndex: 8,
        }}
      >
        <div
          className="absolute text-xs font-semibold px-2 py-1 rounded-md pointer-events-none bg-black/70 text-white dark:bg-white/10 dark:text-white backdrop-blur-sm border border-white/20"
          style={{
            left: "50%",
            top: `-35px`,
            transform: `translate(-50%, -50%) rotate(${planet.offset || 0}deg)`,
          }}
        >
          {planet.name}
        </div>
      </div>
    );
  };

  // Get unique orbit values for rings
  const uniqueOrbits = [
    ...new Set(
      techPlanets
        .filter((p) => p.orbit !== 0)
        .map((p) => getResponsiveOrbit(p.orbit))
    ),
  ].sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-2 sm:p-4 lg:p-8">
      {/* Dynamic CSS Animations */}
      <style jsx>{`
        ${techPlanets
          .filter((p) => p.orbit !== 0)
          .map(
            (planet) => `
          @keyframes orbit-${planet.id} {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `
          )
          .join("")}
      `}</style>

      {/* Header */}
      <div className="text-center mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
          My Tech Solar System
        </h1>
      </div>
      <FeaturedWork />
      {/* Solar System Container */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: "min(90vw, 90vh, 600px)",
          height: "min(90vw, 90vh, 600px)",
          aspectRatio: "1/1",
        }}
      >
        {/* Orbit Rings */}
        {uniqueOrbits.map((radius) => (
          <OrbitRing key={radius} radius={radius} />
        ))}

        {/* Planets */}
        {techPlanets.map((planet) => (
          <div key={planet.id}>
            <Planet planet={planet} />
            <PlanetLabel planet={planet} />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-4 sm:mt-6 lg:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={() => setShowLabels(!showLabels)}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
            showLabels
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-600 hover:bg-gray-700 text-white"
          } shadow-lg hover:shadow-xl hover:scale-105 active:scale-95`}
        >
          {showLabels ? "🏷️ Hide Labels" : "🏷️ Show Labels"}
        </button>
      </div>
    </div>
  );
};

export default Skills;
