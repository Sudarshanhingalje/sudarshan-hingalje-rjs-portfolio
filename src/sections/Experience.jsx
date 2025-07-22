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
    <section id="experience" className="py-20 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-wider drop-shadow mb-6 select-none">
            <span className="text-[#39C9DF]">Experience</span>
          </h2>
          <p className="text-lg font-light text-gray-300 max-w-2xl mx-auto">
            A journey of learning, building, and growing through diverse
            opportunities.
          </p>
        </motion.div>
        <div className="relative pl-6">
          {/* Timeline vertical line */}
          <div className="absolute left-4 top-0 h-full border-l-4 border-[#39C9DF]/30"></div>
          <div className="space-y-12">
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
                {/* Timeline Dot */}
                <span className="absolute -left-1.5 top-3.5 z-10 w-6 h-6 rounded-full bg-[#39C9DF] border-4 border-white group-hover:scale-125 transition-transform"></span>
                {/* Content */}
                <div className="ml-8 bg-white/10 backdrop-blur border border-white/10 rounded-lg shadow-xl p-6 w-full hover:bg-white/30 transition duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-2xl font-bold text-[#39C9DF]">
                      {exp.role}
                    </h3>
                    <span className="text-sm text-gray-300 ml-0 md:ml-2 mt-2 md:mt-0 ">
                      {exp.company} &mdash;{" "}
                      <span className="font-medium text-white">
                        {exp.period}
                      </span>
                    </span>
                  </div>
                  <p className="mt-3 text-gray-100 leading-relaxed">
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
