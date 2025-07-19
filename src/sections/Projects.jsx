// src/sections/Projects.jsx
import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { projectsDone } from "../data/projects/ProjectDone";

const Projects = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="flex justify-center items-center w-full h-screen bg-gray-900">
      <main className="relative overflow-hidden overflow-y-scroll w-[400px] h-[800px] shadow-xl rounded-2xl bg-white">
        {/* Layered Backgrounds */}
        <div className="absolute inset-0 bg-cover bg-no-repeat bg-[url('https://i.postimg.cc/y8y4gWrP/bg1.jpg')] bg-fixed"></div>
        <div className="absolute inset-0 bg-cover bg-no-repeat bg-[url('https://i.postimg.cc/rmzvPjyn/bg2.jpg')] bg-fixed opacity-70"></div>
        <div className="absolute inset-0 bg-cover bg-no-repeat bg-[url('https://i.postimg.cc/SsTVwb1C/bg5.jpg')] bg-fixed opacity-40"></div>

        {/* Header */}
        <header className="relative z-10 flex justify-between items-center p-4 text-white">
          <i className="fas fa-bars text-xl"></i>
          <div className="font-krona text-2xl uppercase">urban</div>
          <i className="fas fa-shopping-bag text-xl"></i>
        </header>

        {/* Hero Title */}
        <aside className="relative z-10 p-6 pb-16 mt-8 text-right">
          <p className="uppercase text-gray-200 text-sm">New SEASON – 020</p>
          <hr className="my-2 border-gray-400" />
          <h1 className="text-2xl font-krona text-white leading-tight">
            our
            <br />
            Projects
            <br />
            Collection
          </h1>
        </aside>

        {/* Project cards */}
        <ul className="relative z-10 flex flex-wrap gap-4 p-4">
          {projectsDone.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              isActive={active === i}
              onClick={() => setActive(active === i ? null : i)}
            />
          ))}
        </ul>
      </main>
    </section>
  );
};

export default Projects;
