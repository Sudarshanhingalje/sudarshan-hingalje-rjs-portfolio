// src/sections/Skills.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { skillsLerned } from "../data/skills/SkillsLerned";
import useModernScrollReveal from "../hooks/useModernScrollReveal";
import FeaturedTechNames from "../ui/FeaturedWork";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(
    skillsLerned[0].category
  );
  useModernScrollReveal();

  return (
    <section
      id="skills"
      className="h-screen grid grid-rows-[40vh_auto] dark:text-white text-black py-10 px-4 md:px-8 "
    >
      {/* Top Marquee Area */}
      <div className="overflow-hidden">
        <FeaturedTechNames />
      </div>

      {/* Tech Stack */}
      <div className="overflow-auto pb-6">
        <div className="skill-card max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Categories */}
          <div className="md:w-1/4 flex flex-col gap-6 text-yellow-200 text-xl font-semibold">
            {skillsLerned.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`text-left transition-all duration-300 px-2 py-1 rounded-md ${
                  activeCategory === category.category
                    ? "bg-yellow-300 text-black font-bold scale-105"
                    : "hover:bg-yellow-100/20"
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>

          {/* Skills */}
          <div className="md:w-3/4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {skillsLerned
              .find((cat) => cat.category === activeCategory)
              ?.items.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <img
                    src={`/skill/${skill.image}`}
                    alt={skill.name}
                    className="w-12 h-12 mb-2 object-contain"
                    loading="lazy"
                  />
                  <p className="text-sm">{skill.name}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
