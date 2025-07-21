import confetti from "canvas-confetti";
import { Check } from "lucide-react";
import { useRef, useState } from "react";
import clickSound from "../assets/click.mp3"; // 🎵 add any sound
import resumePDF from "../assets/Sudarshan_Hingalje_Resume.pdf"; // Local resume fallback

const DownloadButton = () => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const handleDownload = () => {
    if (downloading) return;

    setDownloading(true);
    setProgress(0);
    setCompleted(false);

    // Simulate progress
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setCompleted(true);
          playEffects();
          setTimeout(() => {
            triggerDownload();
            setDownloading(false);
            setProgress(0);
            setCompleted(false);
          }, 1200);
        }
        return Math.min(prev + 2, 100);
      });
    }, 100);
  };

  const triggerDownload = () => {
    setTimeout(() => {
      const link = document.createElement("a");
      link.href =
        "https://drive.google.com/uc?export=download&id=1paE8KgxZGv3nfP2YxYpSy1SJGL7cS86V" ||
        resumePDF;
      link.setAttribute("download", "Sudarshan_Hingalje_Resume.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 3000); // ⏱️ delay before actual download
  };

  const playEffects = () => {
    // 🔊 Play sound
    audioRef.current?.play();
    // 🎉 Confetti
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const progressAngle = (progress / 100) * 360;

  return (
    <>
      <audio ref={audioRef} src={clickSound} preload="auto" />
      <button
        onClick={handleDownload}
        className={`relative flex items-center justify-center transition-all duration-700 ease-in-out overflow-hidden
        ${downloading ? "w-20 h-20 rounded-full" : "w-48 h-14 rounded-2xl"}
        backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/30
        shadow-[inset_2px_2px_5px_rgba(255,255,255,0.3),inset_-2px_-2px_6px_rgba(0,0,0,0.2)]
        hover:scale-105 hover:shadow-xl
      `}
      >
        {/* Text */}
        <span
          className={`z-10 text-white font-semibold transition-opacity ${
            downloading ? "opacity-0" : "opacity-100"
          }`}
        >
          Download CV
        </span>

        {/* Circle Progress */}
        {downloading && (
          <>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-white/5 animate-gloss" />
            <svg
              className="absolute w-full h-full rotate-[-90deg]"
              viewBox="0 0 36 36"
            >
              <path
                className="text-white/20"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
              />
              <path
                className="text-green-400"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${progressAngle}, 360`}
                fill="none"
                style={{ transition: "stroke-dasharray 0.6s ease-out" }}
                d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
              />
            </svg>
            <span className="z-10 text-white font-bold text-sm">
              {completed ? (
                <Check className="text-green-400 animate-bounce" size={22} />
              ) : (
                `${progress}%`
              )}
            </span>
          </>
        )}
      </button>
    </>
  );
};

export default DownloadButton;
