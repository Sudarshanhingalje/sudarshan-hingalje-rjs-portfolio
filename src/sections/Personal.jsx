// src/sections/Personal.jsx
import { motion } from "framer-motion";
import { goals } from "../data/goals";
import useScrollAnimation from "../utils/useScrollAnimation";

const Personal = () => {
  useScrollAnimation(); // ✅ Apply scroll animations

  return (
    <section id="personal" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Personal Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              className="goal-card p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-700 border border-teal-500"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="mb-4">{goal.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
              <p className="text-gray-300">{goal.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Personal;
