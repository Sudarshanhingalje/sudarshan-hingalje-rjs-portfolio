import { useEffect, useRef, useState } from "react";

export default function TalkingBubble({ message }) {
  const [displayedText, setDisplayedText] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    setDisplayedText("");
    let i = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + message[i]);
      i++;
      if (i >= message.length) {
        clearInterval(interval);
      }
    }, 50);

    const speak = () => {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(message);

      const voices = synth.getVoices();
      const robotVoice =
        voices.find((v) => v.name.includes("Microsoft David")) ||
        voices.find((v) => v.name.includes("Google UK English Male")) ||
        voices.find((v) => v.lang === "en-US");

      if (robotVoice) utter.voice = robotVoice;

      utter.rate = 0.95;
      utter.pitch = 0.8;
      synth.cancel();
      synth.speak(utter);
    };

    const speechTimeout = setTimeout(() => speak(), 500);

    return () => {
      clearInterval(interval);
      clearTimeout(speechTimeout);
    };
  }, [message]);

  return (
    <div
      ref={containerRef}
      className="relative z-50 bg-white text-black px-4 py-3 rounded-xl shadow-xl text-left w-[220px] sm:w-[260px] transition-all duration-300 ease-in-out"
      style={{
        overflowWrap: "break-word",
        wordBreak: "break-word",
        minHeight: "50px",
      }}
    >
      <p className="text-sm sm:text-base font-medium leading-snug break-words">
        {displayedText}
      </p>

      {/* Triangle pointer */}
      <div className="absolute bottom-2 left-[-14px] w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] border-r-white" />
    </div>
  );
}
