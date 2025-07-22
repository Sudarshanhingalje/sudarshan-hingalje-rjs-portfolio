import { FaCalendarAlt } from "react-icons/fa";

const SectionHeader = ({ isVisible }) => {
  return (
    <div
      className={`text-center mb-16 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="inline-flex items-center gap-2 mb-4 text-sm font-semibold text-cyan-400 border border-cyan-400 px-6 py-2 rounded-full bg-cyan-400/10 backdrop-blur-sm">
        <FaCalendarAlt size={14} />
        My Career Roadmap
      </div>

      <h2 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
        Career Goals
      </h2>

      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        A strategic journey from Full Stack Developer to Solution Architect,
        with clear milestones and measurable outcomes.
      </p>
    </div>
  );
};

export default SectionHeader;
