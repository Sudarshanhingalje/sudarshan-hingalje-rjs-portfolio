// Header.jsx
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import avatar from "../assets/yoga.svg";
import Navbar from "../components/Navbar";
import TalkingBubble from "../components/TalkingBubble";
import { getResumeLink } from "../data/Resume/getResumeLink";
import useScrollAnimation from "../utils/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const speechText = `Hi, I'm Sudarshan. My codeword is Paradox. I'm a Full Stack Developer. Let's spin the Sudarshan Chakra to explore my journey through coding, learning, and life!`;

export default function Header() {
  useScrollAnimation();
  const resumeUrl = getResumeLink();
  const [showNavbar, setShowNavbar] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const [robotVoice, setRobotVoice] = useState(null);

  // Load robot voice once
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const selected =
        voices.find((v) => v.name.includes("Microsoft David")) ||
        voices.find((v) => v.name.includes("Google UK English Male")) ||
        voices.find((v) => v.lang === "en-US");

      setRobotVoice(selected || null);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    } else {
      loadVoices();
    }

    return () =>
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  const speakText = () => {
    const synth = window.speechSynthesis;
    if (!synth.speaking) {
      const utterance = new SpeechSynthesisUtterance(speechText);
      if (robotVoice) utterance.voice = robotVoice;
      utterance.rate = 0.95;
      utterance.pitch = 0.8;
      synth.cancel();
      synth.speak(utterance);
    }
  };

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
      className="bg-grid-pattern relative h-screen w-full font-cinzel text-white overflow-hidden bg-sky-950"
    >
      <div className="absolute inset-0 z-0 bg-grid-pattern" />

      {showNavbar && <Navbar />}

      <motion.h1
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-80, 0, 0, -80] }}
        transition={{ duration: 8, ease: "easeInOut" }}
        className="absolute top-6 left-4 md:left-10 text-3xl sm:text-4xl md:text-5xl font-cinzel tracking-tight text-[#d5cdc4] z-10"
      >
        Sudarshan <br /> Hingalje
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6.2, duration: 1.8, ease: "easeOut" }}
        className="absolute top-[30%] left-4 right-4 md:left-10 md:right-auto flex flex-col items-start space-y-6 sm:space-y-8 z-10"
      >
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[6vw] xl:text-[7vw] font-cinzel leading-tight text-[#a994fb]">
          Full Stack <br />
          <span className="text-[#ffc857] text-4xl sm:text-5xl md:text-[7vw] font-extrabold">
            Developer
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={resumeUrl}
            download
            className="flex items-center justify-center gap-2 bg-white hover:bg-red-500 text-black font-medium px-6 py-3 rounded-full text-lg sm:text-xl transition duration-300 shadow-md"
          >
            <FaDownload />
            Download CV
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div
          className="relative w-fit h-fit"
          onMouseEnter={() => {
            setShowBubble(true);
            speakText();
          }}
          onMouseLeave={() => {
            setShowBubble(false);
            window.speechSynthesis.cancel();
          }}
        >
          <img
            src={avatar}
            alt="Avatar"
            className="w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px] xl:w-[260px] max-w-[80vw] h-auto object-contain"
          />
          {showBubble && (
            <div className="absolute -top-16 left-full ml-4">
              <TalkingBubble message={speechText} />
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
