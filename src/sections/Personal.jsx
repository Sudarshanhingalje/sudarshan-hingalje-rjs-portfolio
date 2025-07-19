// src/sections/Personal.jsx
import { goals } from "../data/goals/Goals";

const Personal = () => {
  // Hook to trigger animations
  useModernScrollReveal();
  return (
    <section id="personal" className="py-20 text-white bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">🎯 My Goals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="goal-card bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700"
            >
              <div className="mb-4">{goal.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
              <p className="text-gray-300">{goal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Personal;
