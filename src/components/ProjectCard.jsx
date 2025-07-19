// src/components/ProjectCard.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

const ProjectCard = ({ project, isActive, onClick }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isActive && contentRef.current) {
      contentRef.current.scrollTop = 0; // scroll to top when opening
    }
  }, [isActive]);

  return (
    <motion.div
      onClick={onClick}
      layout
      transition={{ layout: { duration: 0.4, type: "spring" } }}
      className={`relative w-full bg-white rounded-xl overflow-hidden shadow-xl cursor-pointer
        ${
          isActive ? "md:h-[480px] h-[500px]" : "md:h-[250px] h-[240px]"
        } transition-all duration-500`}
    >
      {/* Image */}
      <motion.img
        layout
        src={project.img}
        alt={project.title}
        className={`absolute top-0 w-full object-cover transition-all duration-500
          ${isActive ? "h-[200px]" : "h-full"}`}
      />

      {/* Content */}
      <motion.div
        layout
        className={`absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-4
          ${isActive ? "h-[280px]" : "h-24"} overflow-hidden`}
      >
        <h1 className="uppercase text-sm font-bold leading-tight truncate">
          {project.title}
        </h1>

        <AnimatePresence>
          {isActive ? (
            <motion.div
              key="expanded"
              className="mt-2 overflow-y-auto max-h-[220px] pr-1"
              ref={contentRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-sm mt-2">{project.description}</p>

              {/* Tech Stack Icons */}
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
              <div className="mt-3 flex flex-wrap gap-4 text-xs">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline"
                  >
                    🔗 Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-300 underline"
                  >
                    💻 GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ) : (
            <p className="mt-1 text-xs text-gray-300 line-clamp-2">
              {project.description}
            </p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
