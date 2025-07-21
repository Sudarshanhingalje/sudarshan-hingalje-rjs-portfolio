// GalaxyBackground.jsx
import { useEffect, useRef } from "react";

export default function GalaxyBackground() {
  const iframeRef = useRef();

  useEffect(() => {
    return () => {
      // Clean-up if needed
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 w-full h-full overflow-hidden">
      <iframe
        ref={iframeRef}
        src="https://www.youtube.com/embed/0FBiyFpV__g?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=0FBiyFpV__g"
        title="LIVE: Space View - 24/7"
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
