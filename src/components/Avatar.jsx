// src/components/Avatar.jsx
import { useEffect, useRef, useState } from "react";
import avatarImg from "../assets/yoga.svg";

const promptText = `👋 Hi! My name is Sudarshan Hingalje.
I'm a Full Stack Developer.
Spin the Sudarshan chakra to know more about my journey!`;

const Avatar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (isHovered && !hasSpoken.current) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(promptText);
      synth.speak(utterance);
      hasSpoken.current = true;

      utterance.onend = () => {
        hasSpoken.current = false; // Allow speaking again next hover
      };
    }
  }, [isHovered]);

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={avatarImg}
        alt="Sudarshan Avatar"
        className="w-40 h-40 rounded-full z-10 border-4 border-white shadow-xl"
      />

      {/* Bubble */}
      <div
        className={`absolute z-20 -top-10 left-[105%] min-w-[250px] bg-white text-black p-4 rounded-xl shadow-lg transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-sm leading-snug whitespace-pre-line">{promptText}</p>
        {/* Triangle */}
        <div className="absolute -left-2 top-5 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-white" />
      </div>
    </div>
  );
};

export default Avatar;
