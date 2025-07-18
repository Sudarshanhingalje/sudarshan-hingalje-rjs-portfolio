import { useEffect, useState } from "react";
import Avatar from "./components/Avatar";

export default function Header() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const [robotVoice, setRobotVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechText] = useState("Hey, I’m Sudarshan, a full stack developer!");

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(
      (v) => v.name === "Google UK English Male"
    );
    setRobotVoice(selectedVoice);
  }, []);

  const speakText = () => {
    const synth = window.speechSynthesis;
    if (!synth.speaking) {
      const utterance = new SpeechSynthesisUtterance(speechText);
      if (robotVoice) utterance.voice = robotVoice;
      utterance.rate = 0.95;
      utterance.pitch = 0.8;

      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      synth.cancel();
      synth.speak(utterance);
    }
  };

  return (
    <header className="relative w-full flex justify-center py-6">
      <div className="flex flex-col items-center gap-4">
        <Avatar
          isSpeaking={isSpeaking}
          className="w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px] xl:w-[260px] max-w-[80vw] h-auto object-contain"
        />
        <button
          onClick={() => {
            setShowBubble(true);
            speakText();
          }}
          className="bg-sky-500 text-white py-2 px-4 rounded mt-4"
        >
          Speak
        </button>
      </div>
    </header>
  );
}
