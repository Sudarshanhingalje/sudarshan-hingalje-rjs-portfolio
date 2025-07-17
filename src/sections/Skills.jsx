import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { skillsLerned } from "../data/skills/skillsLerned";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const skillTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    skillTimeline.from(".skill-card", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <section
      id="skills"
      className="min-h-screen text-white font-montserrat pt-4 pb-16 px-4 flex flex-col items-center"
    >
      {/* Section Heading */}
      <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-[#ffc857]">
        Tech Stack
      </h2>

      {/* Skills Container */}
      <div className="w-full max-w-7xl space-y-16">
        {skillsLerned.map((group, idx) => (
          <div key={idx}>
            {/* Category Title */}
            <h3 className="text-2xl font-semibold mb-6 text-gray-300">
              {group.category.toUpperCase()}
            </h3>

            {/* Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-5 justify-center">
              {group.items.map((skill, i) => (
                <div
                  key={i}
                  className="skill-card bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow flex flex-col items-center justify-center text-center hover:scale-105 hover:shadow-lg transition-all"
                >
                  <img
                    src={`/skill/${skill.image}`}
                    alt={skill.name}
                    className="w-10 h-10 mb-2 object-contain"
                    loading="lazy"
                  />
                  <p className="text-sm text-gray-200">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
