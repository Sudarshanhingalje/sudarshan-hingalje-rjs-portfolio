import confetti from "canvas-confetti";
import { Check } from "lucide-react";
import { useRef, useState } from "react";

/**
 * DownloadButton
 * Dribbble-style 3D download button with glassmorphism → morph-to-circle loader → confetti + tick → reset.
 */
export default function DownloadButton({
  resumeUrl = "https://drive.google.com/uc?export=download&id=1paE8KgxZGv3nfP2YxYpSy1SJGL7cS86V",
  fileName = "Sudarshan_Hingalje_Resume.pdf",
  onDownloadStart,
  onDownloadComplete,
}) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef(null);

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDownload = () => {
    if (downloading) return;

    setDownloading(true);
    setProgress(0);
    setCompleted(false);
    onDownloadStart?.();
    triggerDownload();

    const progressSteps = [0, 25, 45, 65, 85, 100];
    let index = 0;

    intervalRef.current = setInterval(() => {
      setProgress(() => {
        const next = progressSteps[index];
        index++;

        if (index >= progressSteps.length) {
          clearInterval(intervalRef.current);
          setCompleted(true);

          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });

          onDownloadComplete?.();

          setTimeout(() => {
            setDownloading(false);
            setProgress(0);
            setCompleted(false);
          }, 1800);
        }

        return next;
      });
    }, 500);
  };

  const progressAngle = (progress / 100) * 360;

  return (
    <button
      type="button"
      onClick={handleDownload}
      aria-label="Download Sudarshan Hingalje resume PDF"
      title="Download Sudarshan Hingalje Resume"
      className={`
        relative select-none overflow-hidden flex items-center justify-center
        transition-all duration-700 ease-in-out
        ${
          downloading
            ? "w-20 h-20 rounded-full"
            : "w-52 h-14 rounded-[30px] px-6"
        }
        backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/30
        shadow-[inset_2px_2px_5px_rgba(255,255,255,0.4),inset_-2px_-2px_6px_rgba(0,0,0,0.25)]
        hover:scale-[1.05] hover:shadow-xl text-white font-bold tracking-wide
      `}
    >
      {/* Button Label */}
      <span
        className={`transition-opacity duration-300 z-10 text-sm
          ${downloading ? "opacity-0" : "opacity-100"}`}
      >
        Download Resume
      </span>

      {/* Loader State */}
      {downloading && (
        <>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-white/5 animate-gloss pointer-events-none" />

          {/* Circular Progress Ring */}
          <svg
            className="absolute w-full h-full rotate-[-90deg] pointer-events-none"
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
              style={{ transition: "stroke-dasharray 0.3s ease-out" }}
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            />
          </svg>

          {/* Percentage or Checkmark */}
          <span className="absolute inset-0 flex items-center justify-center z-10 text-white font-bold text-sm">
            {completed ? (
              <Check className="text-green-400 animate-bounce" size={22} />
            ) : (
              `${progress}%`
            )}
          </span>
        </>
      )}
    </button>
  );
}
