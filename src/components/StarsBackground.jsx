// GalaxyBackground.jsx
import { useEffect, useRef, useState } from "react";

const YOUTUBE_VIDEOS = [
  "940JHPAqrZM", // NASA Earth from Space
  "r-TPJDQSqv0", // Space ambient video
  "aJRYG93boKc", // Earth from Space - 24/7 live
];

export default function GalaxyBackground() {
  const iframeRef = useRef();
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex((prevIndex) => (prevIndex + 1) % YOUTUBE_VIDEOS.length);
    }, 5 * 60 * 1000); // Switch every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const currentVideo = YOUTUBE_VIDEOS[videoIndex];

  return (
    <div className="fixed inset-0 -z-20 w-full h-full overflow-hidden">
      <iframe
        key={currentVideo}
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${currentVideo}`}
        title="LIVE Space Stream"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        className="w-full h-full object-cover"
      ></iframe>
      <div className="absolute inset-0 bg-black/40 z-10" />{" "}
      {/* Optional dark overlay */}
    </div>
  );
}
