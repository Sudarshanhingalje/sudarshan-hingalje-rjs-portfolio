import { motion } from "framer-motion";
import devImage from "../assets/own.webp";

const About = () => {
  return (
    <section
      id="about"
      className="bg-gray-900 text-white px-6 py-12 md:grid md:grid-cols-2 gap-10"
    >
      {/* Left Section */}
      <motion.div
        className="flex flex-col justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">ABOUT ME</h2>
        <p className="text-lg mb-4 leading-relaxed">
          I'm{" "}
          <span className="font-semibold text-cyan-300">
            Sudarshan Hingalje
          </span>
          , a detail-oriented and passionate full-stack developer with a strong
          foundation in software development and a creative edge. My journey
          from mechanical engineering to coding has been fueled by curiosity,
          discipline, and a constant drive to improve.
        </p>
        <p className="text-lg mb-4 leading-relaxed">
          I take pride in managing my time effectively—balancing deep learning
          sessions, project development, and creative hobbies like wildlife
          photography, editing, and football. This balance keeps me sharp and
          constantly inspired.
        </p>
        <p className="text-lg mb-4 leading-relaxed">
          Whether it’s a new framework, a short film script, or a team project—
          when I commit, I go all in. I love transforming complex problems into
          clean, intuitive user experiences where design and efficient code go
          hand in hand.
        </p>
        <p className="text-lg mb-4 leading-relaxed">
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

      {/* Right Section - Sticky Avatar */}
      <motion.div
        className="relative flex items-center justify-center md:justify-end mt-10 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="about-avatar relative w-full max-w-lg">
          <img
            src={devImage}
            alt="Developer Sudarshan Hingalje"
            className="rounded-2xl  hover:scale-105 transition-transform duration-500  border-green-500 shadow-lg shadow-green-500/100"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
