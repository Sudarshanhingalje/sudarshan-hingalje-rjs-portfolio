import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import Navbar from "../components/Navbar";
import TalkingAvatar from "../components/TalkingAvatar";
import TalkingBubble from "../components/TalkingBubble";
import { getResumeLink } from "../data/Resume/getResumeLink";
import useScrollAnimation from "../utils/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  useScrollAnimation();
  const resumeUrl = getResumeLink();
  const [showNavbar, setShowNavbar] = useState(true);
  const message = "👋 Hi, I'm Sudarshan! I'm a full stack developer.";
  const [isSpeaking, setIsSpeaking] = useState(true);

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
      className="relative h-screen w-full overflow-hidden bg-[#fffffff4]"
    >
      <div className="absolute inset-0 z-0 bg-grid-pattern" />
      {showNavbar && <Navbar />}

      <motion.h1
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-80, 0, 0, -80] }}
        transition={{ duration: 8 }}
        className="absolute top-6 left-4 md:left-10 text-4xl md:text-5xl font-cinzel text-[#d5cdc4] z-10"
      >
        Sudarshan <br /> Hingalje
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6.2, duration: 1.8 }}
        className="absolute top-[30%] left-4 right-4 md:left-10 flex flex-col items-start space-y-6 z-10"
      >
        <p className="text-3xl sm:text-5xl font-cinzel text-[#a994fb]">
          Full Stack <br />
          <span className="text-[#ffc857] text-4xl font-extrabold">
            Developer
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#about"
            className="bg-[#ffc857] text-black px-6 py-3 rounded-full text-lg shadow-md"
          >
            Contact Me
          </a>
          <a
            href={resumeUrl}
            download
            className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 shadow-md"
          >
            <FaDownload />
            Download CV
          </a>
        </div>
      </motion.div>

      <TalkingBubble message={message} />
      <TalkingAvatar isSpeaking={isSpeaking} />
    </section>
  );
}
