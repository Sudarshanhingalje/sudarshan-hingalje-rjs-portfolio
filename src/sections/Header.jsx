// Header.jsx
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
      className="relative h-screen w-full overflow-hidden bg-[#f5f5f4] dark:bg-[#0e0e0e] text-[#111] dark:text-white transition-colors duration-500"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-10" />

      {/* Navbar */}
      {showNavbar && <Navbar />}

      {/* Name Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-60, 0, 0, -60] }}
        transition={{ duration: 8, ease: "easeInOut" }}
        className="absolute top-8 left-6 md:left-12 text-3xl sm:text-4xl md:text-5xl font-cinzel text-[#b0a9a1] tracking-wider z-10"
      >
        Sudarshan <br /> Hingalje
      </motion.h1>

      {/* Role + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6.2, duration: 1.6, ease: "easeOut" }}
        className="absolute top-[30%] left-6 right-6 md:left-12 flex flex-col space-y-6 sm:space-y-8 z-10"
      >
        <p className="text-3xl sm:text-5xl md:text-6xl lg:text-[6vw] font-cinzel leading-tight tracking-tight">
          Full Stack <br />
          <span className="text-[#6c5ce7] dark:text-[#ffd369] font-extrabold text-4xl sm:text-5xl md:text-[6.5vw]">
            Developer
          </span>
        </p>

        <div className="flex gap-4">
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center gap-2 bg-[#0e0e0e] dark:bg-white text-white dark:text-black hover:bg-[#6c5ce7] hover:dark:bg-[#ffd369] transition-colors duration-300 font-medium px-6 py-3 rounded-full text-lg sm:text-xl shadow-lg"
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
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-full shadow-xl transition-all duration-300">
          <img
            src={avatar}
            alt="Avatar"
            className="w-[100px] sm:w-[140px] md:w-[180px] lg:w-[200px] h-auto object-contain"
          />
        </div>
      </motion.div>
    </section>
  );
}
