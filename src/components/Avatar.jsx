import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import avatarImg from "../assets/avatar.svg";

const Avatar = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  const prompt =
    "Hello, I’m Sudarshan. A Full Stack Developer. Spin the Sudarshan Chakra to explore my journey through coding, learning, and life!";

  const speak = () => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(prompt);

    const voices = synth.getVoices();
    const preferredVoice = voices.find(
      (v) => v.name.includes("Google") || v.lang === "en-US"
    );
    if (preferredVoice) utter.voice = preferredVoice;

    utter.rate = 1;
    utter.pitch = 1;
    synth.cancel(); // Cancel ongoing speech
    synth.speak(utter);
  };

  // Speak + show arrow on hover
  useEffect(() => {
    if (showBubble) {
      speak();
      setShowArrow(true);
      const timeout = setTimeout(() => setShowArrow(false), 1000); // hide arrow after 1s
      return () => clearTimeout(timeout);
    }
  }, [showBubble]);

  return (
    <div
      className="relative w-fit group"
      onMouseEnter={() => setShowBubble(true)}
      onMouseLeave={() => setShowBubble(false)}
    >
      <img
        src={avatarImg}
        alt="Sudarshan Avatar"
        className="w-32 h-32 hover:animate-spin transition-transform duration-500"
      />

      {/* 💬 Bubble */}
      {showBubble && (
        <div className="absolute -top-12 left-32 bg-white text-black px-4 py-2 rounded-lg shadow-lg text-sm w-64 z-10">
          <div className="absolute -left-3 top-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white"></div>
          👋 Hi! I’m Sudarshan Hingalje, a Full Stack Developer.
          <br />
          <strong>Spin the Chakra to explore my journey!</strong>
        </div>
      )}

      {/* 🔁 Arrow pointing to Chakra (shows for 1s) */}
      <AnimatePresence>
        {showArrow && (
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-36 top-8 text-yellow-400 text-xl"
          >
            <FaArrowRight />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Avatar;
