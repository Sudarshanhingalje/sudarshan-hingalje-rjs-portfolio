import {
  FaArrowRight,
  FaCheck,
  FaLaptopCode,
  FaSitemap,
  FaUsersCog,
} from "react-icons/fa";

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
      className={`group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 
        backdrop-blur-sm border rounded-2xl p-6 cursor-pointer 
        transition-all duration-300 hover:scale-[1.02] ${
          isActive
            ? "border-teal-400/60 shadow-lg shadow-teal-400/10"
            : "border-gray-700/50 hover:border-gray-600/70"
        }`}
    >
      {/* Progress Circle - Smaller */}
      <div className="absolute -top-2 -right-2">
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              className="text-gray-700"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${
                2 * Math.PI * 20 * (1 - goal.progress / 100)
              }`}
              className="text-teal-400 transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-teal-400">
              {goal.progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="p-2.5 bg-teal-400/10 rounded-xl border border-teal-400/20">
          {IconComponent && (
            <IconComponent size={20} className="text-teal-400" />
          )}
        </div>
        <span className="text-xs font-medium text-cyan-300 bg-cyan-400/10 px-2.5 py-1 rounded-full">
          {goal.timeline}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold mb-3 text-white group-hover:text-teal-300 transition-colors leading-tight">
        {goal.title}
      </h3>

      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
        {goal.description}
      </p>

      {/* Expandable Milestones */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isActive ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-2 border-t border-gray-700/50">
          <h4 className="text-xs font-semibold text-teal-400 mb-2 flex items-center gap-1.5">
            <FaArrowRight size={10} />
            Key Milestones
          </h4>
          <ul className="space-y-1.5">
            {goal.keyPoints.map((point, pointIndex) => (
              <li
                key={pointIndex}
                className="flex items-start gap-2 text-xs text-gray-300"
              >
                <FaCheck
                  size={10}
                  className="text-teal-400 flex-shrink-0 mt-0.5"
                />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-teal-400/3 to-cyan-400/3 
          rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity 
          duration-200 pointer-events-none`}
      />
    </div>
  );
};

export default GoalCard;
