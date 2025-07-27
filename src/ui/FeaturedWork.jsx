const FeaturedWork = () => {
  // Frontend Technologies
  const frontendTech = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Next.js",
    "chartjs",
    "Tailwind",
    "Bootstrap",
    "styled-components",
    "Vite",
  ];

  // Backend and Other Technologies
  const backendTech = [
    "Java",
    "C#",
    "Spring",
    "Spring Boot",
    "Docker",
    "Postman",
    "Jira",
    "GitHub",
    "Jenkins",
    "AWS",
  ];

  // Create duplicated arrays for seamless looping
  const topSlides = [...frontendTech, ...frontendTech, ...frontendTech];
  const bottomSlides = [...backendTech, ...backendTech, ...backendTech];

  return (
    <div className="py-8">
      <h2 className="text-base text-center mb-8 font-normal">
        Putting design & technology at the heart of business
      </h2>

      {/* Frontend Technologies */}
      <div className="relative w-full h-16 sm:h-20 md:h-24 overflow-hidden mb-4">
        {/* Animated dotted line */}
        <div className="absolute left-0 top-1/2 w-full h-px transform -translate-y-1/2 z-10">
          <div
            className="w-[200%] h-px bg-repeat-x animate-pulse"
            style={{
              backgroundImage:
                "linear-gradient(90deg, black 50%, transparent 50%)",
              backgroundSize: "40px 1px",
              animation: "slideRight 30s linear infinite",
            }}
          />
        </div>

        {/* Sliding container */}
        <div
          className="flex items-center h-full whitespace-nowrap"
          style={{
            animation: "slideLeft 30s linear infinite",
          }}
        >
          {topSlides.map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center px-6 sm:px-10 md:px-12 h-full text-lg sm:text-2xl md:text-3xl font-normal relative"
              style={{ minWidth: "auto" }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Backend Technologies */}
      <div className="relative w-full h-16 sm:h-20 md:h-24 overflow-hidden">
        <div className="absolute left-0 top-1/2 w-full h-px transform -translate-y-1/2 z-10">
          <div
            className="w-[200%] h-px bg-repeat-x"
            style={{
              backgroundImage:
                "linear-gradient(90deg, black 50%, transparent 50%)",
              backgroundSize: "40px 1px",
              animation: "slideLeft 60s linear infinite",
            }}
          />
        </div>

        <div
          className="flex items-center h-full whitespace-nowrap"
          style={{
            animation: "slideRight 30s linear infinite",
          }}
        >
          {bottomSlides.map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center px-6 sm:px-10 md:px-12 h-full text-lg sm:text-2xl md:text-3xl font-normal relative"
              style={{ minWidth: "auto" }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedWork;
