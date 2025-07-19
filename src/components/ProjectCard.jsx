// ProjectCard.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "The Wild Oasis",
    description: "A full-stack hotel management and booking system.",
    technologies: ["Next.js", "Supabase", "Tailwind", "Framer Motion"],
  },
  {
    id: 2,
    title: "Scrap Savvy",
    description: "Waste management and recycling app with real-time updates.",
    technologies: ["React", "Spring Boot", "MongoDB"],
  },
  {
    id: 3,
    title: "Online Vegetable Store",
    description: "E-commerce platform for farmers to sell produce.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
  },
  // Add more projects if needed
];

export default function ProjectCard() {
  const [activeId, setActiveId] = useState(null);

  const toggleCard = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {projects.map((project) => {
        const isActive = activeId === project.id;
        return (
          <motion.div
            key={project.id}
            layout
            onClick={() => toggleCard(project.id)}
            className={`bg-zinc-900 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              isActive ? "col-span-1 md:col-span-2" : ""
            }`}
          >
            <motion.div layout className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm">
                {isActive ? project.description : "Click to expand"}
              </p>
            </motion.div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <p className="text-sm text-zinc-300 mb-2">
                    <strong>Tech Stack:</strong>{" "}
                    {project.technologies.join(", ")}
                  </p>
                  <div className="text-xs text-zinc-400">
                    Click again to collapse
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
