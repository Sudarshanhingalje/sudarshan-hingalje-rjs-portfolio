// MusicToggleButton.jsx
import { useEffect, useRef, useState } from "react";
import { FcMusic } from "react-icons/fc";
import { HiMiniMusicalNote } from "react-icons/hi2";

export default function MusicToggleButton() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.play().catch((err) => {
      console.warn("Autoplay blocked:", err);
    });
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src="/src/assets/suzume.mp3" loop />
      <button
        onClick={toggleMusic}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          flex items-center justify-center
          bg-gradient-to-br from-purple-500 to-pink-500
          text-white text-3xl shadow-lg
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
