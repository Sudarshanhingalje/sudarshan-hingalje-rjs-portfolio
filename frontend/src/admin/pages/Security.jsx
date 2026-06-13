import { useState, useEffect } from "react";
import api from "../hooks/useApi";
import { formatDateTime } from "../utils/formatters";

export default function Security() {
  const [attempts, setAttempts] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [lockoutStatus, setLockoutStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSecurityData();
  }, []);

  async function loadSecurityData() {
    try {
      const res = await api.get("/security/audit");
      if (res.data?.success) {
        setAttempts(res.data.data.attempts);
        setSessions(res.data.data.sessions);
        setLockoutStatus(res.data.data.lockout);
      }
    } catch {
      // Backend offline — empty state, no dummy data
      setAttempts([]);
      setSessions([]);
      setLockoutStatus({ isLocked: false, failuresCount: 0, lockoutTimeRemaining: 0 });
    } finally {
      setLoading(false);
    }
  }

  async function handleRevokeSession(sessionId) {
    try {
      await api.delete(`/security/sessions/${sessionId}`);
      loadSecurityData();
    } catch {
      // Offline fallback: delete from local state
      setSessions(sessions.filter((s) => s.id !== sessionId));
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 className="ember-heading" style={{ margin: 0 }}>Security Center</h1>
        <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>Audit failed login attempts, review active sessions, and configure session lockouts</p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading security telemetry…</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          
          {/* Lockout status banner */}
          <div className="ember-card" style={{
            background: lockoutStatus?.isLocked ? "rgba(220,38,38,0.04)" : "rgba(22,163,74,0.02)",
            border: lockoutStatus?.isLocked ? "1px solid rgba(220,38,38,0.2)" : "1px solid var(--ember-border)",
            padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div>
              <span className="ember-label" style={{ margin: 0, fontSize: 15 }}>Brute-Force Protection Status</span>
              <p className="ember-caption" style={{ marginTop: 2 }}>
                Server-side security lockout active: 5 failed login attempts triggers a 15-minute lock.
              </p>
            </div>
            <div>
              {lockoutStatus?.isLocked ? (
                <span className="ember-badge ember-badge-error">Locked for {lockoutStatus.lockoutTimeRemaining}m</span>
              ) : (
                <span className="ember-badge ember-badge-success">Monitoring Active</span>
              )}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 28, alignItems: "start" }}>
            
            {/* Active Sessions list */}
            <div className="ember-card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>Active Dashboard Sessions</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {sessions.length === 0 ? (
                  <p className="ember-caption" style={{ textAlign: "center", padding: "24px 0" }}>No active sessions found.</p>
                ) : sessions.map((s) => (
                  <div key={s.id} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    borderBottom: "1px solid var(--ember-border)", paddingBottom: 12
                  }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: 13.5, display: "block" }}>{s.browser}</span>
                      <span className="ember-caption" style={{ display: "block" }}>IP Hash: {s.ipHash}</span>
                      <span className="ember-caption" style={{ fontSize: 10 }}>Logged in: {formatDateTime(s.loginTime)}</span>
                    </div>
                    <div>
                      {s.active ? (
                        <button
                          onClick={() => handleRevokeSession(s.id)}
                          className="ember-btn ember-btn-secondary ember-btn-sm"
                          style={{ color: "var(--ember-error)", borderColor: "rgba(220,38,38,0.2)" }}
                        >
                          Revoke
                        </button>
                      ) : (
                        <span className="ember-caption" style={{ fontStyle: "italic" }}>Expired</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Logs list */}
            <div className="ember-card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>Failed Login Audit Stream</span>
              <div style={{ overflowX: "auto", margin: "0 -16px -16px" }}>
                {attempts.filter((a) => a.outcome === "FAILED").length === 0 ? (
                  <p className="ember-caption" style={{ textAlign: "center", padding: "24px 0" }}>No failed login attempts. 🎉</p>
                ) : (
                  <table className="ember-table">
                    <thead>
                      <tr>
                        <th>IP Hash</th>
                        <th>OS/Browser</th>
                        <th>Timestamp</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attempts.filter((a) => a.outcome === "FAILED").map((a) => (
                        <tr key={a.id}>
                          <td className="ember-code" style={{ fontSize: 12 }}>{a.ipHash}</td>
                          <td>{a.browser}</td>
                          <td style={{ fontSize: 12 }}>{formatDateTime(a.createdAt)}</td>
                          <td>
                            <span className="ember-badge ember-badge-error" style={{ fontSize: 10, padding: "1px 6px" }}>
                              {a.failureReason}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
