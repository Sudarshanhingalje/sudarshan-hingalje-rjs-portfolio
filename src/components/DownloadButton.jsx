import { useState, useEffect, useRef } from "react";

const DownloadButton = () => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const resumeLink =
    "https://drive.google.com/uc?export=download&id=1paE8KgxZGv3nfP2YxYpSy1SJGL7cS86V";

  const handleDownload = () => {
    if (downloading) return;

    setDownloading(true);
    setProgress(0);

    // Simulate download progress
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            setDownloading(false);
            setProgress(0);
          }, 1000);
        }
        return Math.min(prev + 10, 100);
      });
    }, 150);

    // Actual file download
    const link = document.createElement("a");
    link.href = resumeLink;
    link.setAttribute("download", "Sudarshan_Hingalje_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const progressAngle = (progress / 100) * 360;

  return (
    <button
      onClick={handleDownload}
      className={`relative w-36 h-12 text-white font-medium transition-all duration-300 ease-in-out ${
        downloading
          ? "rounded-full w-12 h-12 p-0"
          : "rounded-lg bg-blue-600 hover:bg-blue-700"
      } flex items-center justify-center overflow-hidden`}
    >
      {/* Download text (hide when downloading) */}
      {!downloading && <span>Download CV</span>}

      {/* Circular progress loader */}
      {downloading && (
        <>
          <svg
            className="absolute w-12 h-12 rotate-[-90deg]"
            viewBox="0 0 36 36"
          >
            <path
              className="text-gray-300"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            />
            <path
              className="text-white"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={`${progressAngle}, 360`}
              fill="none"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            />
          </svg>
          <span className="text-xs font-semibold z-10">{progress}%</span>
        </>
      )}
    </button>
  );
};

export default DownloadButton;
