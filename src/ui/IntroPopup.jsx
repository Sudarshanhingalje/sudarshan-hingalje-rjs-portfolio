// IntroPopup.jsx
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const IntroPopup = ({ isOpen, onClose }) => {
  const [showClose, setShowClose] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // Show close button after 5s
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowClose(true), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowClose(false);
      setIsPlaying(true); // reset when closed
    }
  }, [isOpen]);

  // Auto-close when About section is not in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isOpen) {
          onClose();
        }
      },
      { threshold: 0.3 }
    );

    const aboutEl = document.querySelector("#about");
    if (aboutEl) observer.observe(aboutEl);

    return () => {
      if (aboutEl) observer.unobserve(aboutEl);
    };
  }, [isOpen, onClose]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[99] flex items-center justify-center bg-black/40 backdrop-blur-md">
      <Draggable>
        <div
          className="relative w-[320px] sm:w-[480px] aspect-[3/4] bg-contain bg-no-repeat bg-center rounded-[30px] shadow-2xl"
          style={{
            backgroundImage: `url('/assets/ipad 1.png')`, // Or your custom image
            backgroundSize: "100% 100%",
            border: "8px solid #222",
          }}
        >
          {/* ❌ Close */}
          {showClose && (
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-50 p-1 rounded-full text-white bg-red-600 hover:bg-red-400"
            >
              <FiX size={18} />
            </button>
          )}

          {/* 📽️ Video inside tablet screen */}
          <div className="absolute top-[9%] left-[6%] w-[88%] h-[82%] rounded-[20px] overflow-hidden bg-black">
            <video
              ref={videoRef}
              src="/assets/projectvideo.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* 🎛️ Controls inside tablet */}
          <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 z-50 flex gap-3 bg-white/80 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full">
            <button
              onClick={() => skip(-10)}
              className="text-black dark:text-white hover:scale-110 transition"
              title="Rewind 10s"
            >
              <FaBackward />
            </button>
            <button
              onClick={togglePlayPause}
              className="text-black dark:text-white hover:scale-110 transition"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={() => skip(10)}
              className="text-black dark:text-white hover:scale-110 transition"
              title="Forward 10s"
            >
              <FaForward />
            </button>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default IntroPopup;
