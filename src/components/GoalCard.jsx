import {
  FaArrowRight,
  FaCheck,
  FaLaptopCode,
  FaSitemap,
  FaUsersCog,
} from "react-icons/fa";

// Icon mapping
const iconMap = {
  FaLaptopCode: FaLaptopCode,
  FaSitemap: FaSitemap,
  FaUsersCog: FaUsersCog,
};

const GoalCard = ({ goal, isActive, onClick, index }) => {
  const IconComponent = iconMap[goal.iconName];

  return (
    <div
      onClick={() => onClick(index)}
      className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 border-2 rounded-3xl p-8 cursor-pointer transition-all duration-500  ${
        isActive
          ? "border-teal-400 shadow-2xl shadow-teal-400/20 transform scale-105"
          : "border-gray-700 hover:border-gray-600"
      }`}
    >
      <div className="absolute -top-4 -right-4">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-gray-700"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${
                2 * Math.PI * 28 * (1 - goal.progress / 100)
              }`}
              className="text-teal-400 transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-teal-400">
              {goal.progress}%
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="p-3 bg-teal-400/10 rounded-2xl border border-teal-400/20">
          {IconComponent && (
            <IconComponent size={28} className="text-teal-400" />
          )}
        </div>
        <span className="text-sm font-medium text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-full">
          {goal.timeline}
        </span>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-teal-300 transition-colors">
        {goal.title}
      </h3>

      <p className="text-gray-300 text-base leading-relaxed mb-6">
        {goal.description}
      </p>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <h4 className="text-sm font-semibold text-teal-400 mb-3 flex items-center gap-2">
          <FaArrowRight size={12} />
          Key Milestones
        </h4>
        <ul className="space-y-2">
          {goal.keyPoints.map((point, pointIndex) => (
            <li
              key={pointIndex}
              className="flex items-center gap-3 text-sm text-gray-300"
            >
              <FaCheck size={12} className="text-teal-400 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-r from-teal-400/5 to-cyan-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />
    </div>
  );
};

export default GoalCard;
