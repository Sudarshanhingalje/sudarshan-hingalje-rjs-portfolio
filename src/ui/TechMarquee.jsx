// src/components/TechMarquee.jsx
import Marquee from "react-fast-marquee";
import {
  FaCode,
  FaCss3Alt,
  FaDocker,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJs,
  FaReact,
} from "react-icons/fa";
import { SiJira, SiNextdotjs, SiPostman } from "react-icons/si";

export default function TechMarquee() {
  return (
    <section className="bg-yellow-100 transform skew-y-6  py-3">
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        <div className="flex items-center space-x-10 text-black font-bold text-lg">
          <span className="flex items-center space-x-2">
            <FaReact className="text-blue-600" /> <span>React</span>
          </span>
          <span className="flex items-center space-x-2">
            <FaHtml5 className="text-orange-600" /> <span>HTML5</span>
          </span>
          <span className="flex items-center space-x-2">
            <FaCss3Alt className="text-blue-800" /> <span>CSS3</span>
          </span>
          <span className="flex items-center space-x-2">
            <FaJs className="text-yellow-600" /> <span>JavaScript</span>
          </span>
          <span className="flex items-center space-x-2">
            <FaJava className="text-red-600" /> <span>Java</span>
          </span>
          <span className="flex items-center space-x-2">
            <FaCode className="text-purple-700" /> <span>C#</span>{" "}
            {/* ✅ fallback for SiCsharp */}
          </span>
          <span className="flex items-center space-x-2">
            <SiNextdotjs className="text-gray-900" /> <span>Next.js</span>
          </span>
          <span className="flex items-center space-x-2">
            <FaDocker className="text-blue-500" /> <span>Docker</span>
          </span>
          <span className="flex items-center space-x-2">
            <SiPostman className="text-orange-500" /> <span>Postman</span>
          </span>
          <span className="flex items-center space-x-2">
            <SiJira className="text-indigo-700" /> <span>Jira</span>
          </span>
          <span className="flex items-center space-x-2">
            <FaGithub className="text-gray-800" /> <span>GitHub</span>
          </span>
          <span className="flex items-center">
            🛠️ Currently working on:{" "}
            <span className="ml-2 text-purple-900">
              The Wild Oasis – Internal Hotel System
            </span>
          </span>
        </div>
      </Marquee>
    </section>
  );
}
