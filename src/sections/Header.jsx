import { motion } from "framer-motion";
import avatar from "../assets/yoga.png";

export default function Header() {
  return (
    <section className="relative h-screen w-full bg-stone-950 text-white overflow-hidden">
      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-100, 0, 0, -100] }}
        transition={{ duration: 6, ease: "easeInOut" }}
        className="absolute top-6 left-4 md:left-10 text-4xl sm:text-5xl md:text-6xl font-cinzel leading-tight tracking-tight text-[#d5cdc4]"
      >
        Sudarshan <br />
        Hingalje
      </motion.h1>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: [1], y: [90, 0, 0] }}
        transition={{ delay: 3.1, duration: 1 }}
        className="absolute top-[28%] left-4 md:left-10 flex flex-col items-start space-y-6 sm:space-y-8"
      >
        <p className="text-4xl sm:text-6xl md:text-7xl lg:text-[8vw] xl:text-[9vw] font-cinzel leading-tight text-[#d5cdc4]">
          Full Stack <br />
          <span className="text-5xl sm:text-7xl md:text-[9vw] font-bold">
            Developer
          </span>
        </p>

        <a
          href="#about"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-lg sm:text-xl lg:text-2xl transition-all duration-300"
        >
          Contact Me
        </a>
      </motion.div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
        <img
          src={avatar}
          alt="Background"
          className="w-[100px] sm:w-[150px] md:w-[200px] object-contain"
        />
      </div>
    </section>
  );
}
