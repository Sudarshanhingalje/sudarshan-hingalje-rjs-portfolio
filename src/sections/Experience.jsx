import { motion } from "framer-motion";
import { experiences } from "../data/experienceTaken/ExperiencesTaken";
import useModernScrollReveal from "../hooks/useModernScrollReveal";

const timelineVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.25 },
  }),
};

const Experience = () => {
  useModernScrollReveal();

  return (
    <section
      id="experience"
      className="h-screen overflow-hidden flex flex-col justify-center py-10 dark:text-white text-slate-800"
    >
      <div className="max-w-5xl mx-auto w-full px-4 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-wide dark:text-white text-slate-900">
            <span className="text-blue-600 dark:text-cyan-400">Experience</span>
          </h2>
          <p className="text-base md:text-lg font-light dark:text-gray-300 text-slate-600 max-w-2xl mx-auto mt-4">
            A journey of learning, building, and growing through diverse
            opportunities.
          </p>
        </motion.div>

        <div className="relative pl-6 flex-grow overflow-y-auto no-scrollbar">
          {/* Timeline vertical line */}
          <div className="absolute left-4 top-0 h-full border-l-4 dark:border-cyan-400/30 border-blue-500/40"></div>

          <div className="space-y-10 pr-4">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={timelineVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative flex items-start group"
              >
                {/* Dot */}
                <span className="absolute -left-1.5 top-3.5 w-6 h-6 rounded-full bg-blue-500 dark:bg-cyan-400 border-4 border-white dark:border-white group-hover:scale-110 transition-transform"></span>

                <div className="ml-8 bg-white dark:bg-white/10 backdrop-blur border dark:border-white/10 border-slate-200/40 rounded-lg shadow-lg p-6 w-full">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-xl md:text-2xl font-semibold text-blue-600 dark:text-cyan-400">
                      {exp.role}
                    </h3>
                    <span className="text-sm mt-2 md:mt-0 text-slate-600 dark:text-gray-300">
                      {exp.company} &mdash;{" "}
                      <span className="font-medium text-slate-800 dark:text-white">
                        {exp.period}
                      </span>
                    </span>
                  </div>
                  <p className="mt-3 text-slate-600 dark:text-gray-100 leading-relaxed text-sm md:text-base">
                    {exp.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
