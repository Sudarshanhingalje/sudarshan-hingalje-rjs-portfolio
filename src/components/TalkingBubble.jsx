import { useEffect, useState } from "react";

export default function TalkingBubble({ message }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + message[i]);
      i++;
      if (i >= message.length) clearInterval(interval);
    }, 40); // typing speed

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="relative z-50 max-w-[250px] sm:max-w-[300px] bg-white text-black px-4 py-3 rounded-xl shadow-xl text-left">
      <p className="text-sm sm:text-base font-medium leading-snug whitespace-pre-line">
        {displayedText}
      </p>
      {/* Speech triangle */}
      <div className="absolute bottom-2 left-[-14px] w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] border-r-white" />
    </div>
  );
}
