import { motion } from "framer-motion";
import devImage from "../assets/download.png"; // Replace with your photo

const About = () => {
  return (
    <section
      id="about"
      className="bg-gray-900 text-white px-6 py-12 md:flex md:justify-between md:items-start gap-10"
    >
      {/* Left Section */}
      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">ABOUT ME</h2>
        <p className="text-lg mb-6">
          I'm Sudarshan Hingalje, a detail-oriented and passionate full-stack
          developer with a strong foundation in software development and a
          creative edge. My journey from mechanical engineering to coding has
          been fueled by curiosity, discipline, and a constant drive to improve.
          I believe technology is a tool to bring ideas to life, solve real
          problems, and make a positive impact.
        </p>
        <p className="text-lg mb-6">
          I take pride in managing my time effectively, balancing deep learning
          sessions, project development, and creative hobbies like wildlife
          photography, editing, and football. This balance keeps me sharp,
          grounded, and constantly inspired.
        </p>
        <p className="text-lg mb-6">
          When I commit to something—whether it’s a new framework, a short film
          script, or a team project—I give it my full attention. I love
          transforming complex problems into clean, intuitive user experiences
          and believe that thoughtful design and efficient code go hand in hand.
        </p>
        <p className="text-lg mb-6">
          I’m not just building websites or applications; I’m building stories,
          solving challenges, and chasing dreams—one line of code at a time.
        </p>

        {/* Quote */}
        <div className="italic text-gray-300 border-l-4 border-cyan-400 pl-4 my-6">
          "Discipline turns dreams into reality. Code is just the tool."
        </div>

        {/* Signature */}
        <p className="text-xl font-signature text-cyan-400 mt-4">
          ~ Sudarshan Hingalje
        </p>
      </motion.div>

      {/* Right Section - Image */}
      <motion.div
        className="mt-10 md:mt-0 md:w-1/2 flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img
          src={devImage}
          alt="Sudarshan Hingalje"
          className="w-full max-w-md rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </motion.div>
    </section>
  );
};

export default About;
