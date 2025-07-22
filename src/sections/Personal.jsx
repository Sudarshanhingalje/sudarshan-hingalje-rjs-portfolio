import { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";
import SectionHeader from "../components/SectionHeader";
import { goals } from "../data/goals/Goals";
import useModernScrollReveal from "../hooks/useModernScrollReveal";

export default function Personal() {
  const [activeGoal, setActiveGoal] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useModernScrollReveal();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleGoalSelect = (index) => {
    setActiveGoal(index);
    setIsPaused(true);

    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section
      id="personal"
      className="py-20 px-6 sm:px-12 lg:px-20 text-white min-h-screen "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader isVisible={isVisible} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {goals.map((goal, index) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              index={index}
              onClick={handleGoalSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
