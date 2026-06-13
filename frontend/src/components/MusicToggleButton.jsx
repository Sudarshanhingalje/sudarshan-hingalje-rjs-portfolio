// src/components/MusicToggleButton.jsx
import { useRef, useState } from "react";
import { FcMusic } from "react-icons/fc";
import { HiMiniMusicalNote } from "react-icons/hi2";

export default function MusicToggleButton() {
  const [isPlaying, setIsPlaying] = useState(false); // default is false (off)
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((err) => {
        console.warn("Play blocked:", err);
      });
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src="/suzume.mp3" loop preload="auto" />
      <button
        onClick={toggleMusic}
        className={`
          fixed z-50 right-6
          w-12 h-12 rounded-full
          flex items-center justify-center
          transition-all duration-300
          border dark:border-neutral-700 border-neutral-300
          bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md
          text-neutral-900 dark:text-neutral-100
          shadow-md hover:shadow-lg
          hover:scale-110 active:scale-95
        `}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <HiMiniMusicalNote className="text-xl" />
        ) : (
          <FcMusic className="text-xl" />
        )}
      </button>
    </>
  );
}
