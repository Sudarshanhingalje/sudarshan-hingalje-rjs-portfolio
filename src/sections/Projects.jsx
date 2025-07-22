import { motion } from "framer-motion";
import { Github, LinkIcon } from "lucide-react";
import { projectsDone } from "../data/projects/ProjectDone";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Projects = () => {
  return (
    <section id="projects" className="py-16 px-4 md:px-12 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2 text-foreground">Projects</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Explore a collection of my featured full-stack and frontend projects
          showcasing my expertise across various technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projectsDone.map((project, index) => (
          <motion.div
            key={project.id}
            className={`rounded-xl shadow-lg overflow-hidden bg-gradient-to-br ${project.color} text-white`}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="relative w-full h-48 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
                poster={project.img}
              >
                <source
                  src={`/project/videos/${project.id}.mp4`}
                  type="video/mp4"
                />
              </video>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                {project.shortTitle}
              </h3>
              <p className="text-sm mb-3 opacity-90">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-white/20 px-2 py-1 rounded text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/80"
                >
                  <LinkIcon size={18} />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/80"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
