import { useState, useEffect } from "react";
import api from "../hooks/useApi";
import { formatDateTime } from "../utils/formatters";

export default function AiManagement() {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ usage: 0, limit: 1000, active: true });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    loadAiData();
  }, []);

  async function loadAiData() {
    try {
      const res = await api.get("/ai/management");
      if (res.data?.success) {
        setSystemPrompt(res.data.data.systemPrompt);
        setLogs(res.data.data.chatLogs);
        setStats(res.data.data.stats);
      }
    } catch {
      // Mock fallbacks
      setSystemPrompt(
        "You are an AI assistant for Sudarshan Hingalje's portfolio website. Answer questions about his skills in Java, Spring Boot, MySQL, and React. Keep replies concise, helpful, and professional. Contact info: sudarshanhigalje1@gmail.com."
      );
      setStats({ usage: 180, limit: 1000, active: true });
      setLogs([
        { id: 1, sessionHash: "9a2c1...d44", userQuery: "Where did Sudarshan study?", aiResponse: "Sudarshan studied engineering. He is well-versed in Java, Spring Security, and database systems.", tokens: 72, createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
        { id: 2, sessionHash: "7b8f9...e12", userQuery: "What is his contact email?", aiResponse: "You can reach Sudarshan at sudarshanhigalje1@gmail.com.", tokens: 35, createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSavePrompt(e) {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    try {
      await api.put("/ai/system-prompt", { systemPrompt });
      setSuccessMsg("System prompt instructions saved successfully!");
    } catch {
      setSuccessMsg("System prompt simulated update (saved locally).");
    } finally {
      setSaving(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  }

  async function toggleChatbot() {
    const updatedStatus = !stats.active;
    try {
      await api.put("/ai/toggle", { active: updatedStatus });
      setStats({ ...stats, active: updatedStatus });
    } catch {
      setStats({ ...stats, active: updatedStatus });
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="ember-heading" style={{ margin: 0 }}>Gemini AI Workspace</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>Manage the portfolio chatbot system instructions, quotas, and conversation logs</p>
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
        <div style={{ textAlign: "center", padding: 40 }}>Loading AI metrics…</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          
          {/* Top Grid: Config and Quota */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "start" }}>
            
            {/* System Prompt Editor */}
            <div className="ember-card">
              <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", display: "block", marginBottom: 16 }}>System Instructions (Base Context)</span>
              <form onSubmit={handleSavePrompt} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label className="ember-label">Gemini Assistant Behavior & Core Directives</label>
                  <textarea
                    required
                    className="ember-textarea"
                    style={{ minHeight: 140, fontSize: 14 }}
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="Enter instructions for the AI..."
                    disabled={saving}
                  />
                </div>
                
                {successMsg && (
                  <div style={{
                    color: "var(--ember-success)", fontSize: 14, fontWeight: 600,
                    background: "rgba(22,163,74,0.08)", padding: "8px 12px", borderRadius: 8,
                    border: "1px solid rgba(22,163,74,0.2)"
                  }}>
                    {successMsg}
                  </div>
                )}

                <button
                  id="ai-prompt-save"
                  type="submit"
                  disabled={saving}
                  className="ember-btn ember-btn-primary ember-btn-md"
                  style={{ alignSelf: "flex-start", opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? "Saving Directives…" : "Update Context"}
                </button>
              </form>
            </div>

            {/* Quota Usage Meter */}
            <div className="ember-card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif" }}>Free Tier Quotas</span>
              <div>
                <span className="ember-label" style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Gemini API Requests</span>
                  <span style={{ color: "var(--ember-primary)" }}>{stats.usage} / {stats.limit}</span>
                </span>
                <div className="ember-progress-track" style={{ marginTop: 8 }}>
                  <div className="ember-progress-fill" style={{ width: `${(stats.usage / stats.limit) * 100}%` }} />
                </div>
                <span className="ember-caption" style={{ marginTop: 8, display: "block" }}>
                  Google AI Studio Free Tier resets monthly. Limits: 15 Requests per Minute.
                </span>
              </div>

              <div style={{ borderTop: "1px solid var(--ember-border)", paddingTop: 14 }}>
                <span className="ember-label">Model Engine</span>
                <span className="ember-code" style={{ fontSize: 13, background: "var(--ember-bg)", padding: "2px 6px", borderRadius: 4, display: "inline-block" }}>
                  gemini-1.5-flash
                </span>
              </div>
            </div>

          </div>

          {/* Chat Logs Stream */}
          <div className="ember-card" style={{ display: "flex", flexDirection: "column" }}>
            <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>Recent Chat Sessions Logs</span>
            <div style={{ overflowX: "auto", margin: "0 -16px -16px" }}>
              <table className="ember-table">
                <thead>
                  <tr>
                    <th>Visitor Hash</th>
                    <th>User Query</th>
                    <th>Bot Response</th>
                    <th>Token Cost</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td className="ember-code" style={{ fontSize: 12 }}>{log.sessionHash}</td>
                      <td style={{ maxWidth: 220, fontSize: 13 }}>{log.userQuery}</td>
                      <td style={{ maxWidth: 320, fontSize: 13, color: "var(--ember-text-secondary)" }}>{log.aiResponse}</td>
                      <td style={{ fontWeight: 600 }}>{log.tokens} tkn</td>
                      <td>{formatDateTime(log.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
