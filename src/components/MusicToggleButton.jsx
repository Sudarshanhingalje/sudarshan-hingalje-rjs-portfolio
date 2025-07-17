// src/components/MusicToggleButton.jsx
import { useEffect, useRef, useState } from "react";
import { FcMusic } from "react-icons/fc";
import { HiMiniMusicalNote } from "react-icons/hi2";

export default function MusicToggleButton() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.6;
      audio.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src="/src/assets/suzume.mp3" loop preload="auto" />
      <button
        onClick={toggleMusic}
        className={`
          absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-12 h-12 rounded-full
          flex items-center justify-center
          bg-gradient-to-br from-yellow-500 to-red-500
          text-white text-2xl shadow-lg
          transition-all duration-300
          hover:scale-110 hover:rotate-6 hover:shadow-xl
          active:scale-95
        `}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <HiMiniMusicalNote /> : <FcMusic />}
      </button>
    </>
  );
}
