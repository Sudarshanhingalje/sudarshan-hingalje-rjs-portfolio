// components/Skills.jsx
import { motion } from "framer-motion";
import { skillsLerned } from "../data/skills/SkillsLerned"; // adjust path as per your folder

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen  text-white flex flex-col items-center justify-center py-16"
    >
      <h2 className="text-4xl font-bold mb-10">Skills</h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[90%] max-w-6xl"
      >
        {skillsLerned.map((skill, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#1a1a1a] text-center py-3 px-4 rounded-xl shadow-lg border border-[#2a2a2a]"
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
