import project1 from "../assets/brand.svg"; // your images
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 bg-black text-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">My Projects</h2>
        <p className="text-gray-400">What I’ve built so far</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        <ProjectCard
          title="The Wild Oasis"
          desc="Hotel management platform with internal booking logic and customer frontend."
          img={project1}
          link="https://the-wild-oasis.vercel.app/"
        />
        {/* Add more ProjectCard components */}
      </div>
    </section>
  );
};

export default Projects;
