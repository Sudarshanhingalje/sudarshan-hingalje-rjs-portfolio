import { useState, useEffect, useRef } from "react";
import api from "../hooks/useApi";
import { formatDateTime } from "../utils/formatters";

export default function AiManagement() {
  const [portfolioContext, setPortfolioContext] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ usage: 0, limit: 99999, active: true, totalTokens: 0 });
  const [ollamaModel, setOllamaModel] = useState("llama3.2:3b");
  const [ollamaUrl, setOllamaUrl] = useState("http://localhost:11434/api/generate");
  const [lastError, setLastError] = useState("None");
  const [loading, setLoading] = useState(true);
  const [savingContext, setSavingContext] = useState(false);
  const [savingPrompt, setSavingPrompt] = useState(false);
  const [contextMsg, setContextMsg] = useState("");
  const [promptMsg, setPromptMsg] = useState("");
  const [testMsg, setTestMsg] = useState("");
  const [testQuestion, setTestQuestion] = useState("");
  const [testLoading, setTestLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => { loadAiData(); }, []);

  async function loadAiData() {
    try {
      const res = await api.get("/ai/management");
      if (res.data?.success) {
        const d = res.data.data;
        setSystemPrompt(d.systemPrompt || "");
        setPortfolioContext(d.portfolioContext || "");
        setLogs(d.chatLogs || []);
        setStats(d.stats || { usage: 0, limit: 99999, active: true, totalTokens: 0 });
        setOllamaModel(d.ollamaModel || "llama3.2:3b");
        setOllamaUrl(d.ollamaUrl || "http://localhost:11434/api/generate");
        setLastError(d.lastError || "None");
      }
    } catch {
      setPortfolioContext(
        "Name: Sudarshan Hingalje\nRole: Full Stack Java Developer\nEmail: sudarshanhigalje1@gmail.com\nGitHub: https://github.com/Sudarshanhingalje"
      );
      setStats({ usage: 0, limit: 99999, active: true, totalTokens: 0 });
    } finally {
      setLoading(false);
    }
  }

  // Save portfolio context to DB
  async function handleSaveContext(e) {
    e.preventDefault();
    setSavingContext(true);
    setContextMsg("");
    try {
      await api.put("/ai/context", { portfolioContext });
      setContextMsg("✅ Portfolio context saved to database!");
    } catch {
      setContextMsg("❌ Failed to save. Check if backend is running.");
    } finally {
      setSavingContext(false);
      setTimeout(() => setContextMsg(""), 4000);
    }
  }

  // Load a .txt file into the context textarea
  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith(".txt") && !file.name.endsWith(".md")) {
      setContextMsg("⚠️ Please upload a .txt or .md file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      setPortfolioContext(evt.target.result);
      setContextMsg(`📂 Loaded: ${file.name} — click "Save to Database" to apply.`);
    };
    reader.readAsText(file);
  }

  // Save system prompt
  async function handleSavePrompt(e) {
    e.preventDefault();
    setSavingPrompt(true);
    setPromptMsg("");
    try {
      await api.put("/ai/system-prompt", { systemPrompt });
      setPromptMsg("✅ System prompt saved!");
    } catch {
      setPromptMsg("❌ Failed to save.");
    } finally {
      setSavingPrompt(false);
      setTimeout(() => setPromptMsg(""), 3000);
    }
  }

  // Toggle chatbot
  async function toggleChatbot() {
    const updated = !stats.active;
    try {
      await api.put("/ai/toggle", { active: updated });
      setStats(s => ({ ...s, active: updated }));
    } catch {
      setStats(s => ({ ...s, active: updated }));
    }
  }

  // Live test Ollama from admin
  async function handleTestOllama(e) {
    e.preventDefault();
    if (!testQuestion.trim()) return;
    setTestLoading(true);
    setTestMsg("");
    try {
      const res = await api.post("/chat", { message: testQuestion });
      setTestMsg(res.data?.reply || "No reply received.");
    } catch {
      setTestMsg("❌ Could not reach backend. Is Spring Boot running?");
    } finally {
      setTestLoading(false);
    }
  }

  const isError = lastError && lastError !== "None";

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="ember-heading" style={{ margin: 0 }}>
            🤖 Ollama AI Workspace
          </h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)", marginTop: 4 }}>
            Local AI chatbot powered by <strong>Ollama {ollamaModel}</strong> — fully offline, no API keys needed
          </p>
        </div>
        <button
          id="ai-toggle-btn"
          onClick={toggleChatbot}
          className={`ember-btn ${stats.active ? "ember-btn-primary" : "ember-btn-secondary"}`}
          style={{ height: 40 }}
        >
          {stats.active ? "● Chatbot Enabled" : "○ Chatbot Disabled"}
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading AI workspace…</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

          {/* Top Grid: Status + Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

            {/* Ollama Status Card */}
            <div className="ember-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif" }}>
                ⚡ Ollama Engine Status
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="ember-label">Model</span>
                  <span className="ember-code" style={{
                    background: "rgba(99,102,241,0.15)", color: "#818cf8",
                    padding: "3px 10px", borderRadius: 20, fontSize: 13, fontWeight: 700
                  }}>
                    {ollamaModel}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="ember-label">Endpoint</span>
                  <span className="ember-code" style={{ fontSize: 12, color: "var(--ember-text-secondary)" }}>
                    {ollamaUrl}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="ember-label">Total Chats</span>
                  <span style={{ fontWeight: 700, color: "var(--ember-primary)" }}>{stats.usage}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="ember-label">Total Tokens Used</span>
                  <span style={{ fontWeight: 700 }}>{stats.totalTokens?.toLocaleString() || 0}</span>
                </div>
              </div>

              {/* Last Error */}
              <div style={{
                borderRadius: 8, padding: "10px 14px",
                background: isError ? "rgba(239,68,68,0.08)" : "rgba(22,163,74,0.08)",
                border: `1px solid ${isError ? "rgba(239,68,68,0.25)" : "rgba(22,163,74,0.25)"}`,
              }}>
                <span className="ember-caption" style={{ color: isError ? "#f87171" : "#4ade80", fontSize: 12 }}>
                  {isError ? `⚠️ Last Error: ${lastError}` : "✅ No errors — Ollama is responding normally"}
                </span>
              </div>

              <div style={{ fontSize: 12, color: "var(--ember-text-secondary)", lineHeight: 1.6 }}>
                💡 <strong>To start Ollama:</strong> Open a terminal and run:<br />
                <code style={{ background: "var(--ember-bg)", padding: "2px 6px", borderRadius: 4 }}>
                  ollama run llama3.2:3b
                </code>
              </div>
            </div>

            {/* Live Test Card */}
            <div className="ember-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif" }}>
                🧪 Live Test Chatbot
              </span>
              <p className="ember-caption" style={{ color: "var(--ember-text-secondary)", margin: 0 }}>
                Send a test message to verify Ollama is responding with portfolio context.
              </p>
              <form onSubmit={handleTestOllama} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input
                  className="ember-input"
                  value={testQuestion}
                  onChange={e => setTestQuestion(e.target.value)}
                  placeholder="e.g. What are Sudarshan's skills?"
                  disabled={testLoading}
                />
                <button
                  id="ai-test-btn"
                  type="submit"
                  disabled={testLoading || !testQuestion.trim()}
                  className="ember-btn ember-btn-primary ember-btn-sm"
                  style={{ alignSelf: "flex-start", opacity: testLoading ? 0.7 : 1 }}
                >
                  {testLoading ? "⏳ Asking Ollama…" : "▶ Test Now"}
                </button>
              </form>

              {testMsg && (
                <div style={{
                  background: "var(--ember-bg)", borderRadius: 10,
                  padding: "12px 14px", fontSize: 13, lineHeight: 1.6,
                  border: "1px solid var(--ember-border)", maxHeight: 150, overflowY: "auto",
                  color: testMsg.startsWith("❌") ? "#f87171" : "var(--ember-text-primary)"
                }}>
                  <strong style={{ color: "var(--ember-primary)", display: "block", marginBottom: 4 }}>
                    🤖 Ollama says:
                  </strong>
                  {testMsg}
                </div>
              )}
            </div>
          </div>

          {/* Portfolio Context Editor */}
          <div className="ember-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", display: "block" }}>
                  📄 Portfolio Context — AI Knowledge Base
                </span>
                <p className="ember-caption" style={{ color: "var(--ember-text-secondary)", margin: "4px 0 0" }}>
                  This text is prepended to every Ollama prompt. Edit here or upload a <strong>.txt</strong> file.
                  The chatbot will ONLY answer using this context.
                </p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <button
                  id="ai-upload-context-btn"
                  type="button"
                  className="ember-btn ember-btn-secondary ember-btn-sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  📂 Upload .txt File
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveContext} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <textarea
                className="ember-textarea"
                style={{ minHeight: 380, fontSize: 13, fontFamily: "monospace", lineHeight: 1.7 }}
                value={portfolioContext}
                onChange={e => setPortfolioContext(e.target.value)}
                placeholder="Enter your portfolio context here — bio, skills, projects, contact info..."
                disabled={savingContext}
              />

              {contextMsg && (
                <div style={{
                  fontSize: 14, fontWeight: 600, padding: "8px 14px", borderRadius: 8,
                  background: contextMsg.startsWith("✅")
                    ? "rgba(22,163,74,0.08)" : contextMsg.startsWith("❌")
                    ? "rgba(239,68,68,0.08)" : "rgba(99,102,241,0.08)",
                  border: contextMsg.startsWith("✅")
                    ? "1px solid rgba(22,163,74,0.25)" : contextMsg.startsWith("❌")
                    ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(99,102,241,0.25)",
                  color: contextMsg.startsWith("✅") ? "#4ade80"
                    : contextMsg.startsWith("❌") ? "#f87171" : "#a5b4fc"
                }}>
                  {contextMsg}
                </div>
              )}

              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <button
                  id="ai-context-save"
                  type="submit"
                  disabled={savingContext}
                  className="ember-btn ember-btn-primary ember-btn-md"
                  style={{ opacity: savingContext ? 0.7 : 1 }}
                >
                  {savingContext ? "💾 Saving…" : "💾 Save to Database"}
                </button>
                <span className="ember-caption" style={{ color: "var(--ember-text-secondary)" }}>
                  {portfolioContext.length} characters · ~{Math.ceil(portfolioContext.split(/\s+/).length)} words
                </span>
              </div>
            </form>
          </div>

          {/* System Prompt (behavior) */}
          <div className="ember-card">
            <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", display: "block", marginBottom: 8 }}>
              ⚙️ Behavior Instructions (System Prompt)
            </span>
            <p className="ember-caption" style={{ color: "var(--ember-text-secondary)", marginBottom: 14 }}>
              Optional: controls the AI's tone and behavior (e.g. "be concise", "always mention the contact form").
              The portfolio context above is more important for accuracy.
            </p>
            <form onSubmit={handleSavePrompt} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <textarea
                className="ember-textarea"
                style={{ minHeight: 100, fontSize: 13 }}
                value={systemPrompt}
                onChange={e => setSystemPrompt(e.target.value)}
                placeholder="e.g. Be concise, professional, and always guide visitors to the contact form."
                disabled={savingPrompt}
              />
              {promptMsg && (
                <div style={{
                  fontSize: 13, fontWeight: 600, color: promptMsg.startsWith("✅") ? "#4ade80" : "#f87171",
                  padding: "6px 12px", borderRadius: 6, background: "rgba(0,0,0,0.1)"
                }}>
                  {promptMsg}
                </div>
              )}
              <button
                id="ai-prompt-save"
                type="submit"
                disabled={savingPrompt}
                className="ember-btn ember-btn-secondary ember-btn-md"
                style={{ alignSelf: "flex-start", opacity: savingPrompt ? 0.7 : 1 }}
              >
                {savingPrompt ? "Saving…" : "Update Behavior Prompt"}
              </button>
            </form>
          </div>

          {/* Chat Logs */}
          <div className="ember-card" style={{ display: "flex", flexDirection: "column" }}>
            <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>
              💬 Recent Chat Sessions
            </span>
            {logs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "var(--ember-text-secondary)", fontSize: 14 }}>
                No chat logs yet. The chatbot will log conversations here once visitors start chatting.
              </div>
            ) : (
              <div style={{ overflowX: "auto", margin: "0 -16px -16px" }}>
                <table className="ember-table">
                  <thead>
                    <tr>
                      <th>Session</th>
                      <th>User Question</th>
                      <th>AI Response</th>
                      <th>Tokens</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id}>
                        <td className="ember-code" style={{ fontSize: 12 }}>{log.sessionHash}</td>
                        <td style={{ maxWidth: 200, fontSize: 13 }}>{log.userQuery}</td>
                        <td style={{ maxWidth: 300, fontSize: 13, color: "var(--ember-text-secondary)" }}>
                          {log.aiResponse?.substring(0, 120)}{log.aiResponse?.length > 120 ? "…" : ""}
                        </td>
                        <td style={{ fontWeight: 600 }}>{log.tokens} tkn</td>
                        <td>{formatDateTime(log.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
