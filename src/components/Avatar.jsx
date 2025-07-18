import { useEffect, useState } from "react";
import avatarImg from "../assets/avatar.svg";

const Avatar = () => {
  const [showBubble, setShowBubble] = useState(false);

  const prompt =
    "Hi! I’m Sudarshan Hingalje, a Full Stack Developer. Spin the Sudarshan Chakra to explore my journey through coding, learning, and life!";

  const speak = () => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(prompt);

    // Optional: pick a better voice
    const voices = synth.getVoices();
    const preferredVoice = voices.find(
      (v) => v.name.includes("Google") || v.lang === "en-US"
    );
    if (preferredVoice) utter.voice = preferredVoice;

    utter.rate = 1;
    utter.pitch = 1;
    synth.cancel(); // stop previous
    synth.speak(utter);
  };

  useEffect(() => {
    if (showBubble) speak();
  }, [showBubble]);

  return (
    <div
      className="relative w-fit group"
      onMouseEnter={() => setShowBubble(true)}
      onMouseLeave={() => setShowBubble(false)}
    >
      <img
        src={avatarImg}
        alt="Sudarshan Avatar"
        className="w-32 h-32 hover:animate-spin transition-transform duration-500"
      />
      {/* Bubble on top right */}
      {showBubble && (
        <div className="absolute -top-12 left-32 bg-white text-black px-4 py-2 rounded-lg shadow-lg text-sm w-64">
          <div className="absolute -left-3 top-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white"></div>
          👋 Hi! I’m Sudarshan Hingalje, a Full Stack Developer.
          <br />
          <strong>Spin the Chakra to explore my journey!</strong>
        </div>
      )}
    </div>
  );
};

export default Avatar;
