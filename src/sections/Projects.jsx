import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { projectsDone } from "../data/projects/ProjectDone";

const Projects = () => {
  const [active, setActive] = useState(null);

  const activeProject = active !== null ? projectsDone[active] : null;

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: activeProject ? `url(${activeProject.img})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background 0.5s ease-in-out",
      }}
    >
      <div className="relative z-10 w-full max-w-7xl px-4 py-10 bg-black bg-opacity-70 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-8 uppercase">
          Projects
        </h2>

        <ul className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {projectsDone.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              isActive={active === i}
              onClick={() => setActive(active === i ? null : i)}
            />
          ))}
        </ul>
      </div>

      <div className="absolute inset-0 bg-black opacity-30"></div>
    </section>
  );
};

export default Projects;
