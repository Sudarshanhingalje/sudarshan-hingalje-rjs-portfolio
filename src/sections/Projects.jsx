import { motion } from "framer-motion";

const projects = [
  {
    title: "The Wild Oasis",
    description:
      "A full-stack boutique hotel app with internal admin and customer-facing booking system. Built with Next.js, Tailwind CSS, Supabase, PostgreSQL, and more.",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Three.js",
      "NextAuth.js",
    ],
    link: "https://the-wild-oasis.vercel.app/",
  },
  {
    title: "Online Vegetable Store",
    description:
      "An e-commerce platform built with React.js and Tailwind CSS for seamless browsing, cart management, and checkout.",
    tech: ["React.js", "Tailwind CSS", "JavaScript"],
    link: "https://github.com/Sudarshanhingalje/online-vegetable-store",
  },
  {
    title: "Scrap Savvy - Waste Management System",
    description:
      "A digital platform for efficient scrap pickup and recycling service management. Optimized for both users and vendors.",
    tech: ["HTML", "CSS", "JavaScript", "Firebase"],
    link: "https://github.com/Sudarshanhingalje/ScrapSavvy",
  },
  {
    title: "Restaurant Reservation System",
    description:
      "MongoDB-based reservation app for managing table bookings at restaurants with clean UI.",
    tech: ["JavaScript", "MongoDB", "Node.js", "HTML", "CSS"],
    link: "https://github.com/Sudarshanhingalje/restaurant-reservation-system",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-[#0d0d0d] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          My Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-white/10 text-xs px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
              >
                View Project →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
