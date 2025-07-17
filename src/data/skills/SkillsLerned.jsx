import {
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
  SiAws,
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
      { name: "JavaScript", icon: <FaJs /> },
      { name: "React", icon: <FaReact /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3Alt /> },
      { name: "GSAP", icon: <SiGsap /> },
      { name: "Framer Motion", icon: <SiFramer /> },
      { name: "Bootstrap", icon: <SiBootstrap /> },
      { name: "C", icon: <SiC /> },
      { name: "C++", icon: <SiCplusplus /> },
      { name: "Python", icon: <SiPython /> },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Nodemon", icon: <SiNodemon /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "React Router", icon: <SiReactrouter /> },
      { name: "Spring Boot", icon: <SiSpringboot /> },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Mongoose", icon: <SiMongoose /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Oracle", icon: <SiOracle /> },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "GitHub", icon: <FaGithub /> },
      { name: "Docker", icon: <FaDocker /> },
      { name: "AWS", icon: <SiAws /> },
      { name: "Google Cloud", icon: <SiGooglecloud /> },
    ],
  },
];
