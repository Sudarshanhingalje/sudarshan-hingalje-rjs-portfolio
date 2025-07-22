// src/components/ProjectCard.jsx
import { AnimatePresence, motion } from "framer-motion";

const ProjectCard = ({ project, isActive, onClick, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer group
        transition-all duration-700 ease-out transform-gpu perspective-1000
        ${
          isActive
            ? "col-span-full lg:col-span-2 row-span-2 h-[700px] z-30 shadow-2xl shadow-purple-900/30"
            : "h-[400px] hover:scale-105 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-purple-900/20"
        }
      `}
      whileHover={
        !isActive
          ? {
              rotateY: 5,
              rotateX: 5,
              transition: { duration: 0.3 },
            }
          : {}
      }
    >
      {/* Background Image with Advanced Overlay */}
      <div className="absolute inset-0">
        <img
          src={project.img}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isActive
              ? "scale-110 blur-sm brightness-50"
              : "scale-100 group-hover:scale-110 brightness-75 group-hover:brightness-90"
          }`}
        />

        {/* Dynamic Gradient Overlay */}
        <div
          className={`
          absolute inset-0 bg-gradient-to-t transition-all duration-700
          ${project.color || "from-gray-900 via-gray-800 to-transparent"} 
          ${isActive ? "opacity-85" : "opacity-75 group-hover:opacity-80"}
        `}
        />

        {/* Mesh Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 mix-blend-overlay" />
      </div>

      {/* Floating Status & Category Badges */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
        {/* Category Badge */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="px-3 py-1.5 bg-black/40 backdrop-blur-lg rounded-full text-xs font-medium text-white border border-white/20 flex items-center gap-1.5"
        >
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          {project.category}
        </motion.span>

        {/* Status Badge */}
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="px-3 py-1.5 bg-green-500/20 backdrop-blur-lg rounded-full text-xs font-medium text-green-300 border border-green-400/30"
        >
          ● {project.status}
        </motion.span>
      </div>

      {/* Main Content Container */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
        {/* Title Section */}
        <div
          className={`transition-all duration-500 ${
            isActive ? "mb-6" : "mb-4"
          }`}
        >
          <motion.h3
            layout
            className={`font-bold text-white leading-tight transition-all duration-500 ${
              isActive
                ? "text-3xl lg:text-4xl mb-4"
                : "text-xl lg:text-2xl mb-3"
            }`}
          >
            {isActive ? project.title : project.shortTitle}
          </motion.h3>

          <motion.p
            layout
            className={`text-gray-100 leading-relaxed transition-all duration-500 ${
              isActive
                ? "text-base lg:text-lg mb-6"
                : "text-sm mb-4 line-clamp-2"
            }`}
          >
            {isActive ? project.detailedDescription : project.description}
          </motion.p>
        </div>

        {/* Technology Stack Icons */}
        <div
          className={`flex flex-wrap gap-3 transition-all duration-500 ${
            isActive ? "mb-6" : "mb-5"
          }`}
        >
          {project.techImages
            ?.slice(0, isActive ? project.techImages.length : 5)
            .map((icon, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.5 + idx * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                  transition: { duration: 0.2 },
                }}
                className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl p-2 flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 group"
              >
                <img
                  src={`/skill/${icon}`}
                  alt={icon?.replace(".svg", "")}
                  className="w-full h-full object-contain group-hover:brightness-125"
                  title={icon?.replace(".svg", "")}
                />
              </motion.div>
            ))}

          {!isActive && project.techImages?.length > 5 && (
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <span className="text-xs font-bold">
                +{project.techImages.length - 5}
              </span>
            </div>
          )}
        </div>

        {/* Key Features (Expanded State Only) */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mb-6"
            >
              <h4 className="text-sm font-semibold mb-3 text-yellow-300 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Key Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features?.map((feature, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium flex items-center gap-2 border border-white/10"
                  >
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    {feature}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div
          className={`flex gap-3 ${
            isActive ? "flex-row flex-wrap" : "flex-col sm:flex-row"
          }`}
        >
          {project.link && (
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/15 backdrop-blur-lg rounded-xl text-sm font-semibold hover:bg-white/25 transition-all duration-300 border border-white/20 hover:border-white/40 group"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </motion.a>
          )}

          {project.github && (
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-black/30 backdrop-blur-lg rounded-xl text-sm font-semibold hover:bg-black/50 transition-all duration-300 border border-gray-700 hover:border-gray-500 group"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              Source Code
            </motion.a>
          )}
        </div>

        {/* Expand/Collapse Indicator */}
        {!isActive && (
          <motion.div
            className="absolute bottom-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 border border-white/20"
            whileHover={{ rotate: 45, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-purple-600/10 rounded-2xl"></div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
