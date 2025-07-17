import { motion } from "framer-motion";
import { skillsLerned } from "../data/skills/SkillsLerned";

const Skills = () => {
  return (
    <section className="min-h-screen bg-[#0f1123] text-white py-20 px-6">
      <h2 className="text-4xl font-bold text-center text-yellow-300 mb-12">
        Tech Stack
      </h2>

      <div className="grid gap-12 max-w-5xl mx-auto">
        {skillsLerned.map((category) => (
          <div key={category.category}>
            <h3 className="text-2xl font-semibold text-left mb-6">
              {category.category}
            </h3>

            <div className="flex flex-wrap gap-6">
              {category.items.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="flex flex-col items-center justify-center w-24"
                >
                  <img
                    src={`/skill/${skill.image}`}
                    alt={skill.name}
                    className="w-12 h-12 object-contain mb-2"
                    loading="lazy"
                  />
                  <p className="text-sm text-center">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
