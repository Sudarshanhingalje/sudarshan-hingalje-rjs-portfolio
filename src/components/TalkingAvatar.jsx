import { useEffect, useRef, useState } from "react";
import avatarImg from "../assets/yoga.svg";
import "../styles/index.css";

const messages = [
  "Welcome! I am sudarshan .",
  "i am a full stack developer.",
  "Need help? I'm right here!",
];

const TalkingAvatar = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const typingInterval = useRef(null);

  // ✨ Typing effect
  const typeMessage = (fullText) => {
    let index = 0;
    setCurrentMessage("");

    clearInterval(typingInterval.current);
    typingInterval.current = setInterval(() => {
      if (index < fullText.length) {
        setCurrentMessage((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval.current);
      }
    }, 30); // Typing speed
  };

  // 🔊 Speak and type new message
  const speakMessage = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.cancel(); // stop previous
      window.speechSynthesis.speak(utterance);
    }
  };

  // 🧠 Trigger message and speech every time index changes
  useEffect(() => {
    const text = messages[messageIndex];
    typeMessage(text);
    speakMessage(text);

    const next = (messageIndex + 1) % messages.length;
    const timeout = setTimeout(() => setMessageIndex(next), 3000); // Next message after 8s

    return () => {
      clearTimeout(timeout);
      clearInterval(typingInterval.current);
      window.speechSynthesis.cancel();
    };
  }, [messageIndex]);

  return (
    <div className="relative flex flex-col items-center mt-10">
      <div className="relative">
        <img
          src={avatarImg}
          alt="avatar"
          className={`w-32 h-32 object-cover rounded-full transition-all duration-300 ${
            isSpeaking ? "scale-105 shadow-lg" : ""
          }`}
        />
        {currentMessage && (
          <div className="absolute -top-6 -left-10 w-60 p-2 px-4 bg-white text-black text-sm rounded-xl shadow-xl border border-gray-300 animate-fadeIn">
            {currentMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default TalkingAvatar;
