import confetti from "canvas-confetti";
import { useRef, useState } from "react";

const DownloadButton = () => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef(null);

  const resumeLink =
    "https://drive.google.com/uc?export=download&id=1paE8KgxZGv3nfP2YxYpSy1SJGL7cS86V";

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = resumeLink;
    link.setAttribute("download", "Sudarshan_Hingalje_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDownload = () => {
    if (downloading) return;

    setDownloading(true);
    setProgress(0);
    setCompleted(false);

    triggerDownload(); // start download immediately

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setCompleted(true);

          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });

          setTimeout(() => {
            setDownloading(false);
            setProgress(0);
            setCompleted(false);
          }, 2000);
        }
        return Math.min(prev + 2, 100);
      });
    }, 100);
  };

  const progressAngle = (progress / 100) * 360;

  return (
    <button
      onClick={handleDownload}
      className={`relative transition-all duration-500 ease-in-out 
        ${downloading ? "w-14 h-14 rounded-full" : "w-40 h-12 rounded-xl"} 
        bg-white/10 backdrop-blur-md text-white font-semibold 
        flex items-center justify-center overflow-hidden border border-white/20 shadow-xl
      `}
    >
      {/* When downloading, show ring + percent */}
      {downloading ? (
        <>
          <svg
            className="absolute w-14 h-14 rotate-[-90deg]"
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
              className="text-green-400 transition-all duration-100"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={`${progressAngle}, 360`}
              fill="none"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            />
          </svg>
          {/* Center % or Tick */}
          <span className="text-white text-sm z-10 font-bold">
            {completed ? "✓" : `${progress}%`}
          </span>
        </>
      ) : (
        <span className="z-10">Download CV</span>
      )}

      {/* Optional Shine Animation */}
      {!downloading && (
        <span className="absolute inset-0 before:absolute before:inset-0 before:bg-white/20 before:blur-md before:rounded-xl animate-pulse z-0"></span>
      )}
    </button>
  );
};

export default DownloadButton;
