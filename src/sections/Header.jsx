import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FcMusic } from "react-icons/fc";
import avatar from "../assets/yoga.svg";
import Navbar from "../components/Navbar";
import useScrollAnimation from "../utils/useScrollAnimation";

export default function Header() {
  useScrollAnimation();

  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = window.innerHeight;
      setShowNavbar(window.scrollY <= headerHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="header"
      className="relative h-screen w-full overflow-hidden bg-[#0f0e0e] text-white transition-all duration-500 ease-in-out"
    >
      {/* Navbar */}
      {showNavbar && <Navbar />}

      {/* Name Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-80, 0, 0, -80] }}
        transition={{ duration: 8, ease: "easeInOut" }}
        className="absolute top-8 left-4 md:left-10 text-4xl sm:text-5xl md:text-6xl font-cinzel tracking-tight text-[#d5cdc4]"
      >
        {" "}
        <FcMusic />
        Sudarshan <br /> Hingalje
      </motion.h1>

      {/* Developer Title + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6.2, duration: 1.8, ease: "easeOut" }}
        className="absolute top-[32%] left-4 md:left-10 flex flex-col items-start space-y-6 sm:space-y-8"
      >
        <p className="text-2xl sm:text-5xl md:text-6xl lg:text-[7vw] xl:text-[8vw] font-cinzel leading-tight text-[#e7e1da]">
          Full Stack <br />
          <span className="text-[#ffc857] text-4xl sm:text-6xl md:text-[8vw] font-extrabold">
            Developer
          </span>
        </p>

        <a
          href="#about"
          className="bg-[#ffc857] hover:bg-[#ffb347] text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl transition duration-300 shadow-md"
        >
          Contact Me
        </a>
      </motion.div>

      {/* Avatar Image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 7.5, duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
      >
        <img
          src={avatar}
          alt="Avatar"
          className="w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px] xl:w-[260px] max-w-[80vw] h-auto object-contain"
        />
      </motion.div>
    </section>
  );
}
