import confetti from "canvas-confetti";
import { Check } from "lucide-react";
import { useRef, useState } from "react";

/**
 * DownloadButton
 * Glassmorphism 3D download → morph-to-circle loader → confetti + tick → reset.
 * SEO / Accessibility:
 *  - Use aria-label so assistive tech & crawlers understand the action.
 *  - Fire analytics via optional callbacks.
 *  - Ensure an <a> crawlable link elsewhere in the DOM to the resume (important for SEO!).
 */

export default function DownloadButton({
  resumeUrl = "https://drive.google.com/uc?export=download&id=1paE8KgxZGv3nfP2YxYpSy1SJGL7cS86V",
  fileName = "Sudarshan_Hingalje_Resume.pdf",
  onDownloadStart, // optional callback for analytics
  onDownloadComplete, // optional callback for analytics
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

    const progressSteps = [1, 10, 25, 50, 75, 100];
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
          }, 1500);
        }

        return next;
      });
    }, 600);
  };

  const progressAngle = (progress / 100) * 360;

  return (
    <button
      type="button"
      onClick={handleDownload}
      aria-label="Download Sudarshan Hingalje resume PDF"
      title="Download Sudarshan Hingalje Resume"
      data-event="resume-download"
      className={`bg-red-500 relative flex items-center justify-center transition-all duration-700 ease-in-out overflow-hidden select-none
        ${downloading ? "w-20 h-20 rounded-full" : "w-48 h-14 rounded-2xl px-6"}
        backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/30
        shadow-[inset_2px_2px_5px_rgba(255,255,255,0.3),inset_-2px_-2px_6px_rgba(0,0,0,0.2)]
        hover:scale-105 hover:shadow-xl text-white font-semibold
      `}
    >
      <span
        className={`transition-opacity duration-300 z-10 ${
          downloading ? "opacity-0" : "opacity-100"
        }`}
      >
        Download CV
      </span>

      {downloading && (
        <>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-white/5 animate-gloss pointer-events-none" />

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
              style={{ transition: "stroke-dasharray 0.1s linear" }}
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            />
          </svg>

          <span
            className="absolute inset-0 flex items-center justify-center z-10 text-white font-bold text-sm leading-none"
            aria-live="polite"
          >
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
