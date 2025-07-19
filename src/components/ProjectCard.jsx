// src/components/ProjectCard.jsx
import { motion } from "framer-motion";

const ProjectCard = ({ project, isActive, onClick }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={`relative flex-shrink-0 bg-white rounded-xl overflow-hidden transition-all duration-500 ease-in-out cursor-pointer
        ${isActive ? "w-full h-[340px] m-0" : "w-[170px] h-[220px] mx-2"}
        shadow-xl`}
    >
      <img
        src={project.img}
        alt={project.title}
        className={`absolute bottom-0 w-full object-cover transition-all duration-500 ease-in-out
          ${isActive ? "h-1/2" : "h-full"}`}
      />
      <div
        className={`absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-4 transition-all duration-500 ease-in-out ${
          isActive ? "pb-24" : "pb-4"
        }`}
      >
        <h1 className="uppercase text-sm font-bold leading-tight">
          {project.title}
        </h1>

        {!isActive ? (
          <p className="mt-1 text-xs text-gray-300">{project.description}</p>
        ) : (
          <>
            <p className="mt-4 text-sm">{project.description}</p>

            {/* ✅ Tech stack icons */}
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

            {/* ✅ Project links */}
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
    </motion.li>
  );
};

export default ProjectCard;
