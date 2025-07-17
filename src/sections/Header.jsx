import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import avatar from "../assets/yoga.svg";
import Navbar from "../components/Navbar";
import { getResumeLink } from "../data/Resume/getResumeLink";
import useScrollAnimation from "../utils/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  useScrollAnimation();
  const resumeUrl = getResumeLink();
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
      className="relative h-screen w-full text-white overflow-hidden bg-[#7e53f5]"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 bg-grid-pattern" />

      {showNavbar && <Navbar />}

      {/* Name Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-80, 0, 0, -80] }}
        transition={{ duration: 8, ease: "easeInOut" }}
        className="absolute top-6 left-4 md:left-10 text-3xl sm:text-4xl md:text-5xl font-cinzel tracking-tight text-[#d5cdc4] z-10"
      >
        Sudarshan <br /> Hingalje
      </motion.h1>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6.2, duration: 1.8, ease: "easeOut" }}
        className="absolute top-[30%] left-4 right-4 md:left-10 md:right-auto flex flex-col items-start space-y-6 sm:space-y-8 z-10"
      >
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[6vw] xl:text-[7vw] font-cinzel leading-tight text-[#e7e1da]">
          Full Stack <br />
          <span className="text-[#ffc857] text-4xl sm:text-5xl md:text-[7vw] font-extrabold">
            Developer
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#about"
            className="bg-[#ffc857] hover:bg-[#ffb347] text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl transition duration-300 shadow-md text-center"
          >
            Contact Me
          </a>

          <a
            href={resumeUrl}
            download
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black font-medium px-6 py-3 rounded-full text-lg sm:text-xl transition duration-300 shadow-md"
          >
            <FaDownload />
            Download CV
          </a>
        </div>
      </motion.div>

      {/* Avatar */}
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
