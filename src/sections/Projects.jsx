// src/sections/Projects.jsx
import ProjectCard from "../components/ProjectCard";
import { projectsDone } from "../data/projects"; // You need to create this

const Projects = () => {
  return (
    <section className="w-screen h-screen flex justify-center items-center bg-gray-900">
      <main className="relative overflow-hidden overflow-y-scroll w-[400px] h-[800px] shadow-2xl rounded-xl bg-white/10 backdrop-blur-lg">
        {/* Background Images */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-[url('https://i.postimg.cc/y8y4gWrP/bg1.jpg')]"
            style={{ backgroundPosition: "-90px" }}
          ></div>
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-[url('https://i.postimg.cc/rmzvPjyn/bg2.jpg')]"
            style={{ backgroundPosition: "-120px" }}
          ></div>
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-[url('https://i.postimg.cc/SsTVwb1C/bg5.jpg')]"
            style={{ backgroundPosition: "-120px" }}
          ></div>
        </div>

        {/* Header */}
        <header className="flex justify-between items-center p-4 text-white">
          <div className="text-2xl">☰</div>
          <div className="font-krona text-2xl uppercase tracking-widest">
            urban
          </div>
          <div className="text-2xl">🛍️</div>
        </header>

        {/* Hero Title */}
        <aside className="px-5 pb-5">
          <p className="uppercase text-white text-sm">New SEASON - 020</p>
          <hr className="border-gray-600 my-2" />
          <h1 className="text-white font-krona text-right text-xl leading-tight">
            our <br /> Projects <br /> Collection
          </h1>
        </aside>

        {/* Projects List */}
        <ul className="flex flex-wrap gap-4 p-4">
          {projectsDone.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </ul>
      </main>
    </section>
  );
};

export default Projects;
