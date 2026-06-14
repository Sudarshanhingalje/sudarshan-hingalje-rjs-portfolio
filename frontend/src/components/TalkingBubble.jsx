import { useEffect, useRef, useState } from "react";

export default function TalkingBubble({ message }) {
  const [displayedText, setDisplayedText] = useState("");
  const textContainerRef = useRef(null);

  const renderFormattedText = (text) => {
    if (!text) return "";
    const regex = /(Sudarshan Chakra|sudarshan chakra|Sudarshan Chakara|sudarshan chakara)/i;
    const parts = text.split(regex);
    return parts.map((part, index) => {
      const isTarget = part.toLowerCase().replace(/\s+/g, "").includes("sudarshanchakra") ||
                       part.toLowerCase().replace(/\s+/g, "").includes("sudarshanchakara");
      if (isTarget) {
        return (
          <span
            key={index}
            className="text-yellow-400 font-extrabold animate-pulse drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Typewriter animation
  useEffect(() => {
    if (!message) return;
    let i = 0;
    setDisplayedText("");

    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + message.charAt(i));
      i++;
      if (i >= message.length) {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => {
      clearInterval(typingInterval);
    };
  }, [message]);

  // Auto-scroll scrollable inner text box to bottom as letters render
  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
    }
  }, [displayedText]);

  return (
    <div
      className="relative z-50 bg-[#0d0f1a]/90 backdrop-blur-xl border border-indigo-500/20 px-4 py-3.5 rounded-2xl flex flex-col justify-between w-[280px] sm:w-[320px] md:w-[360px] h-[220px] transition-all duration-500 overflow-hidden"
      style={{
        boxShadow:
          "0 20px 40px -15px rgba(0,0,0,0.7), 0 0 30px 1px rgba(99,102,241,0.15), inset 0 1px 0 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Premium background glows (Dribbble style) */}
      <div className="absolute top-[-20px] left-[-20px] w-36 h-36 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20px] right-[-20px] w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Bubble Header (Smart Assistant Badge) */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 z-10 pointer-events-none select-none">
        <div className="flex items-center space-x-2">
          {/* Pulsing online status indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-indigo-300 uppercase font-sans">
            Sudarshan AI
          </span>
        </div>
        <div className="flex items-center space-x-1 text-[9px] sm:text-[10px] text-slate-400 font-mono">
          <span>Active</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 animate-pulse"></span>
        </div>
      </div>

      {/* Scrollable text container */}
      <div
        ref={textContainerRef}
        className="w-full h-full overflow-y-auto pr-1 select-text scrollbar-custom z-10"
      >
        <p className="text-xs sm:text-sm font-sans font-normal leading-relaxed text-slate-200 whitespace-pre-wrap">
          {renderFormattedText(displayedText)}
        </p>
      </div>

      {/* Curved elegant speech bubble pointer tail */}
      <svg
        width="12"
        height="16"
        viewBox="0 0 12 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-[-11px] bottom-6 text-[#0d0f1a]/95 drop-shadow-[-1px_0_0_rgba(99,102,241,0.2)]"
      >
        <path
          d="M12 0C8 2 2 6 0 10C2 11 8 13 12 16V0Z"
          fill="currentColor"
        />
      </svg>

      {/* Custom styled scrollbars */}
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-custom::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 99px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.4);
          border-radius: 99px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.7);
        }
      `}} />
    </div>
  );
}
