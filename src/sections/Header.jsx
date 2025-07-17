import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import avatar from "../assets/yoga.svg";
import Navbar from "../components/Navbar";
import useScrollAnimation from "../utils/useScrollAnimation";

export default function Header() {
  useScrollAnimation();

  const [showNavbar, setShowNavbar] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = window.innerHeight;
      if (window.scrollY > headerHeight - 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="header"
      className="transition-all duration-500 ease-in-out relative h-screen w-full  text-white overflow-hidden"
    >
      {showNavbar && <Navbar />}
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-100, 0, 0, -100] }}
        transition={{ duration: 8, ease: "easeInOut" }}
        className="absolute top-6 left-4 md:left-10 text-4xl sm:text-5xl md:text-6xl font-cinzel leading-tight tracking-tight text-[#d5cdc4]"
      >
        Sudarshan <br />
        Hingalje
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: [1], y: [90, 0, 0] }}
        transition={{ delay: 6, duration: 6 }}
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
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="relative w-full flex justify-center items-center">
          <img
            src={avatar}
            alt="Avatar"
            className="relative z-10 w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px] xl:w-[260px] max-w-[80vw] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
