import devImage from "../assets/own.webp";
import useModernScrollReveal from "../hooks/useModernScrollReveal";

const About = () => {
  useModernScrollReveal();

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-16 py-24 relative overflow-hidden 
                 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 
                 dark:from-[#0b0c15] dark:via-[#11121c] dark:to-[#181927]"
    >
      {/* Watermark Title — Large screen: behind / Mobile: top centered */}
      <h2
        className="text-[64px] sm:text-[100px] lg:text-[160px] xl:text-[200px]
                   font-black text-[#b4b4b466] dark:text-[#6d6d8540] pointer-events-none select-none
                   absolute lg:top-1/3 lg:left-1/2 lg:-translate-x-1/3 lg:-translate-y-1/3 lg:z-0 
                   block lg:block text-center w-full top-6 z-10 lg:w-auto"
      >
        ABOUT
      </h2>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-20 mt-24 lg:mt-0">
        {/* Image Side */}
        <div className="flex justify-center items-center lg:justify-end">
          <div className="relative group w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-700"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-cyan-300 dark:to-blue-300 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500"></div>

            <div className="relative">
              <img
                src={devImage}
                alt="Sudarshan Hingalje - Full Stack Developer"
                className="relative w-full h-auto shadow-2xl shadow-blue-500/20 dark:shadow-cyan-400/20 rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Text Side */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-xl">
            I’m{" "}
            <span className="font-semibold text-cyan-700 dark:text-cyan-300">
              Sudarshan Hingalje
            </span>
            , a detail-oriented and passionate full-stack developer with a
            strong foundation in software development and a creative edge. My
            journey from mechanical engineering to coding has been fueled by
            curiosity, discipline, and a constant drive to improve.
          </p>
          <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-xl">
            I take pride in managing my time effectively—balancing deep learning
            sessions, project development, and creative hobbies like wildlife
            photography, editing, and football. This balance keeps me sharp and
            constantly inspired.
          </p>
          <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-xl">
            Whether it’s a new framework, a short film script, or a team
            project—when I commit, I go all in. I love transforming complex
            problems into clean, intuitive user experiences where design and
            efficient code go hand in hand.
          </p>
          <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-xl">
            I’m not just building applications—I’m building stories, solving
            challenges, and chasing dreams—one line of code at a time.
          </p>
          <blockquote className="italic text-cyan-800 dark:text-cyan-300 border-l-4 border-cyan-500 pl-4 my-6 max-w-xl">
            "Discipline turns dreams into reality. Code is just the tool."
          </blockquote>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
            ~ Sudarshan Hingalje
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
