import { motion } from "framer-motion";

const skills = [
  "Java",
  "Spring Boot",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Supabase",
  "PostgreSQL",
  "MongoDB",
  "Node.js",
  "Git & GitHub",
  "Docker",
  "HTML5",
  "CSS3",
  "JavaScript",
  "Three.js",
  "Framer Motion",
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-[#0f0f0f] text-white relative">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-12"
        >
          Tech Stack
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 border border-white/10 rounded-lg py-4 px-6 text-sm md:text-base font-medium shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
