import { useRef, useState } from "react";

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

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            setDownloading(false);
            setProgress(0);
          }, 800);
        }
        return Math.min(prev + 5, 100);
      });
    }, 100);

    const link = document.createElement("a");
    link.href = resumeLink;
    link.setAttribute("download", "Sudarshan_Hingalje_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const progressAngle = (progress / 100) * 360;

  return (
    <button
      onClick={handleDownload}
      className={`relative flex items-center justify-center text-white font-medium overflow-hidden transition-all duration-500 ease-in-out
        ${
          downloading
            ? "w-16 h-16 rounded-full"
            : "w-44 h-12 rounded-full bg-blue-500 hover:bg-blue-600"
        }
      `}
    >
      <span
        className={`z-10 transition-opacity duration-300 ${
          downloading ? "opacity-0" : "opacity-100"
        }`}
      >
        Download CV
      </span>

      {downloading && (
        <>
          <svg
            className="absolute w-full h-full rotate-[-90deg]"
            viewBox="0 0 36 36"
          >
            {/* Light ring background */}
            <path
              className="text-white"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            />
            {/* Progress arc in same blue */}
            <path
              className="text-blue-500"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={`${progressAngle}, 360`}
              fill="none"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
            />
          </svg>
          <span className="text-sm font-bold z-10">{progress}%</span>
        </>
      )}
    </button>
  );
};

export default DownloadButton;
