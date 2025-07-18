// src/components/TalkingBubble.jsx
import { useEffect, useState } from "react";

export default function TalkingBubble({ message }) {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < message.length) {
        setDisplayedText((prev) => prev + message[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50); // 50ms per letter
    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="absolute bottom-[100px] left-1/2 transform -translate-x-1/2 z-10 max-w-[300px] sm:max-w-[400px] bg-white text-black px-4 py-3 rounded-xl shadow-xl text-center relative">
      <p className="text-base sm:text-lg font-medium leading-snug">
        {displayedText}
      </p>
      <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-[15px] border-t-white border-x-[15px] border-x-transparent" />
    </div>
  );
}
