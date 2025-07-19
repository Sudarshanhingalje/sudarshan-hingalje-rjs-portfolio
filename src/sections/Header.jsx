import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import avatar from "../assets/yoga.svg"; // Replace with your animated SVG
import Navbar from "../components/Navbar";
import { getResumeLink } from "../data/Resume/getResumeLink";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  useEffect(() => {
    // Header scroll hide/show
    const header = document.getElementById("header");
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollY && currentScroll > 80) {
        header.style.transform = "translateY(-100%)";
        header.style.opacity = "0";
      } else {
        header.style.transform = "translateY(0)";
        header.style.opacity = "1";
      }
      lastScrollY = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header"
      className="fixed top-0 w-full z-40 bg-transparent backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 transition-all duration-500"
    >
      <Navbar />

      <section className="pt-24 min-h-screen w-full flex flex-col items-center justify-center gap-8 text-center px-4">
        <motion.img
          src={avatar}
          alt="avatar"
          className="w-40 md:w-56 object-contain about-avatar"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        <motion.h1
          className="text-4xl md:text-6xl font-bold text-neutral-800 dark:text-white"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Hi, I'm Sudarshan Hingalje
        </motion.h1>

        <motion.p
          className="max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-300"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          I’m a Full Stack Developer building modern web experiences using
          React, Next.js, Spring Boot, and 3D/GSAP magic.
        </motion.p>

        <motion.a
          href={getResumeLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-neutral-400 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3 rounded-full text-sm font-semibold text-neutral-900 dark:text-white hover:scale-105 transition-all duration-300"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6 }}
        >
          <FaDownload /> Download Resume
        </motion.a>
      </section>
    </header>
  );
}
