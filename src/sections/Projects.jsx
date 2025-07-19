// src/pages/Projects.jsx
import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { projectsDone } from "../data/projects/ProjectDone";

const Projects = () => {
  const [active, setActive] = useState(null);
  const activeProject = active !== null ? projectsDone[active] : null;

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: activeProject ? `url(${activeProject.img})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background 0.5s ease-in-out",
      }}
    >
      <div className="relative z-10 w-full max-w-7xl bg-opacity-70 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-8 uppercase">
          Projects
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsDone.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              isActive={active === i}
              onClick={() => setActive(active === i ? null : i)}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-black opacity-30 pointer-events-none" />
    </section>
  );
};

export default Projects;
