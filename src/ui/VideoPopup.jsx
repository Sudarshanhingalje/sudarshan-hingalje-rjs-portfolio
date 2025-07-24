import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { FiExternalLink, FiX } from "react-icons/fi";

const VideoPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(true);

      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;

      const centerY = scrollY + window.innerHeight / 2 - 160;
      const centerX = scrollX + window.innerWidth / 2 - 170;

      setPosition({ x: centerX, y: centerY });
    }, 20000);

    const closeTimer = setTimeout(() => {
      setShowClose(true);
    }, 25000);

    return () => {
      clearTimeout(popupTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/40">
      <Draggable>
        <div
          className="absolute w-[90%] sm:w-[340px] flex items-stretch rounded-xl shadow-xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
          style={{ top: `${position.y}px`, left: `${position.x}px` }}
        >
          {/* Left label */}
          <div className="flex items-center justify-center px-2 bg-pink-600 text-white">
            <p className="text-[11px] sm:text-[10px] font-bold tracking-wider rotate-[-90deg] whitespace-nowrap">
              PROJECT
            </p>
          </div>

          {/* Main content */}
          <div className="relative flex-1 p-3 text-black dark:text-white">
            {showClose && (
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-1 right-1 z-50 p-1 rounded-full text-red-900 hover:bg-red-200"
              >
                <FiX size={25} />
              </button>
            )}

            {/* Video */}
            <div className="mb-2">
              <video
                src="/assets/projectvideo.mp4"
                className="w-full h-[120px] rounded-lg object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* Title + Link */}
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-semibold text-blue-500 dark:text-blue-300">
                Wild Oasis Website
              </h3>
              <a
                href="https://hotelthe-wild-oasis.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 hover:rotate-45 dark:hover:text-pink-300"
              >
                <FiExternalLink size={16} />
              </a>
            </div>

            {/* Credentials */}
            <p className="text-xs font-medium text-green-600 dark:text-green-300 mb-1">
              test credentials - demo@gmail.com / demo@123
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {["React", "Next.js", "Tailwind", "Supabase"].map(
                (tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 dark:bg-gray-700 text-[10px] text-pink-600 dark:text-pink-300 px-2 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default VideoPopup;
