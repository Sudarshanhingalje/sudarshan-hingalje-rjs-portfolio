import {
  FaAws,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";

import {
  SiBootstrap,
  SiC,
  SiCplusplus,
  SiExpress,
  SiFramer,
  SiGooglecloud,
  SiGsap,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiNodemon,
  SiOracle,
  SiPostgresql,
  SiPython,
  SiReactrouter,
  SiSpringboot,
  SiTailwindcss,
} from "react-icons/si";

export const skillsLerned = [
  {
    category: "Frontend",
    items: [
      { name: "Bootstrap", icon: <SiBootstrap /> },
      { name: "C", icon: <SiC /> },
      { name: "C++", icon: <SiCplusplus /> },
      { name: "CSS", icon: <FaCss3Alt /> },
      { name: "Framer Motion", icon: <SiFramer /> },
      { name: "GSAP", icon: <SiGsap /> },
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "JavaScript", icon: <FaJs /> },
      { name: "Python", icon: <SiPython /> },
      { name: "React", icon: <FaReact /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Express.js", icon: <SiExpress /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Nodemon", icon: <SiNodemon /> },
      { name: "React Router", icon: <SiReactrouter /> },
      { name: "Spring Boot", icon: <SiSpringboot /> },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Mongoose", icon: <SiMongoose /> },
      { name: "Oracle", icon: <SiOracle /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ],
  },
  {
    category: "Tools & Cloud",
    items: [
      { name: "AWS", icon: <FaAws /> }, // ✅ Valid AWS icon
      { name: "Docker", icon: <FaDocker /> },
      { name: "Git", icon: <FaGitAlt /> },
      { name: "GitHub", icon: <FaGithub /> },
      { name: "Google Cloud", icon: <SiGooglecloud /> },
    ],
  },
];
