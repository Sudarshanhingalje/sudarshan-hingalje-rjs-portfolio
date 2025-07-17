import { motion } from "framer-motion";
import { skillsLerned } from "../data/skills/SkillsLerned";

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen bg-[#0f1123] text-white py-20 px-4 md:px-8"
    >
      <h2 className="text-4xl font-cinzel font-bold text-center text-yellow-300 mb-16">
        Tech Stack
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Left Side: Categories */}
        <div className="md:w-1/4 flex flex-col gap-8 text-yellow-200 text-xl font-semibold">
          {skillsLerned.map((category) => (
            <div key={category.category} className="cursor-default">
              {category.category}
            </div>
          ))}
        </div>

        {/* Right Side: Skills */}
        <div className="md:w-3/4 flex flex-col gap-12">
          {skillsLerned.map((category) => (
            <div
              key={category.category}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            >
              {category.items.map((skill, idx) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
