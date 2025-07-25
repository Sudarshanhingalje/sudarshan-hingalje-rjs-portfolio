import { useEffect, useRef, useState } from "react";

export default function TalkingBubble({ message }) {
  const [displayedText, setDisplayedText] = useState("");
  const containerRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    let i = 0;
    setDisplayedText("");

    // Typing animation
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + message[i]);
      i++;
      if (i >= message.length) clearInterval(typingInterval);
    }, 40);

    // Speak
    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(message);
      const voices = synthRef.current.getVoices();
      const robotVoice =
        voices.find((v) => v.name.includes("Microsoft David")) ||
        voices.find((v) => v.name.includes("Google UK English Male")) ||
        voices.find((v) => v.lang === "en-US");
      if (robotVoice) utterance.voice = robotVoice;
      utterance.rate = 0.95;
      utterance.pitch = 0.8;
      synthRef.current.cancel(); // cancel any existing speech
      synthRef.current.speak(utterance);
    };

    // Load voices and speak
    if (synthRef.current.getVoices().length === 0) {
      const loadVoicesAndSpeak = () => {
        speak();
        synthRef.current.removeEventListener(
          "voiceschanged",
          loadVoicesAndSpeak
        );
      };
      synthRef.current.addEventListener("voiceschanged", loadVoicesAndSpeak);
    } else {
      speak();
    }

    // Cleanup
    return () => {
      clearInterval(typingInterval);
      synthRef.current.cancel();
    };
  }, [message]);

  return (
    <div
      ref={containerRef}
      className="relative z-50 bg-[#1e1e2f] text-green-300 font-mono px-4 py-3 rounded-xl shadow-lg w-[90%] sm:w-[80%] md:w-[300px] lg:w-[340px] xl:w-[380px] transition-all duration-300 ease-in-out border border-green-500"
      style={{
        overflowWrap: "break-word",
        wordBreak: "break-word",
        minHeight: "60px",
      }}
    >
      <p className="text-sm sm:text-base font-medium leading-snug whitespace-pre-wrap">
        {displayedText}
      </p>

      <div className="absolute bottom-2 left-[-14px] w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] border-r-[#1e1e2f]" />
    </div>
  );
}
