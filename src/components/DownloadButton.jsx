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
          }, 1000);
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
      className={`relative transition-all duration-500 ease-in-out overflow-hidden text-white font-medium flex items-center justify-center ${
        downloading ? "w-14 h-14 rounded-full" : "w-40 h-12 rounded-md px-4"
      } bg-blue-600 hover:bg-blue-700`}
    >
      {/* Normal Text */}
      {!downloading && <span className="z-10">Download CV</span>}

      {/* Circular progress + percentage */}
      {downloading && (
        <>
          <svg
            className="absolute w-14 h-14 rotate-[-90deg] z-0"
            viewBox="0 0 36 36"
          >
            <path
              className="text-blue-500"
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
          <span className="text-sm font-semibold z-10">{progress}%</span>
        </>
      )}
    </button>
  );
};

export default DownloadButton;
