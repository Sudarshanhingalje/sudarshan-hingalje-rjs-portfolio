import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { FiExternalLink, FiX } from "react-icons/fi";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const BASE_URL = API_URL.replace("/api", "");

const VideoPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Dynamic ad project data
  const [adProject, setAdProject] = useState(null);

  // ── Fetch active ad on mount ────────────────────────────────────────────
  useEffect(() => {
    async function loadAd() {
      try {
        const res = await axios.get(`${API_URL}/settings/ad`);
        if (res.data?.success && res.data.adEnabled && res.data.project) {
          setAdProject(res.data.project);
        }
        // If adEnabled is false, adProject stays null and popup won't show
      } catch {
        // fallback: keep adProject null — popup will be hidden
      }
    }
    loadAd();
  }, []);

  // ── Popup timers (only start once we know ad data is resolved) ──────────
  useEffect(() => {
    if (adProject === undefined) return; // still loading
    // If adProject is null (disabled or no project), don't show
    if (adProject === null) return;

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

    // Auto-close after 70 seconds
    const autoCloseTimer = setTimeout(() => {
      setShowPopup(false);
    }, 70000);

    return () => {
      clearTimeout(popupTimer);
      clearTimeout(closeTimer);
      clearTimeout(autoCloseTimer);
    };
  }, [adProject]);

  if (!showPopup || !adProject) return null;

  // ── Resolve media URL ───────────────────────────────────────────────────
  const rawMedia = adProject.imageUrl || "";
  const mediaUrl = rawMedia
    ? rawMedia.startsWith("http")
      ? rawMedia
      : `${BASE_URL}${rawMedia}`
    : null;

  const isVideo =
    mediaUrl &&
    (mediaUrl.toLowerCase().endsWith(".mp4") ||
      mediaUrl.toLowerCase().endsWith(".webm"));

  const techStack = Array.isArray(adProject.techStack) ? adProject.techStack : [];

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

            {/* Media — video or image */}
            <div className="mb-2">
              {isVideo ? (
                <video
                  src={mediaUrl}
                  className="w-full h-[120px] rounded-lg object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : mediaUrl ? (
                <img
                  src={mediaUrl}
                  alt={adProject.title}
                  className="w-full h-[120px] rounded-lg object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              ) : (
                <div className="w-full h-[120px] rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-xs">
                  No preview
                </div>
              )}
            </div>

            {/* Title + Link */}
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-semibold text-blue-500 dark:text-blue-300">
                {adProject.title}
              </h3>
              {adProject.liveUrl && (
                <a
                  href={adProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 hover:rotate-45 dark:hover:text-pink-300"
                >
                  <FiExternalLink size={16} />
                </a>
              )}
            </div>

            {/* Credentials */}
            {adProject.credentials && (
              <p className="text-xs font-medium text-green-600 dark:text-green-300 mb-1">
                {adProject.credentials}
              </p>
            )}

            {/* Tech Tags */}
            {techStack.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {techStack.slice(0, 5).map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 dark:bg-gray-700 text-[10px] text-pink-600 dark:text-pink-300 px-2 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default VideoPopup;
