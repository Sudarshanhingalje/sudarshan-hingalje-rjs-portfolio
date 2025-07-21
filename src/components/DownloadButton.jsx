import { Check, CloudDownload } from "lucide-react";
import { useRef, useState } from "react";

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
        transition-all duration-700 ease-[cubic-bezier(0.86,0,0.07,1)]
        ${
          downloading
            ? "w-14 h-14 rounded-full"
            : "w-48 h-14 rounded-2xl px-6 gap-2"
        }

        backdrop-blur-md
        bg-white/30 dark:bg-white/10
        border border-white/20 dark:border-white/10
        hover:shadow-[0_0_18px_rgba(0,255,255,0.3)]
        shadow-[inset_2px_2px_5px_rgba(255,255,255,0.4),inset_-2px_-2px_6px_rgba(0,0,0,0.25)]
        text-white font-semibold tracking-wide
      `}
    >
      {/* Label */}
      <span
        className={`transition-opacity duration-300 z-10 text-sm flex items-center
          ${downloading ? "opacity-0" : "opacity-100"}`}
      >
        <CloudDownload
          size={26}
          className="mr-1 text-cyan-500 dark:text-cyan-400"
        />
        Download Resume
      </span>

      {/* Loader */}
      {downloading && (
        <>
          <div className="absolute inset-0 rounded-full animate-gloss pointer-events-none" />

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
              className="text-green-500 dark:text-emerald-400"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={`${progressAngle}, 360`}
              fill="none"
              style={{
                transition:
                  "stroke-dasharray 0.5s cubic-bezier(0.77, 0, 0.175, 1)",
              }}
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            />
          </svg>

          <span className="absolute inset-0 flex items-center justify-center z-10 text-white font-bold text-sm">
            {completed ? (
              <Check
                className="text-green-500 dark:text-emerald-400 animate-bounce"
                size={22}
              />
            ) : (
              `${progress}%`
            )}
          </span>
        </>
      )}
    </button>
  );
}
