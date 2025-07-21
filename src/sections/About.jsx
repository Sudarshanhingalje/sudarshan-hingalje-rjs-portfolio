import { motion } from "framer-motion";
import devImage from "../assets/own.webp";
import useModernScrollReveal from "../hooks/useModernScrollReveal";

const About = () => {
  // ✅ Call custom scroll animation logic
  useModernScrollReveal();

  return (
    <section
      id="about"
      data-speed="0.75"
      className="text-white px-6 py-16 md:py-20 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12"
    >
      {/* Left Text Section */}
      <motion.div
        className="flex flex-col justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
          ABOUT ME
        </h2>
        <p className="text-base sm:text-lg mb-4 leading-relaxed">
          I'm{" "}
          <span className="font-semibold text-cyan-300">
            Sudarshan Hingalje
          </span>
          , a detail-oriented and passionate full-stack developer with a strong
          foundation in software development and a creative edge. My journey
          from mechanical engineering to coding has been fueled by curiosity,
          discipline, and a constant drive to improve.
        </p>
        <p className="text-base sm:text-lg mb-4 leading-relaxed">
          I take pride in managing my time effectively—balancing deep learning
          sessions, project development, and creative hobbies like wildlife
          photography, editing, and football. This balance keeps me sharp and
          constantly inspired.
        </p>
        <p className="text-base sm:text-lg mb-4 leading-relaxed">
          Whether it’s a new framework, a short film script, or a team project—
          when I commit, I go all in. I love transforming complex problems into
          clean, intuitive user experiences where design and efficient code go
          hand in hand.
        </p>
        <p className="text-base sm:text-lg mb-4 leading-relaxed">
          I’m not just building applications—I’m building stories, solving
          challenges, and chasing dreams—one line of code at a time.
        </p>

        {/* Quote */}
        <blockquote className="italic text-gray-300 border-l-4 border-cyan-400 pl-4 my-6">
          "Discipline turns dreams into reality. Code is just the tool."
        </blockquote>

        {/* Signature */}
        <p className="text-xl font-signature text-cyan-400 mt-4">
          ~ Sudarshan Hingalje
        </p>
      </motion.div>

      <motion.div
        className=" relative flex items-center justify-center md:justify-end"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="about-avatar relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <img
            id="about-img"
            src={devImage}
            alt="Developer Sudarshan Hingalje"
            className="avatar-image rounded-2xl w-full h-auto border-green-500 shadow-lg shadow-green-500/100"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
