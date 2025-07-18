import { useEffect, useState } from "react";

export default function TalkingBubble({ message }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;

    // Typing animation
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + message[i]);
      i++;
      if (i >= message.length) clearInterval(interval);
    }, 50); // speed

    // Speak the message
    const speak = () => {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(message);

      const voices = synth.getVoices();

      // Robot/AI voice selection logic
      const robotVoice =
        voices.find((v) => v.name.includes("Microsoft David")) || // Windows
        voices.find((v) => v.name.includes("Google UK English Male")) || // Chrome
        voices.find((v) => v.lang === "en-US"); // fallback

      if (robotVoice) utter.voice = robotVoice;

      utter.rate = 0.95; // slow for clarity
      utter.pitch = 0.8; // low pitch = robotic
      synth.cancel(); // stop other speech
      synth.speak(utter);
    };

    // Wait briefly so getVoices is loaded
    const speechTimeout = setTimeout(() => speak(), 300);

    return () => {
      clearInterval(interval);
      clearTimeout(speechTimeout);
    };
  }, [message]);

  return (
    <div className="relative z-50 max-w-[250px] sm:max-w-[300px] bg-white text-black px-4 py-3 rounded-xl shadow-xl text-left">
      <p className="text-sm sm:text-base font-medium leading-snug whitespace-pre-line">
        {displayedText}
      </p>
      {/* Triangle bubble pointer */}
      <div className="absolute bottom-2 left-[-14px] w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] border-r-white" />
    </div>
  );
}
