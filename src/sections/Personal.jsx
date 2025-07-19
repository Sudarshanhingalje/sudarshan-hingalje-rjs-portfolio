import { goals } from "../data/goals/Goals";
import useModernScrollReveal from "../hooks/useModernScrollReveal";

export default function Personal() {
  useModernScrollReveal();

  return (
    <section id="personal" className="py-20 px-6 sm:px-12 lg:px-20 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-4 text-sm font-semibold text-cyan-400 border border-cyan-400 px-4 py-1 inline-block rounded-full">
          My Roadmap
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Career Goals</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="goal-card bg-[#121212] border border-gray-700 rounded-2xl p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{goal.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{goal.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {goal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
