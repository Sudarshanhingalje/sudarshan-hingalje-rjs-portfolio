import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { FiExternalLink, FiX } from "react-icons/fi";

const VideoPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null;

  return (
    <Draggable>
      <div className="fixed top-10 left-4 z-50 w-[95%] sm:w-[500px] flex items-stretch">
        <div className="hidden sm:flex">
          <div className="bg-black text-white dark:bg-white dark:text-black rounded-l-2xl px-2 flex items-center justify-center">
            <p className="text-2xl font-bold tracking-widest rotate-[-90deg]">
              PROJECTS
            </p>
          </div>
        </div>

        <div className="relative flex-1 bg-black text-white dark:bg-white dark:text-black backdrop-blur-md rounded-2xl p-4 shadow-2xl">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-2 right-2 text-white dark:text-black hover:text-pink-400"
          >
            <FiX size={20} />
          </button>

          <div className="grid grid-cols-3 grid-rows-2 gap-2">
            <video
              src="/assets/projectvideo.mp4"
              className="col-span-3 row-span-2 h-[180px] w-full rounded-lg object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <div className="flex justify-between items-center mt-2">
            <h3 className="text-sm sm:text-base font-semibold text-pink-400">
              Wild Oasis Website
            </h3>
            <a
              href="https://hotelthe-wild-oasis.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400"
            >
              <FiExternalLink size={18} />
            </a>
          </div>

          <div className="flex flex-wrap gap-2 mt-1">
            {["React", "Next.js", "Tailwind", "Supabase"].map((tech, index) => (
              <span
                key={index}
                className="bg-pink-500/20 text-pink-400 text-xs px-2 py-0.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default VideoPopup;
