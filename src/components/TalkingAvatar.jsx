import { useEffect, useState } from "react";
import avatarImg from "../assets/avatar.png"; // 🧑 Replace with your avatar image
import "../index.css"; // For Tailwind + custom animation

const TalkingAvatar = ({ text, isSpeaking }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!isSpeaking) return;
    setDisplayText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text, isSpeaking]);

  return (
    <div className="relative flex flex-col items-center mt-10">
      {/* Avatar */}
      <img
        src={avatarImg}
        alt="avatar"
        className={`w-32 h-32 object-cover rounded-full transition-transform duration-300 ${
          isSpeaking ? "animate-talk scale-105" : "animate-bounce"
        }`}
      />

      {/* Speech Bubble */}
      {isSpeaking && (
        <div className="absolute top-[-60px] w-64 bg-white text-black p-3 rounded-xl border shadow-md animate-fade-in">
          <div className="speech-arrow" />
          <p className="text-sm font-mono leading-snug">{displayText}</p>
        </div>
      )}
    </div>
  );
};

export default TalkingAvatar;
