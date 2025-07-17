import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FcMusic } from "react-icons/fc";
import { HiMiniMusicalNote } from "react-icons/hi2";
import bgImage from "../assets/brand.svg";
import suzume from "../assets/suzume.mp3";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.6;
      audio.play().catch((err) => {
        console.warn("Autoplay failed:", err);
      });
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 5, ease: "easeOut" }}
      className="w-full fixed top-0 left-0 flex items-center justify-between px-4 md:px-8 py-3 z-30 bg-transparent"
    >
      {/* ✅ Hidden audio element */}
      <audio ref={audioRef} src={suzume} loop preload="auto" />

      <div className="text-white text-lg md:text-xl font-bold tracking-wide font-cinzel underline">
        <em>Sudarshan Hingalje</em>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleMusic}
          className="text-2xl focus:outline-none hover:scale-110 transition-transform duration-300"
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <HiMiniMusicalNote className="text-[#ffc857]" />
          ) : (
            <FcMusic />
          )}
        </button>

        <button
          onClick={() => window.location.reload()}
          className="focus:outline-none"
        >
          <img
            src={bgImage}
            alt="Logo"
            className="h-10 md:h-16 object-contain cursor-pointer"
          />
        </button>
      </div>
    </motion.nav>
  );
}
