import { FaBullseye, FaChartLine, FaRocket } from "react-icons/fa";
import { useModernScrollReveal } from "../hooks/useModernScrollReveal";

const goals = [
  {
    title: "Short-Term Goal",
    icon: <FaRocket size={24} className="text-teal-400" />,
    description:
      "To secure a challenging Frontend Developer position where I can apply my skills in React and Next.js, contribute to meaningful projects, and continuously learn from experienced mentors within a collaborative team.",
  },
  {
    title: "Mid-Term Goal",
    icon: <FaChartLine size={24} className="text-teal-400" />,
    description:
      "To evolve into a Senior Frontend Developer, taking ownership of complex features, mentoring junior developers, and deepening my expertise in performance optimization and building highly scalable applications.",
  },
  {
    title: "Long-Term Goal",
    icon: <FaBullseye size={24} className="text-teal-400" />,
    description:
      "To become a technical lead or solutions architect, guiding technical strategy, driving innovation in user experience, and making a significant impact on the products and teams I help create.",
  },
];

export default function Personal() {
  useModernScrollReveal();
  return (
    <section id="personal" className="py-20 px-6 sm:px-12 lg:px-20 text-white">
      <div className="goal-card max-w-7xl mx-auto text-center">
        <p className="mb-4 text-sm font-semibold text-cyan-400 border border-cyan-400 px-4 py-1 inline-block rounded-full">
          My Roadmap
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Career Goals</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-[#121212] border border-gray-700 rounded-2xl p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300"
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
