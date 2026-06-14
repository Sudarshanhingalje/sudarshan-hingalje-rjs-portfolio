import { Award, Code, MonitorPlay, Users } from "lucide-react";
import { useEffect, useState } from "react";
import PolaroidFlickThrough from "../components/ui/PolaroidFlickThrough";
import IntroPopup from "../videoads/IntroPopup";
const About = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);

  const skills = [
    {
      icon: Code,
      name: "Full-Stack Development",
      color: "from-blue-500 to-cyan-500",
    },
    // {
    //   icon: Camera,
    //   name: "Wildlife Photography",
    //   color: "from-green-500 to-emerald-500",
    // },
    {
      icon: Users,
      name: "Team Leadership",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      name: "Problem Solving",
      color: "from-orange-500 to-red-500",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen w-full overflow-hidden "
    >
      <h2
        className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[120px] sm:text-[160px] lg:text-[220px] xl:text-[280px] font-black text-gray-100/80 dark:text-gray-800/40 pointer-events-none select-none z-0 transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        ABOUT
      </h2>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-16 py-24">
        <div className="max-w-7xl w-full ">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center lg:justify-end">
              <div className="relative group ">
                <PolaroidFlickThrough className="w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center" />


                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    What I'm Passionate About
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${
                            activeSkill === index
                              ? `bg-gradient-to-r ${skill.color} text-white shadow-lg scale-105`
                              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:scale-105"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="group relative"
                  >
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Watch My Story
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                      <div className="relative bg-white dark:bg-gray-800 p-4 rounded-full shadow-xl group-hover:scale-110 transition-all duration-300">
                        <MonitorPlay className="w-7 h-7 text-pink-600 dark:text-pink-400" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col justify-center transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="mb-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                  Hello, I'm Sudarshan
                </h1>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    Full-Stack Developer & Creative Soul
                  </span>
                </div>
              </div>

              <div
                className="font-serif"
                style={{ fontFamily: "Merriweather, serif" }}
              >
                <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  <p>
                    I'm a{" "}
                    <span className="font-semibold natgeo-link text-cyan-600 dark:text-cyan-400">
                      detail-oriented and passionate full-stack developer
                    </span>{" "}
                    with a strong foundation in software development and a
                    creative edge. My journey from{" "}
                    <span className="font-semibold natgeo-link text-purple-600 dark:text-purple-400">
                      zero to hero of coding
                    </span>{" "}
                    has been fueled by curiosity, discipline, and a constant
                    drive to improve.
                  </p>
                  <p>
                    Whether it's a new framework, a short film script, or a team
                    project —{" "}
                    <span className="font-semibold natgeo-link text-orange-600 dark:text-orange-400">
                      when I commit, I go all in
                    </span>
                    . I love transforming complex problems into clean, intuitive
                    user experiences where design and efficient code go hand in
                    hand.
                  </p>
                  <p>
                    I'm not just building applications — I'm{" "}
                    <span className="font-semibold natgeo-link bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
                      building stories, solving challenges, and chasing dreams
                    </span>{" "}
                    — one line of code at a time.
                  </p>
                </div>
              </div>

              <div className="my-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border-l-4 border-cyan-500 shadow-lg">
                <blockquote className="text-xl italic text-cyan-800 dark:text-cyan-300 mb-3 font-medium">
                  "Discipline turns dreams into reality. Code is just the tool."
                </blockquote>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  ~ Sudarshan Hingalje
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <IntroPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </section>
  );
};

export default About;
