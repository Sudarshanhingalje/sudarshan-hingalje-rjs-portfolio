import { useEffect, useRef, useState } from "react";

// Your speech message
const speechText = "Hello, I am Sudarshan Hingalje. Welcome to my portfolio.";

const AvatarSpeaker = () => {
  const avatarRef = useRef(null);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  // Function to speak
  const speakOnce = () => {
    if (!hasSpoken && synthRef.current && !synthRef.current.speaking) {
      utteranceRef.current = new SpeechSynthesisUtterance(speechText);
      utteranceRef.current.lang = "en-US";
      utteranceRef.current.rate = 1;
      synthRef.current.speak(utteranceRef.current);
      setShowBubble(true);

      // Hide bubble after 5 seconds
      setTimeout(() => setShowBubble(false), 5000);

      setHasSpoken(true);
    }
  };

  // Stop speech
  const stopSpeaking = () => {
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel();
      setShowBubble(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          speakOnce();
        } else {
          stopSpeaking();
        }
      },
      {
        threshold: 1, // Fully visible
      }
    );

    if (avatarRef.current) observer.observe(avatarRef.current);

    return () => {
      if (avatarRef.current) observer.unobserve(avatarRef.current);
      stopSpeaking();
    };
  }, []);

  return (
    <div ref={avatarRef} className="relative w-fit h-fit">
      {/* Your avatar */}
      <img
        src="/assets/avatar.png"
        alt="Avatar"
        className="w-32 h-32 rounded-full"
      />

      {/* Message bubble */}
      {showBubble && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black text-sm px-4 py-2 rounded-full shadow-lg">
          {speechText}
        </div>
      )}
    </div>
  );
};

export default AvatarSpeaker;
