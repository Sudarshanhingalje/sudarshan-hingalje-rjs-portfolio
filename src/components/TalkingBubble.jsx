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
      className="relative z-50 max-w-[90vw] sm:max-w-sm md:max-w-md lg:max-w-lg bg-[#fefefe] text-black px-4 py-3 rounded-xl shadow-xl transition-all duration-300 ease-in-out border border-gray-300"
      style={{
        overflowWrap: "break-word",
        wordBreak: "break-word",
        minHeight: "60px",
        fontFamily: "'Fira Code', 'Courier New', monospace",
        fontSize: "0.95rem",
        lineHeight: "1.5",
        whiteSpace: "pre-wrap",
      }}
    >
      <p className="whitespace-pre-wrap break-words">{displayedText}</p>

      {/* Triangle pointer */}
      <div className="absolute bottom-2 left-[-14px] w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] border-r-[#fefefe]" />
    </div>
  );
}
