// src/components/Projects.jsx
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
    <section
      id="projects"
      className="py-16 px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Projects
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Explore a collection of my featured full-stack and frontend projects
          showcasing my expertise across various technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
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
            {/* Project Video / Thumbnail */}
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                poster={project.img}
              >
                <source
                  src={`/project/videos/${project.id}.mp4`}
                  type="video/mp4"
                />
              </video>
            </div>

            {/* Project Content */}
            <div className="p-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {project.shortTitle}
              </h3>
              <p className="text-sm opacity-90 mb-3">{project.description}</p>

              {/* Technologies */}
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

              {/* Links */}
              <div className="flex gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/80"
                  >
                    <LinkIcon size={18} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/80"
                  >
                    <Github size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
