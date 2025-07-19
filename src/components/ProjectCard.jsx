// src/components/ProjectCard.jsx
const ProjectCard = ({ project, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative w-full bg-white rounded-xl overflow-hidden transition-all duration-500 ease-in-out cursor-pointer shadow-xl
        ${isActive ? "h-[460px]" : "h-[240px]"}`}
    >
      {/* Project Image */}
      <img
        src={project.img}
        alt={project.title}
        className={`absolute top-0 w-full object-cover transition-all duration-500 ease-in-out
          ${isActive ? "h-[200px]" : "h-full"}`}
      />

      {/* Project Info */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-4 transition-all duration-500 ease-in-out
          ${isActive ? "h-[260px]" : "h-24"}`}
      >
        <h1 className="uppercase text-sm font-bold leading-tight truncate">
          {project.title}
        </h1>

        {!isActive ? (
          <p className="mt-1 text-xs text-gray-300 line-clamp-2">
            {project.description}
          </p>
        ) : (
          <>
            <p className="mt-4 text-sm">{project.description}</p>

            {/* Tech Stack */}
            {project.techImages && (
              <div className="flex flex-wrap gap-2 mt-3">
                {project.techImages.map((icon, idx) => (
                  <img
                    key={idx}
                    src={`/skill/${icon}`}
                    alt={icon.replace(".svg", "")}
                    className="w-5 h-5"
                    title={icon.replace(".svg", "")}
                  />
                ))}
              </div>
            )}

            {/* Links */}
            <div className="mt-3 flex gap-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-blue-300 underline"
                >
                  🔗 Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-green-300 underline"
                >
                  💻 GitHub
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
