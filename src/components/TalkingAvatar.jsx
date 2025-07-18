// ✅ TalkingAvatar.jsx
import { useEffect, useState } from "react";
import avatarImg from "../assets/yoga.svg";
import "../styles/index.css";

const TalkingAvatar = ({ isSpeaking, message }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (isSpeaking && message) {
      setCurrentMessage(message);
    } else {
      setCurrentMessage("");
    }
  }, [isSpeaking, message]);

  return (
    <div className="relative flex flex-col items-center mt-10">
      {/* Speech bubble */}
      {currentMessage && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg p-3 text-sm shadow-lg w-64 text-gray-800">
          {currentMessage}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-b border-gray-300"></div>
        </div>
      )}

      {/* Avatar */}
      <img
        src={avatarImg}
        alt="avatar"
        className={`w-32 h-32 object-cover rounded-full transition-transform duration-300 ${
          isSpeaking ? "animate-talk scale-105" : "animate-bounce"
        }`}
      />
    </div>
  );
};

export default TalkingAvatar;
