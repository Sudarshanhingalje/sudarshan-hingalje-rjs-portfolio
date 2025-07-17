import { motion } from "framer-motion";
import { skillsLerned } from "../data/skills/SkillsLerned";

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen text-white font-montserrat py-16 px-6 flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold mb-12 text-center text-[#ffc857]">
        Tech Stack
      </h2>

      <div className="w-full max-w-6xl space-y-12">
        {skillsLerned.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-2xl font-semibold mb-6 text-gray-300">
              {group.category.toUpperCase()}
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {group.items.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] p-4 rounded-xl shadow hover:shadow-lg text-center transition"
                >
                  <div className="text-sm sm:text-base text-gray-300">
                    {skill.name}
                  </div>
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
