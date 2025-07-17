import { motion } from "framer-motion";
import { skillsLerned } from "../data/skills/SkillsLerned";

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen text-white font-montserrat py-16 px-4 md:px-10 flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold mb-12 text-center text-[#ffc857]">
        Tech Stack
      </h2>

      <div className="w-full max-w-7xl space-y-16">
        {skillsLerned.map((group, idx) => (
          <div key={idx} className="w-full">
            <h3 className="text-2xl font-semibold mb-6 text-gray-300">
              {group.category.toUpperCase()}
            </h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6"
            >
              {group.items.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-md hover:shadow-xl transition-all flex flex-col items-center"
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-12 h-12 mb-3 object-contain"
                    loading="lazy"
                  />
                  <span className="text-sm text-center text-gray-200">
                    {skill.name}
                  </span>
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
