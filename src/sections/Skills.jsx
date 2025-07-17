import { motion } from "framer-motion";
import { skillsLerned } from "../data/skills/SkillsLerned";

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen bg-[#0f1123] text-white py-20 px-6"
    >
      <h2 className="text-4xl font-cinzel font-bold text-center text-yellow-300 mb-16">
        Tech Stack
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 font-poppins">
        {/* LEFT SIDE: Category list */}
        <div className="md:col-span-1 space-y-6">
          {skillsLerned.map((cat) => (
            <motion.h3
              key={cat.category}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold text-yellow-300 border-l-4 border-yellow-500 pl-4"
            >
              {cat.category}
            </motion.h3>
          ))}
        </div>

        {/* RIGHT SIDE: Skills */}
        <div className="md:col-span-3 space-y-12">
          {skillsLerned.map((category) => (
            <div key={category.category}>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {category.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="flex flex-col items-center justify-center bg-[#1a1d3a] rounded-xl p-4 hover:scale-105 transition-transform shadow-lg"
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <img
                      src={`/skill/${skill.image}`}
                      alt={skill.name}
                      className="w-12 h-12 mb-2 object-contain"
                      loading="lazy"
                    />
                    <p className="text-sm text-white text-center">
                      {skill.name}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
