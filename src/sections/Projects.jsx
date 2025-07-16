import { motion } from "framer-motion";

const projects = [
  {
    title: "The Wild Oasis (Cabin Booking App)",
    description:
      "A full-stack hotel booking platform with both admin and customer interfaces. Built using React, Supabase, styled-components, and React Query.",
    tech: [
      "React",
      "Supabase",
      "Styled-components",
      "React Query",
      "React Router",
    ],
    link: "https://the-wild-oasis-website-cabins.vercel.app/",
    github: "https://github.com/Sudarshanhingalje/the-wild-oasis-website",
  },
  {
    title: "The Wild Oasis (Admin Dashboard)",
    description:
      "Admin panel for managing cabin bookings, users, and availability with charts and filters. Developed using React and Supabase.",
    tech: ["React", "Supabase", "React Query", "Styled-components"],
    link: "https://hotelthe-wild-oasis.netlify.app/",
    github: "https://github.com/Sudarshanhingalje/the-wild-oasis",
  },
  {
    title: "Fast React Pizza (Redux E-commerce)",
    description:
      "A modern pizza ordering app built with React and Redux Toolkit. Features real-time cart, checkout, and dynamic UI with Tailwind CSS.",
    tech: ["React", "Redux Toolkit", "Tailwind CSS"],
    link: "https://redux-fast-react-pizza.netlify.app/",
    github: "https://github.com/Sudarshanhingalje/fast-react-pizza",
  },
  {
    title: "ScrapSavvy - Waste Management System",
    description:
      "A collaborative scrap collection platform. Users can schedule pickups, vendors manage listings. Built using Firebase for backend.",
    tech: ["HTML", "CSS", "JavaScript", "Firebase"],
    link: "https://the-wild-oasis-website-cabins.vercel.app/", // fallback
    github: "https://github.com/ScrapSavvym24/ScrapSavvy_M24",
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
              <div className="flex flex-col gap-1 text-sm">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  🔗 Live Demo →
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline"
                >
                  🛠 GitHub →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
