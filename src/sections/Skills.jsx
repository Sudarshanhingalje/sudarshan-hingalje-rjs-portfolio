import { motion } from "framer-motion";
import { skillsLerned } from "../data/skills/SkillsLerned";

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen text-white font-montserrat py-10 px-4 flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold mb-8 text-center text-[#ffc857]">
        Tech Stack
      </h2>

      <div className="w-full max-w-7xl space-y-10 overflow-hidden">
        {skillsLerned.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-2xl font-semibold mb-4 text-gray-300">
              {group.category.toUpperCase()}
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4 justify-center"
            >
              {group.items.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow flex flex-col items-center justify-center text-center hover:shadow-lg transition-all"
                >
                  <img
                    src={`/assets/skill/${skill.name}.svg`}
                    alt={skill.name}
                    className="w-8 h-8 mb-2 object-contain"
                    loading="lazy"
                  />
                  <div className="text-sm text-gray-200">{skill.name}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
