// src/sections/Projects.jsx
import { useState } from "react";
import ProjectCard from "../components/ProjectCard";

// Dummy data (replace with your actual project list)
const projects = [
  {
    title: "The Wild Oasis",
    img: "/project/wild.png",
    description:
      "A full-stack hotel management app with customer-facing site using Next.js, Supabase, Framer Motion, Three.js.",
    techImages: ["nextjs.svg", "tailwind.svg", "postgresql.svg"],
    link: "https://wild-oasis.vercel.app",
    github: "https://github.com/sudarshanhingalje/the-wild-oasis",
  },
  {
    title: "Scrap Savvy",
    img: "/project/scrap.png",
    description:
      "A waste management web app built with MERN stack that helps manage scrap pickups and delivery.",
    techImages: ["react.svg", "nodejs.svg", "mongodb.svg"],
    link: "https://scrap-savvy.vercel.app",
    github: "https://github.com/sudarshanhingalje/scrap-savvy",
  },
  {
    title: "Online Vegetable Store",
    img: "/project/vege.png",
    description:
      "An e-commerce platform for fresh vegetables built using React, Express, and MongoDB with user authentication.",
    techImages: ["react.svg", "express.svg", "mongodb.svg"],
    link: "https://vegetable-store.vercel.app",
    github: "https://github.com/sudarshanhingalje/vegetable-store",
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section id="projects" className="p-4 sm:p-8 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">My Projects</h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {projects.map((project, idx) => (
          <ProjectCard
            key={idx}
            project={project}
            isActive={idx === activeIndex}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
