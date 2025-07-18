import { useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import avatarImg from "../assets/yoga.svg"; // replace with your avatar path

const message =
  "Hi, I am Ava! Your personal assistant. Welcome to my portfolio.";

const Header = () => {
  const [showBubble, setShowBubble] = useState(false);
  const avatarRef = useRef(null);
  const hasSpokenRef = useRef(false);
  const speechInstanceRef = useRef(null);

  // 📌 Function to check if avatar is fully in view
  const isAvatarVisible = () => {
    if (!avatarRef.current) return false;
    const rect = avatarRef.current.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  // 📌 Function to trigger speech and bubble
  const speakMessage = () => {
    if (hasSpokenRef.current || !isAvatarVisible()) return;

    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.cancel(); // clear any pending speech
    speechSynthesis.speak(utterance);
    speechInstanceRef.current = utterance;
    setShowBubble(true);
    hasSpokenRef.current = true;

    utterance.onend = () => {
      setShowBubble(false);
    };
  };

  // 📌 On load, delay and check for avatar visibility
  useEffect(() => {
    const checkAndSpeak = () => {
      if (isAvatarVisible()) {
        speakMessage();
      }
    };

    const handleScroll = () => {
      // If scrolled away, stop the speech
      if (!isAvatarVisible()) {
        speechSynthesis.cancel();
        setShowBubble(false);
      }
    };

    // Slight delay to ensure DOM and avatar are loaded
    const delay = setTimeout(checkAndSpeak, 1000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(delay);
      window.removeEventListener("scroll", handleScroll);
      speechSynthesis.cancel();
    };
  }, []);

  return (
    <header
      id="header"
      className="flex items-center justify-center h-screen bg-[#0d0d0d] relative overflow-hidden"
    >
      <div className="relative" ref={avatarRef}>
        <img
          src={avatarImg}
          alt="Avatar"
          className="w-40 h-40 rounded-full border-4 border-white shadow-xl"
        />
        {showBubble && (
          <div className="absolute top-0 left-44 bg-white text-black text-sm px-4 py-2 rounded-xl shadow-md animate-pulse z-10 max-w-xs">
            <p className="flex items-center gap-2">
              <FaRobot className="text-blue-500" /> {message}
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
