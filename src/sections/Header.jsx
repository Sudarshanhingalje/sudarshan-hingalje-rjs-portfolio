import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import avatar from "../assets/yoga.svg";
import DownloadButton from "../components/DownloadButton";
import GalaxyBackground from "../components/GalaxyBackground";
import Navbar from "../components/Navbar";
import StarsBackground from "../components/StarsBackground";
import TalkingBubble from "../components/TalkingBubble";
import { getResumeLink } from "../data/Resume/getResumeLink";
import useModernScrollReveal from "../hooks/useModernScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const speechText = `HELLO I'm Sudarshan. My codeword is Paradox. I'm a Full Stack Developer. Let's spin the Sudarshan Chakra to explore my journey through coding, learning, and life!`;

export default function Header() {
  useModernScrollReveal();
  const resumeUrl = getResumeLink();
  const [showNavbar, setShowNavbar] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const [robotVoice, setRobotVoice] = useState(null);

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
      data-speed="1"
      className="relative h-screen w-full font-cinzel overflow-hidden transition-colors duration-500 bg-white text-black dark:bg-black dark:text-white"
    >
      <div className="absolute inset-0 z-0 bg-grid-pattern" />
      <GalaxyBackground />
      <StarsBackground />
      {showNavbar && <Navbar />}

      <motion.h1
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-80, 0, 0, -80] }}
        transition={{ duration: 8, ease: "easeInOut" }}
        className="absolute top-6 left-4 md:left-10 text-3xl sm:text-4xl md:text-5xl font-cinzel tracking-tight text-neutral-800 dark:text-[#d5cdc4] z-10"
      >
        Sudarshan <br /> Hingalje
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6.2, duration: 1.8, ease: "easeOut" }}
        className="absolute top-[30%] left-4 right-4 md:left-10 md:right-auto flex flex-col items-start space-y-6 sm:space-y-8 z-10"
      >
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[6vw] xl:text-[7vw] font-cinzel leading-tight text-[#7b51f0] dark:text-[#a994fb]">
          Full Stack <br />
          <span className="text-[#ffc857] dark:text-[#fbd85d] text-4xl sm:text-5xl md:text-[7vw] font-extrabold">
            Developer
          </span>
        </p>
        <DownloadButton resumeUrl={resumeUrl} />
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
            id="avatar-img"
            src={avatar}
            alt="Avatar"
            className="avatar-image w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px] xl:w-[260px] max-w-[80vw] h-auto object-contain"
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
