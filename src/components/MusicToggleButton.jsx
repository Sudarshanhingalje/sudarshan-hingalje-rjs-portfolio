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
        className="text-3xl p-2 text-white focus:outline-none"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <HiMiniMusicalNote /> : <FcMusic />}
      </button>
    </>
  );
}
