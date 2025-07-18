import { useEffect, useRef, useState } from "react";

const AvatarSpeaker = () => {
  const avatarRef = useRef(null);
  const [hasSpoken, setHasSpoken] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const checkIfAvatarVisible = () => {
      if (!avatarRef.current) return false;
      const rect = avatarRef.current.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    const speakOnce = () => {
      if (hasSpoken || !checkIfAvatarVisible()) return;

      const utterance = new SpeechSynthesisUtterance(
        "Hi there! Welcome to my portfolio. Let's explore together."
      );
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      synthRef.current.speak(utterance);

      utteranceRef.current = utterance;
      setHasSpoken(true);

      document.getElementById("speech-bubble").style.opacity = 1;
    };

    const stopOnScroll = () => {
      if (synthRef.current.speaking) {
        synthRef.current.cancel();
        document.getElementById("speech-bubble").style.opacity = 0;
      }
    };

    const onLoad = () => {
      setTimeout(() => {
        speakOnce();
      }, 800); // Delay for header and avatar to be fully loaded
    };

    window.addEventListener("load", onLoad);
    window.addEventListener("scroll", stopOnScroll);

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("scroll", stopOnScroll);
    };
  }, [hasSpoken]);

  return (
    <div className="relative flex flex-col items-center mt-10">
      <div ref={avatarRef} className="avatar">
        <img
          src="/assets/avatar.png"
          alt="Avatar"
          className="w-32 h-32 rounded-full"
        />
        <div
          id="speech-bubble"
          className="absolute top-0 left-full ml-4 p-3 text-sm text-black bg-white rounded-lg shadow transition-opacity duration-300 opacity-0"
        >
          👋 Hi there! Welcome to my portfolio.
        </div>
      </div>
    </div>
  );
};

export default AvatarSpeaker;
