import { motion } from "framer-motion";
import { skillsLerned } from "../data/skills/SkillsLerned";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen text-white font-montserrat pt-8 pb-16 px-4 flex flex-col items-center"
    >
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold mb-12 text-center text-[#ffc857]"
      >
        Tech Stack
      </motion.h2>

      {/* Skills Container */}
      <div className="w-full max-w-7xl space-y-16">
        {skillsLerned.map((group, idx) => (
          <div key={idx}>
            {/* Category Title */}
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold mb-6 text-gray-300"
            >
              {group.category.toUpperCase()}
            </motion.h3>

            {/* Grid */}
            <motion.div
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-5 justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {group.items.map((skill, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  custom={i}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow flex flex-col items-center justify-center text-center hover:shadow-lg transition-all"
                >
                  <img
                    src={`/assets/skill/${skill.name}.svg`}
                    alt={skill.name}
                    className="w-10 h-10 mb-2 object-contain"
                    loading="lazy"
                  />
                  <p className="text-sm text-gray-200">{skill.name}</p>
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
