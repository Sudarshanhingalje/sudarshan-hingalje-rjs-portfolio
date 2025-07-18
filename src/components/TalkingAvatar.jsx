// TalkingAvatar.jsx
import { useEffect, useRef, useState } from "react";
import "../styles/index.css";

const messages = [
  "Welcome! My name is Sudarshan.",
  "I am a full stack developer.",
  "If you need any help, I'm right here!",
  "To know more about me, spin the wheel.",
];

const TalkingAvatar = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const typingInterval = useRef(null);

  // Typing effect
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
    }, 50);
  };

  // Speak message
  const speakMessage = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  // Change message every 5s
  useEffect(() => {
    const text = messages[messageIndex];
    typeMessage(text);
    speakMessage(text);

    const timeout = setTimeout(() => {
      const next = (messageIndex + 1) % messages.length;
      setMessageIndex(next);
    }, 6000);

    return () => {
      clearTimeout(timeout);
      clearInterval(typingInterval.current);
      window.speechSynthesis.cancel();
    };
  }, [messageIndex]);

  return (
    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-72 z-20">
      <div className="bg-white text-black text-sm px-4 py-2 rounded-xl shadow-lg border border-gray-300 animate-fadeIn">
        {currentMessage}
      </div>
    </div>
  );
};

export default TalkingAvatar;
