import { useEffect, useState } from "react";
import avatarImg from "../assets/yoga.svg";
import "../styles/index.css";

const messages = [
  "Hello! I'm your assistant.",
  "I can help you with anything.",
  "Just ask and I’ll be here.",
  "Keep going! You're doing great.",
];

const TalkingAvatar = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Typing Effect
  useEffect(() => {
    const message = messages[currentMessageIndex];
    let charIndex = 0;
    setDisplayedText("");
    const typeInterval = setInterval(() => {
      setDisplayedText((prev) => prev + message[charIndex]);
      charIndex++;
      if (charIndex >= message.length) {
        clearInterval(typeInterval);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [currentMessageIndex]);

  // SpeechSynthesis + Avatar Talk
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(
      messages[currentMessageIndex]
    );
    utterance.lang = "en-US";
    utterance.rate = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 1000); // 1s pause between messages
    };

    speechSynthesis.cancel(); // Clear previous speech
    speechSynthesis.speak(utterance);
  }, [currentMessageIndex]);

  return (
    <div className="relative flex flex-col items-center mt-10">
      <img
        src={avatarImg}
        alt="avatar"
        className={`w-32 h-32 object-cover rounded-full transition-transform duration-300 ${
          isSpeaking ? "animate-talk scale-105" : ""
        }`}
      />
      <div className="mt-4 px-4 py-2 rounded-lg bg-white text-black shadow-md max-w-xs text-center text-sm">
        {displayedText}
        <span className="blinking-cursor">|</span>
      </div>
    </div>
  );
};

export default TalkingAvatar;
