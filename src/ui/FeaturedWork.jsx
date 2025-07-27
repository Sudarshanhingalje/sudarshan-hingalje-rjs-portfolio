const FeaturedWork = () => {
  // Frontend Technologies
  const frontendTech = ["React", "HTML5", "CSS3", "JavaScript", "Next.js"];

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
      <div className="relative w-full h-20 overflow-hidden mb-4">
        {/* Animated dotted line */}
        <div className="absolute left-0 top-1/2 w-full h-px transform -translate-y-1/2 z-10">
          <div
            className="w-[200%] h-px bg-repeat-x animate-pulse"
            style={{
              backgroundImage:
                "linear-gradient(90deg, black 50%, transparent 50%)",
              backgroundSize: "40px 1px",
              animation: "slideRight 60s linear infinite",
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
              className="flex-shrink-0 flex items-center justify-center px-12 h-full text-3xl font-normal relative"
              style={{ minWidth: "auto" }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full h-20 overflow-hidden">
        <div className="absolute  left-0 top-1/2 w-full h-px transform -translate-y-1/2 z-10">
          <div
            className="w-[200%] h-px bg-repeat-x"
            style={{
              backgroundImage:
                "linear-gradient(90deg, black 50%, transparent 50%) dark:linear-gradient(90deg, white 50%, transparent 50%)",
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
              className="flex-shrink-0 flex items-center justify-center px-12 h-full text-3xl font-normal relative"
              style={{ minWidth: "auto" }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes slideRight {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedWork;
