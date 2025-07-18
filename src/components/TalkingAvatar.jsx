// ✅ Updated TalkingAvatar.jsx
import { useEffect, useRef, useState } from "react";
import "../styles/index.css";

const message = "Hello! I'm Sudarshan Hingalje, a Full Stack Developer.";

const TalkingAvatar = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const hasSpoken = useRef(false);
  const avatarRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Typing Effect
  useEffect(() => {
    let observer;
    let typingInterval;
    let utterance;

    const handleSpeak = () => {
      if (hasSpoken.current || synthRef.current.speaking) return;

      hasSpoken.current = true;
      utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "en-US";
      utterance.rate = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
        let index = 0;
        setDisplayedText("");
        typingInterval = setInterval(() => {
          setDisplayedText((prev) => prev + message[index]);
          index++;
          if (index >= message.length) clearInterval(typingInterval);
        }, 50);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        clearInterval(typingInterval);
      };

      synthRef.current.cancel();
      synthRef.current.speak(utterance);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleSpeak();
        }
      },
      { threshold: 0.6 }
    );

    if (avatarRef.current) {
      observer.observe(avatarRef.current);
    }

    const stopSpeaking = () => {
      if (synthRef.current.speaking) synthRef.current.cancel();
      setIsSpeaking(false);
      hasSpoken.current = true;
    };

    window.addEventListener("scroll", stopSpeaking);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", stopSpeaking);
      if (synthRef.current.speaking) synthRef.current.cancel();
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center mt-4" ref={avatarRef}>
      {isSpeaking && (
        <div className="mt-2 px-4 py-2 rounded-lg bg-white text-black shadow-md max-w-xs text-center text-sm">
          {displayedText}
          <span className="blinking-cursor">|</span>
        </div>
      )}
    </div>
  );
};

export default TalkingAvatar;
