// src/sections/Header.jsx

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import avatar from "../assets/yoga.svg";
import DownloadButton from "../components/DownloadButton";
import Navbar from "../components/Navbar";
import TalkingBubble from "../components/TalkingBubble";

function speakText(text) {
  window.speechSynthesis.cancel();
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.rate = 1;
  window.speechSynthesis.speak(utter);
}

export default function Header() {
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const avatarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowBubble(false);
        setBubbleText("");
        window.speechSynthesis.cancel();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    console.log("🎤 Preparing mic...");

    setBubbleText("Listening...");
    setShowBubble(true);

    // Delayed start: helps with "no-speech"
    setTimeout(() => {
      recognition.start();
      console.log("🎤 Listening started...");

      recognition.onstart = () => console.log("🔊 Speech recognition started");
      recognition.onaudiostart = () =>
        console.log("🎙️ Audio capturing started");
      recognition.onspeechstart = () => console.log("🗣️ Speech detected");
      recognition.onspeechend = () => console.log("📴 Speech ended");
      recognition.onaudioend = () => console.log("🔇 Audio capturing ended");

      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("📝 Heard:", transcript);

        setBubbleText("Thinking... 🤔");
        speakText("Thinking...");

        try {
          console.log(
            "🔄 Making request to:",
            "http://localhost:5678/webhook/chat"
          );
          console.log("📤 Sending data:", { message: transcript });

          const response = await fetch("http://localhost:5678/webhook/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: transcript }),
          });

          console.log("📥 Response status:", response.status);
          console.log("📥 Response ok:", response.ok);

          // Get the raw text first
          const rawText = await response.text();
          console.log("📄 Raw response text:", rawText);
          console.log("📏 Raw response length:", rawText.length);

          // Check if response is empty
          if (!rawText || rawText.trim() === "") {
            console.error("❌ Empty response received");
            setBubbleText("Sorry, I received an empty response.");
            speakText("Sorry, I received an empty response.");
            return;
          }

          // Try to parse JSON
          let data;
          try {
            data = JSON.parse(rawText);
            console.log("✅ Parsed JSON:", data);
          } catch (jsonError) {
            console.error("❌ JSON parsing failed:", jsonError);
            console.error("📄 Failed to parse:", rawText);
            setBubbleText("Sorry, I received an invalid response format.");
            speakText("Sorry, I received an invalid response format.");
            return;
          }

          // Extract message
          const message = data?.message || "No message found in response";
          console.log("💬 Final message:", message);

          setBubbleText(message);
          speakText(message);
        } catch (error) {
          console.error("❌ Fetch Error:", error);
          console.error("❌ Error details:", error.message);
          setBubbleText("Sorry, I'm having trouble connecting.");
          speakText("Sorry, I'm having trouble connecting.");
        }
      };

      recognition.onerror = (event) => {
        console.error("⚠️ Speech recognition error:", event.error);

        if (event.error === "no-speech") {
          setBubbleText("I couldn't hear you. Please try again.");
          speakText("I couldn't hear you. Please try again.");
        } else if (event.error === "not-allowed") {
          setBubbleText("Microphone access was denied.");
          speakText("Microphone access was denied.");
        } else {
          setBubbleText("Speech recognition error occurred.");
          speakText("Speech recognition error occurred.");
        }
      };

      recognition.onend = () => {
        console.log("🛑 Recognition ended");
      };
    }, 500); // Delay of 500ms before starting recognition
  };

  const testConnection = async () => {
    try {
      console.log("🧪 Testing connection...");
      const response = await fetch("http://localhost:5678/webhook/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Test connection from frontend" }),
      });

      console.log("🧪 Test response status:", response.status);
      const rawText = await response.text();
      console.log("🧪 Test raw response:", rawText);

      if (rawText) {
        const data = JSON.parse(rawText);
        console.log("🧪 Test parsed data:", data);
        alert("Connection works! Check console for details.");
      } else {
        alert("Connection returned empty response!");
      }
    } catch (error) {
      console.error("🧪 Test connection failed:", error);
      alert("Connection failed! Check console for details.");
    }
  };

  return (
    <section
      id="header"
      className="relative bg-grid-pattern w-full overflow-x-hidden transition-colors duration-500 bg-gray-50 text-black"
    >
      <Navbar />

      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={testConnection}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Test n8n Connection
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden md:block min-h-screen">
        {/* Left text content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start pl-6 md:pl-12 lg:pl-16 xl:pl-24">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="mb-6 lg:mb-8"
          >
            <h1 className="text-5xl md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tight leading-none">
              <span className="text-gray-400">FULL STACK</span>
              <br />
              <span className="text-black">DEVELOPER</span>
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-80, 0, 0, -80] }}
            transition={{ duration: 8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wider text-gray-600 mb-6 lg:mb-8"
          >
            Sudarshan Hingalje
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.8 }}
            className="mb-6 lg:mb-8"
          >
            <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-purple-600">
              Sudarshan <br />
              <span className="text-yellow-500 font-black">Hingalje</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1.2 }}
          >
            <DownloadButton />
          </motion.div>
        </div>

        {/* Right avatar */}
        <div className="absolute right-6 md:right-12 lg:right-16 xl:right-24 top-1/2 transform -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="text-right space-y-4"
          >
            <p className="text-sm font-light tracking-wider max-w-xs">
              I AM PASSIONATE ABOUT
              <br />
              CREATING WEBSITES THAT
              <br />
              STAND OUT FROM THE
              <br />
              CROWD.
            </p>

            <div className="space-y-2 pt-8">
              <div className="text-sm font-light tracking-wider">
                Full Stack Dev
              </div>
              <div className="text-sm font-light tracking-wider">
                FrontEnd Dev
              </div>
              <div className="text-sm font-light tracking-wider">
                BackEnd Dev
              </div>
              <div className="text-sm font-light tracking-wider">
                Software Testing
              </div>
              <div className="text-sm font-light tracking-wider">
                Project Management
              </div>
            </div>
          </motion.div>
        </div>

        {/* Avatar speech */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1.2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div
            ref={avatarRef}
            className="relative group cursor-pointer"
            onClick={startListening}
          >
            <div className="relative mx-auto">
              <img
                src={avatar}
                alt="Avatar"
                className="w-[220px] md:w-[280px] lg:w-[300px] xl:w-[360px] rounded-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
              />
              {showBubble && (
                <div className="absolute -top-20 left-full ml-4">
                  <TalkingBubble message={bubbleText} />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden w-full px-4 pt-16 text-center h-auto flex flex-col items-center justify-start space-y-4 pb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-800"
        >
          FULL STACK DEVELOPER
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl font-medium text-gray-600"
        >
          Sudarshan Hingalje
        </motion.p>

        <motion.img
          src={avatar}
          alt="Sudarshan Avatar"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full grayscale hover:grayscale-0 transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={startListening}
          ref={avatarRef}
        />

        {showBubble && (
          <div className="flex justify-center">
            <TalkingBubble message={bubbleText} />
          </div>
        )}

        <div className="w-full flex justify-center">
          <DownloadButton />
        </div>
      </div>
    </section>
  );
}
