import { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";
import SectionHeader from "../components/SectionHeader";
import { goals } from "../data/goals/Goals";

export default function Personal() {
  const [activeGoal, setActiveGoal] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleGoalSelect = (index) => {
    setActiveGoal(activeGoal === index ? null : index);
  };

  return (
    <section
      id="personal"
      className="py-8 sm:py-12 px-4 sm:px-8 lg:px-16 text-white"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader isVisible={isVisible} />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {goals.map((goal, index) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              index={index}
              isActive={activeGoal === index}
              onClick={handleGoalSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
