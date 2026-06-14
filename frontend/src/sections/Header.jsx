// src/sections/Header.jsx

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import avatar from "../assets/yoga.svg";
import DownloadButton from "../components/DownloadButton";
import Navbar from "../components/Navbar";
import TalkingBubble from "../components/TalkingBubble";
import { Component as LoaderComponent } from "../components/ui/ai-loader";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export default function Header() {
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const [aiState, setAiState]       = useState("idle"); // idle|listening|thinking|speaking
  const [selectedLang, setSelectedLang] = useState("en-US"); // en-US | hi-IN | mr-IN

  const avatarRef       = useRef(null);
  const recognitionRef  = useRef(null);
  const keepAliveRef    = useRef(null);
  const voicesRef       = useRef([]);        // preloaded voices
  const unlockedRef     = useRef(false);     // whether speech has been unlocked via user gesture
  
  // New refs for continuous voice mode
  const isSpeakingRef        = useRef(false);
  const currentSpokenTextRef = useRef("");
  const isConversingRef      = useRef(false);
  const aiStateRef           = useRef("idle");
  const activeUtteranceRef   = useRef(null);
  const isShutdownRef        = useRef(false); // true = kill everything, outside was clicked
  const selectedLangRef      = useRef("en-US");

  // Keep refs in sync
  useEffect(() => {
    aiStateRef.current = aiState;
  }, [aiState]);

  useEffect(() => {
    selectedLangRef.current = selectedLang;
  }, [selectedLang]);

  // ─── Preload voices on mount ───────────────────────────────────────────────
  // Chrome loads voices asynchronously. We cache them early so safeSpeak
  // never has to wait for voiceschanged mid-response.
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        voicesRef.current = v;
        console.log("✅ Voices loaded:", v.length);
      }
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  // ─── Unlock speech synthesis (Chrome autoplay policy) ─────────────────────
  // Chrome blocks speechSynthesis.speak() until after a user gesture.
  // We call this once on the very first avatar click to "unlock" audio.
  const unlockSpeech = () => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    const silent = new SpeechSynthesisUtterance(" ");
    silent.volume = 0;
    window.speechSynthesis.speak(silent);
    console.log("🔓 Speech synthesis unlocked");
  };

  // ─── Chrome speech keepalive ──────────────────────────────────────────────
  // Chrome silently pauses speechSynthesis for long text. Pause+resume every 10s
  const startKeepAlive = () => {
    clearInterval(keepAliveRef.current);
    keepAliveRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
  };
  const stopKeepAlive = () => clearInterval(keepAliveRef.current);

  // ─── Goodbye keyword checking ──────────────────────────────────────────────
  const isGoodbye = (text) => {
    if (!text) return false;
    const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    const goodbyeWords = [
      "bye", "goodbye", "thanks", "exit", "quit", "thank you",
      "बाय", "अलविदा", "शुक्रिया", "धन्यवाद", "टाटा",
      "निघतो मी", "आभारी आहे"
    ];
    return goodbyeWords.some(w => cleanText.includes(w));
  };

  // ─── Clean transcription prefix overlap ────────────────────────────────────
  const cleanInterruptedTranscript = (heard, spoken) => {
    if (!heard) return "";
    if (!spoken) return heard;

    const cleanWord = (w) => w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();

    const spokenWords = spoken.split(/\s+/).map(cleanWord).filter(Boolean);
    const heardWords = heard.split(/\s+/);

    let startIndex = 0;
    while (startIndex < heardWords.length) {
      const hw = cleanWord(heardWords[startIndex]);
      if (spokenWords.includes(hw)) {
        startIndex++;
      } else {
        break;
      }
    }

    const cleaned = heardWords.slice(startIndex).join(" ").trim();
    return cleaned || heard;
  };

  // ─── Core: speak text out loud ────────────────────────────────────────────
  const safeSpeak = (text, onDone) => {
    // Step 1: stop listening and cancel any leftover speech
    stopListening();
    window.speechSynthesis.cancel();
    activeUtteranceRef.current = null;
    isSpeakingRef.current = false;

    // Step 2: wait 200ms — Chrome needs a tiny gap between cancel & speak
    const timer = setTimeout(() => {
      // Bail immediately if user clicked outside or conversation was stopped
      if (isShutdownRef.current || !isConversingRef.current) {
        console.log("🚫 safeSpeak: aborted due to shutdown/stop");
        return;
      }

      const utter  = new SpeechSynthesisUtterance(text);
      activeUtteranceRef.current = utter;
      
      // Detect language from response text (Devanagari check) and selectedLang state
      let replyLang = "en-US";
      const hasDevanagari = /[\u0900-\u097F]/.test(text);
      if (hasDevanagari) {
        if (selectedLangRef.current === "mr-IN" || /[\u0933]|आहे|नाव|माझे|करतो|प्रकल्प/.test(text)) {
          replyLang = "mr-IN";
        } else {
          replyLang = "hi-IN";
        }
      } else {
        replyLang = "en-US";
      }

      utter.lang   = replyLang;
      utter.rate   = replyLang === "en-US" ? 0.92 : 0.95;
      utter.pitch  = 1.0;
      utter.volume = 1.0;

      // Use preloaded voices (never empty at speak time)
      const voices    = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
      let goodVoice = null;

      if (replyLang === "mr-IN") {
        goodVoice =
          voices.find(v => v.lang === "mr-IN" && v.name.includes("Google")) ||
          voices.find(v => v.lang === "mr-IN") ||
          voices.find(v => v.lang.startsWith("mr"));
      } else if (replyLang === "hi-IN") {
        goodVoice =
          voices.find(v => v.lang === "hi-IN" && v.name.includes("Google")) ||
          voices.find(v => v.lang === "hi-IN") ||
          voices.find(v => v.lang.startsWith("hi"));
      } else {
        goodVoice =
          voices.find(v => v.name === "Google US English")                          ||
          voices.find(v => v.name === "Microsoft Zira - English (United States)")   ||
          voices.find(v => v.name.includes("David"))                                ||
          voices.find(v => v.lang === "en-US" && !v.localService)                   ||
          voices.find(v => v.lang === "en-US")                                      ||
          voices.find(v => v.lang.startsWith("en"));
      }

      if (goodVoice) { 
        utter.voice = goodVoice; 
        console.log("🗣️ Using voice:", goodVoice.name, "for lang:", replyLang); 
      } else {
        console.log("🗣️ No matching voice found for:", replyLang, ", using default browser fallback");
      }

      utter.onstart = () => {
        if (isShutdownRef.current) { window.speechSynthesis.cancel(); return; }
        console.log("🔊 Voice started");
        isSpeakingRef.current = true;
        currentSpokenTextRef.current = text;
        startKeepAlive();
      };
      utter.onend = () => {
        if (isShutdownRef.current) return; // outside was clicked, do nothing
        console.log("✅ Voice done");
        isSpeakingRef.current = false;
        activeUtteranceRef.current = null;
        stopKeepAlive();
        
        // Start listening ONLY if we are still in a live conversation
        if (isConversingRef.current && !isShutdownRef.current) {
          startListening();
        }
        
        if (onDone) onDone();
      };
      utter.onerror = (e) => {
        if (isShutdownRef.current) return; // outside was clicked, do nothing
        isSpeakingRef.current = false;
        activeUtteranceRef.current = null;
        stopKeepAlive();
        if (e.error === "interrupted" || e.error === "canceled") return;
        console.warn("⚠️ Speech error:", e.error);
        
        // Start listening on error ONLY if still in conversation
        if (isConversingRef.current && !isShutdownRef.current) {
          startListening();
        }
        
        if (onDone) onDone();
      };

      window.speechSynthesis.speak(utter);
      console.log("🔊 Speak queued:", text.slice(0, 60));
    }, 200);

    return () => clearTimeout(timer);
  };

  // ─── Stop mic + voice completely ─────────────────────────────────────────
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onresult = null;
      try { recognitionRef.current.abort(); } catch (_) {}
      recognitionRef.current = null;
    }
  };

  const stopAll = () => {
    stopKeepAlive();
    isSpeakingRef.current = false;
    window.speechSynthesis.cancel();
    activeUtteranceRef.current = null;
    stopListening();
  };

  // ─── First-visit welcome bubble ─────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      // Only show if user hasn't interacted yet
      setAiState(prev => {
        if (prev === "idle" && !isConversingRef.current) {
          const isFirstVisit = localStorage.getItem("portfolio_first_visit") !== "false";
          if (isFirstVisit) {
            setBubbleText(
              "👋 Hi! I'm Sudarshan. Click my avatar and ask me anything — skills, projects, experience!\n\n" +
              "Rotate the Sudarshan Chakra to scroll through my sections!"
            );
          } else {
            setBubbleText("👋 Hi! I'm Sudarshan. Click my avatar and ask me anything — skills, projects, experience!");
          }
          setShowBubble(true);
        }
        return prev;
      });
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  // ─── Click outside → IMMEDIATELY kill everything ──────────────────────────
  useEffect(() => {
    const onOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        // Set shutdown flag FIRST so all in-flight async ops bail immediately
        isShutdownRef.current = true;
        isConversingRef.current = false;

        // Hard stop all audio and mic
        clearInterval(keepAliveRef.current);
        isSpeakingRef.current = false;
        window.speechSynthesis.cancel();
        activeUtteranceRef.current = null;

        if (recognitionRef.current) {
          recognitionRef.current.onend    = null;
          recognitionRef.current.onerror  = null;
          recognitionRef.current.onresult = null;
          try { recognitionRef.current.abort(); } catch (_) {}
          recognitionRef.current = null;
        }

        // Immediately hide bubble and reset UI
        setShowBubble(false);
        setBubbleText("");
        setAiState("idle");
        setSelectedLang("en-US");

        console.log("🚫 Outside click: all voice activity stopped");
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);


  // ─── Main listening engine ────────────────────────────────────────────────
  const startListening = (overrideLang) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Speech recognition not supported. Please use Google Chrome.");
      return;
    }

    stopListening(); // clean up any existing instance first

    const rec = new SR();
    recognitionRef.current = rec;
    rec.lang            = overrideLang || selectedLangRef.current || "en-US";
    rec.interimResults  = false; // Only care about final results in turn-based mode
    rec.maxAlternatives = 1;
    rec.continuous      = false;

    // Ensure bubble remains open if it has text (e.g. last answer or welcome)
    if (bubbleText) {
      setShowBubble(true);
    }

    if (aiStateRef.current !== "speaking") {
      setAiState("listening");
    }

    rec.onresult = async (event) => {
      // Bail immediately if user clicked outside
      if (isShutdownRef.current || !isConversingRef.current) return;

      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (!finalTranscript) return;

      const finalHeard = finalTranscript.trim();
      if (!finalHeard) return;

      console.log("📝 Final speech recognized:", finalHeard);

      // Goodbye triggers
      if (isGoodbye(finalHeard)) {
        console.log("👋 Exit trigger word detected.");
        isConversingRef.current = false;
        isShutdownRef.current = true;
        stopAll();
        setAiState("idle");
        setShowBubble(false);
        setBubbleText("");
        return;
      }

      stopListening(); // Stop current session before fetching

      setAiState("thinking");
      setBubbleText("💭 Thinking...");
      setShowBubble(true);

      try {
        const res = await fetch(`${API_BASE_URL}/webhook/chat`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ message: finalHeard }),
        });

        // Bail if user clicked outside while waiting for response
        if (isShutdownRef.current || !isConversingRef.current) {
          console.log("🚫 fetch: aborted due to shutdown");
          return;
        }

        const raw = await res.text();
        console.log("📥 Raw response:", raw);

        // Final check before showing response
        if (isShutdownRef.current || !isConversingRef.current) return;

        let reply = "Sorry, I couldn't understand the response.";
        if (raw?.trim()) {
          try {
            const json = JSON.parse(raw);
            reply = json?.message || json?.reply || raw;
          } catch (_) {
            reply = raw;
          }
        }

        setBubbleText(reply);
        setShowBubble(true);
        setAiState("speaking");

        // Speak the reply
        safeSpeak(reply, () => {
          if (isConversingRef.current && !isShutdownRef.current) {
            setAiState("listening");
          }
        });

      } catch (err) {
        if (isShutdownRef.current || !isConversingRef.current) return;
        console.error("❌ API error:", err);
        const msg = "I can't reach the server right now. Please make sure Ollama and the backend are running.";
        setBubbleText(msg);
        setShowBubble(true);
        setAiState("speaking");
        safeSpeak(msg, () => {
          if (!isShutdownRef.current) {
            setAiState("idle");
            isConversingRef.current = false;
            setTimeout(() => setShowBubble(false), 5000);
          }
        });
      }
    };

    rec.onerror = (e) => {
      console.warn("⚠️ Recognition error:", e.error);
      if (aiStateRef.current === "speaking") {
        return; // ignore errors like no-speech when speaking
      }
      if (e.error === "no-speech") {
        console.log("No speech detected; continuing loop...");
        return;
      }
      if (e.error === "not-allowed") {
        setBubbleText("🎤 Mic access denied. Please allow microphone in browser settings.");
        setShowBubble(true);
        setAiState("idle");
        isConversingRef.current = false;
        stopAll();
      }
    };

    rec.onend = () => {
      console.log("🛑 Mic closed. State is:", aiStateRef.current);
      // Only restart if conversation is still active AND not shut down
      if (isConversingRef.current && !isShutdownRef.current && aiStateRef.current === "listening") {
        setTimeout(() => {
          if (isConversingRef.current && !isShutdownRef.current && aiStateRef.current === "listening") {
            startListening();
          }
        }, 300);
      }
    };

    try { rec.start(); console.log("🎤 Mic opened"); }
    catch (e) { console.warn("Could not start mic:", e); }
  };

  // ─── Multilingual welcome speech flow ─────────────────────────────────────
  const speakLanguageWelcome = (lang) => {
    let welcomeText = "";
    let isFirstVisit = false;

    if (lang === "mr-IN") {
      welcomeText = "नमस्कार! मी सुदर्शन. माझी कौशल्ये, प्रकल्प किंवा अनुभवाबद्दल काहीही विचारा!";
    } else if (lang === "hi-IN") {
      welcomeText = "नमस्ते! मैं सुदर्शन हूँ। मेरे स्किल्स, प्रोजेक्ट्स या एक्सपीरियंस के बारे में कुछ भी पूछें!";
    } else {
      isFirstVisit = localStorage.getItem("portfolio_first_visit") !== "false";
      if (isFirstVisit) {
        welcomeText = 
          "Hi! I'm Sudarshan. Ask me anything about my skills, projects, or experience! " +
          "Rotate the Sudarshan Chakra to scroll through my sections!";
      } else {
        welcomeText = "Hi! I'm Sudarshan. Ask me anything about my skills, projects, or experience!";
      }
    }
    
    if (isFirstVisit) {
      setBubbleText(
        "👋 Hi! I'm Sudarshan. Click my avatar and ask me anything — skills, projects, experience!\n\n" +
        "Rotate the Sudarshan Chakra to scroll through my sections!"
      );
      localStorage.setItem("portfolio_first_visit", "false");
    } else {
      if (lang === "mr-IN") {
        setBubbleText("नमस्कार! मी सुदर्शन. माझी कौशल्ये, प्रकल्प किंवा अनुभवाबद्दल काहीही विचारा!");
      } else if (lang === "hi-IN") {
        setBubbleText("नमस्ते! मैं सुदर्शन हूँ। मेरे स्किल्स, प्रोजेक्ट्स या एक्सपीरियंस के बारे में कुछ भी पूछें!");
      } else {
        setBubbleText("👋 Hi! I'm Sudarshan. Ask me anything about my skills, projects, or experience!");
      }
    }
    
    setShowBubble(true);
    setAiState("speaking");

    safeSpeak(welcomeText, () => {
      if (isConversingRef.current && !isShutdownRef.current) {
        setAiState("listening");
      }
    });
  };

  const speakWelcome = () => {
    speakLanguageWelcome(selectedLangRef.current);
  };

  // ─── Language selection handler ───────────────────────────────────────────
  const handleLanguageChange = (langCode) => {
    setSelectedLang(langCode);
    console.log("🌐 Language changed to:", langCode);

    // Clear first visit once they interact with controls
    localStorage.setItem("portfolio_first_visit", "false");

    // Stop current synthesis/listening
    stopAll();

    // Reset shutdown flag and speak welcome in the newly chosen language
    isShutdownRef.current = false;
    isConversingRef.current = true;
    speakLanguageWelcome(langCode);
  };

  // ─── Avatar click handler ─────────────────────────────────────────────────
  const handleAvatarClick = () => {
    unlockSpeech();

    // Clear first visit once they click the avatar
    localStorage.setItem("portfolio_first_visit", "false");

    if (isConversingRef.current) {
      if (aiStateRef.current === "speaking" || aiStateRef.current === "thinking") {
        // Interrupt active speech / thinking and start listening immediately
        stopAll();
        isShutdownRef.current = false; // re-enable conversation
        isConversingRef.current = true;
        setAiState("listening");
        setBubbleText("🎤 Listening...");
        setShowBubble(true);
        startListening();
      } else {
        // Toggle conversation off (second click while listening = end conversation)
        isShutdownRef.current = true;
        isConversingRef.current = false;
        stopAll();
        setAiState("idle");
        setShowBubble(false);
        setBubbleText("");
      }
    } else {
      // First click: start conversation
      isShutdownRef.current = false; // allow everything to proceed
      isConversingRef.current = true;
      speakWelcome();
    }
  };

  const loaderLabel =
    aiState === "listening" ? "Listening" :
    aiState === "thinking"  ? "Thinking"  : "Speaking";

  return (
    <section
      id="header"
      className="relative bg-grid-pattern w-full overflow-x-hidden transition-colors duration-500 bg-gray-50 text-black"
    >
      <Navbar />

      {/* ─── Desktop ──────────────────────────────────────────────────── */}
      <div className="hidden md:block min-h-screen">

        {/* Left — text content */}
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

        {/* Right — role list */}
        <div className="absolute right-6 md:right-12 lg:right-16 xl:right-24 top-1/2 transform -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="text-right space-y-4"
          >
            <p className="text-sm font-light tracking-wider max-w-xs">
              I AM PASSIONATE ABOUT<br />
              CREATING WEBSITES THAT<br />
              STAND OUT FROM THE<br />
              CROWD.
            </p>
            <div className="space-y-2 pt-8">
              {["Full Stack Dev", "FrontEnd Dev", "BackEnd Dev", "Software Testing", "Project Management"].map(t => (
                <div key={t} className="text-sm font-light tracking-wider">{t}</div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Center-bottom — Avatar + Bubble + Loader */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1.2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div ref={avatarRef} className="relative group cursor-pointer flex flex-col items-center">

            {/* Avatar image */}
            <div className="relative mx-auto" onClick={handleAvatarClick}>
              <img
                src={avatar}
                alt="Click me to chat!"
                className="w-[220px] md:w-[280px] lg:w-[300px] xl:w-[360px] rounded-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
              />

              {/* Speech bubble to the right of avatar */}
              {showBubble && (
                <div className="absolute -top-20 left-full ml-4 z-20">
                  <TalkingBubble message={bubbleText} />
                </div>
              )}
            </div>

            {/* Language Selector Pill Group */}
            {aiState !== "idle" && (
              <div className="flex justify-center space-x-1.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-indigo-500/30 shadow-xl mt-3 mb-1 z-30 select-none">
                {[
                  { code: "en-US", label: "English" },
                  { code: "hi-IN", label: "हिंदी" },
                  { code: "mr-IN", label: "मराठी" }
                ].map(lang => (
                  <button
                    key={lang.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageChange(lang.code);
                    }}
                    className={`px-3 py-0.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
                      selectedLang === lang.code
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/40"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}

            {/* AI state loader below avatar */}
            {aiState !== "idle" && (
              <div className="mt-2">
                <LoaderComponent size={90} text={loaderLabel} inline={true} />
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ─── Mobile ───────────────────────────────────────────────────── */}
      <div className="block md:hidden w-full px-4 pt-16 text-center flex flex-col items-center justify-start space-y-4 pb-8">
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

        <div ref={avatarRef} className="relative flex flex-col items-center justify-center">
          <motion.img
            src={avatar}
            alt="Click to chat!"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full grayscale hover:grayscale-0 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={handleAvatarClick}
          />
          {/* Language Selector Pill Group */}
          {aiState !== "idle" && (
            <div className="flex justify-center space-x-1.5 bg-slate-900/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-indigo-500/30 shadow-xl mt-3 mb-1 z-30 select-none">
              {[
                { code: "en-US", label: "English" },
                { code: "hi-IN", label: "हिंदी" },
                { code: "mr-IN", label: "मराठी" }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLanguageChange(lang.code);
                  }}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide transition-all duration-200 ${
                    selectedLang === lang.code
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}

          {aiState !== "idle" && (
            <div className="mt-2">
              <LoaderComponent size={70} text={loaderLabel} inline={true} />
            </div>
          )}
        </div>

        {showBubble && (
          <div className="flex justify-center w-full max-w-xs z-20">
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
