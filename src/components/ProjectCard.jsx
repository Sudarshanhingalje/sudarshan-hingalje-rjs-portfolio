// src/components/ProjectCard.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

const EXPANDED_HEIGHT = "h-[520px]";
const COLLAPSED_HEIGHT = "h-[240px]";
const IMAGE_EXPANDED = "h-[220px]";
const IMAGE_COLLAPSED = "h-full";
const INFO_EXPANDED_HEIGHT = "h-[300px]";
const INFO_COLLAPSED_HEIGHT = "h-24";

const ProjectCard = ({ project, isActive, onClick }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isActive && contentRef.current) {
      contentRef.current.scrollTop = 0; // Scroll to top on expand
    }
  }, [isActive]);

  return (
    <motion.div
      onClick={onClick}
      layout
      transition={{ layout: { duration: 0.4, type: "spring" } }}
      className={`relative w-full rounded-xl overflow-hidden shadow-xl cursor-pointer bg-white
        ${isActive ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT}
        transition-all duration-500 ease-in-out`}
    >
      {/* Project Image */}
      <motion.img
        layout
        src={project.img}
        alt={project.title}
        className={`absolute top-0 w-full object-cover z-0 transition-all duration-500
          ${isActive ? IMAGE_EXPANDED : IMAGE_COLLAPSED}`}
      />

      {/* Info Section */}
      <motion.div
        layout
        className={`absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-4 z-10
          ${
            isActive ? INFO_EXPANDED_HEIGHT : INFO_COLLAPSED_HEIGHT
          } overflow-hidden`}
      >
        <h1 className="uppercase text-sm font-bold leading-tight truncate">
          {project.title}
        </h1>

        <AnimatePresence>
          {isActive ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-2"
              ref={contentRef}
            >
              <p className="text-sm mt-2">{project.description}</p>

              {/* Tech Icons */}
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
