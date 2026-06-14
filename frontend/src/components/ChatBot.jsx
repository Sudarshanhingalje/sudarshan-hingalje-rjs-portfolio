import { useState, useEffect, useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const SUGGESTED = [
  "What are Sudarshan's skills?",
  "Tell me about his projects",
  "How can I contact Sudarshan?",
  "What is his experience?",
];

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            animation: "chatBotPulse 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
            display: "inline-block",
          }}
        />
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 12,
      animation: "chatMsgIn 0.3s ease-out",
    }}>
      {/* AI Avatar */}
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, marginRight: 8, marginTop: 2, boxShadow: "0 0 12px rgba(99,102,241,0.4)",
        }}>
          🤖
        </div>
      )}

      <div style={{
        maxWidth: "78%",
        padding: "10px 14px",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        background: isUser
          ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
          : "rgba(255,255,255,0.06)",
        border: isUser ? "none" : "1px solid rgba(255,255,255,0.10)",
        color: "#fff",
        fontSize: 13.5,
        lineHeight: 1.6,
        backdropFilter: "blur(10px)",
        boxShadow: isUser
          ? "0 4px 20px rgba(99,102,241,0.35)"
          : "0 2px 12px rgba(0,0,0,0.2)",
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
      }}>
        {msg.content}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#fff", marginLeft: 8, marginTop: 2,
        }}>
          U
        </div>
      )}
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm Sudarshan's AI assistant.\n\nAsk me anything about his skills, projects, or experience — powered by local Ollama AI.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Stop pulse after 6 seconds
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  async function sendMessage(text) {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      const reply = data?.reply || "Sorry, I couldn't generate a response right now.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ I'm having trouble connecting to my AI brain right now.\n\n" +
            "Sudarshan Hingalje is a Full Stack Java Developer.\n" +
            "📧 sudarshanhigalje1@gmail.com\n" +
            "🐙 github.com/Sudarshanhingalje",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes chatBotPulse {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes chatMsgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatBtnPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.5); }
          50% { box-shadow: 0 0 0 16px rgba(99,102,241,0); }
        }
        @keyframes chatPanelIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); transform-origin: bottom right; }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .chatbot-input:focus { outline: none; border-color: rgba(99,102,241,0.7); }
        .chatbot-send:hover { background: linear-gradient(135deg, #4f46e5, #7c3aed) !important; transform: scale(1.05); }
        .chatbot-chip:hover { background: rgba(99,102,241,0.2) !important; border-color: rgba(99,102,241,0.5) !important; }
        .chatbot-close:hover { background: rgba(255,255,255,0.1) !important; }
      `}</style>

      {/* Floating Toggle Button */}
      <button
        id="chatbot-toggle-btn"
        onClick={() => { setOpen((o) => !o); setPulse(false); }}
        title="Chat with Sudarshan's AI"
        aria-label="Open AI Chatbot"
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 9999,
          width: 62,
          height: 62,
          borderRadius: "50%",
          border: "2px solid rgba(99,102,241,0.5)",
          background: open
            ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
            : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff",
          fontSize: 26,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(99,102,241,0.45)",
          transition: "all 0.3s ease",
          animation: pulse ? "chatBtnPulse 2s ease-in-out infinite" : "none",
        }}
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* Unread dot */}
      {!open && (
        <div style={{
          position: "fixed", bottom: 78, right: 28, zIndex: 10000,
          width: 12, height: 12, borderRadius: "50%",
          background: "#22c55e", border: "2px solid #0f172a",
        }} />
      )}

      {/* Chat Panel */}
      {open && (
        <div
          id="chatbot-panel"
          style={{
            position: "fixed",
            bottom: 104,
            right: 28,
            zIndex: 9998,
            width: 380,
            maxWidth: "calc(100vw - 40px)",
            height: 560,
            maxHeight: "calc(100vh - 140px)",
            borderRadius: 20,
            background: "linear-gradient(145deg, rgba(15,23,42,0.97) 0%, rgba(30,27,75,0.97) 100%)",
            border: "1px solid rgba(99,102,241,0.25)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "chatPanelIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "16px 18px",
            background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.15) 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, boxShadow: "0 0 20px rgba(99,102,241,0.5)",
            }}>
              🤖
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "'Inter', sans-serif" }}>
                Sudarshan's AI Assistant
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ color: "#94a3b8", fontSize: 12 }}>Powered by Ollama · llama3.2:3b</span>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setOpen(false)}
              style={{
                background: "transparent", border: "none", color: "#94a3b8",
                cursor: "pointer", padding: "6px 8px", borderRadius: 8, fontSize: 16,
                transition: "all 0.2s",
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 16px 8px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(99,102,241,0.3) transparent",
          }}>
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                }}>
                  🤖
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "18px 18px 18px 4px", padding: "10px 16px",
                }}>
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggested Questions (shown when only 1 message) */}
          {messages.length === 1 && (
            <div style={{ padding: "0 14px 10px", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  className="chatbot-chip"
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                  style={{
                    background: "rgba(99,102,241,0.1)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    borderRadius: 20,
                    padding: "5px 12px",
                    fontSize: 12,
                    color: "#a5b4fc",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div style={{
            padding: "12px 14px 14px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.2)",
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
          }}>
            <textarea
              ref={inputRef}
              id="chatbot-input"
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about skills, projects, experience…"
              disabled={loading}
              rows={1}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                padding: "10px 14px",
                color: "#fff",
                fontSize: 13.5,
                resize: "none",
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.5,
                maxHeight: 90,
                overflowY: "auto",
                transition: "border-color 0.2s",
              }}
            />
            <button
              id="chatbot-send-btn"
              className="chatbot-send"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "none",
                background: !input.trim() || loading
                  ? "rgba(255,255,255,0.1)"
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 17,
                transition: "all 0.25s",
                flexShrink: 0,
                boxShadow: !input.trim() || loading ? "none" : "0 4px 14px rgba(99,102,241,0.45)",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
