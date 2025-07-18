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
      if (i >= message.length) clearInterval(interval);
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
    <div className="flex justify-start px-4 sm:px-6 lg:px-8">
      <div
        ref={containerRef}
        className="relative z-50 bg-[#1e1e2f] text-green-300 font-mono px-4 py-3 rounded-xl shadow-lg border border-green-500 
                   w-full max-w-[95%] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px]
                   transition-all duration-300 ease-in-out"
        style={{
          overflowWrap: "break-word",
          wordBreak: "break-word",
          minHeight: "60px",
        }}
      >
        <p className="text-sm sm:text-base font-medium leading-snug whitespace-pre-wrap">
          {displayedText}
        </p>

        {/* Terminal Pointer Arrow */}
        <div className="absolute bottom-2 left-[-14px] w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] border-r-[#1e1e2f]" />
      </div>
    </div>
  );
}
