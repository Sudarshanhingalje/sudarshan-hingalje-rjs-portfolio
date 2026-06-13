import { useState, useEffect } from "react";
import api from "../hooks/useApi";
import { formatDateTime, formatDuration } from "../utils/formatters";

export default function Workflows() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({
    webhookActive: true,
    n8nHealthy: true,
    lastChecked: ""
  });

  useEffect(() => {
    loadWorkflowData();
  }, []);

  async function loadWorkflowData() {
    try {
      const res = await api.get("/workflows/status");
      if (res.data?.success) {
        setRuns(res.data.data.runs);
        setStatus(res.data.data.status);
      }
    } catch {
      // Backend offline — empty state, no dummy data
      setRuns([]);
      setStatus({ webhookActive: false, n8nHealthy: false, lastChecked: new Date().toISOString() });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="ember-heading" style={{ margin: 0 }}>n8n Workflows Center</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>Monitor automation cron triggers, webhook statuses, and failed execution notifications</p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading workflow pipelines…</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          
          {/* Webhook & Status widget */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            
            {/* n8n Engine Health */}
            <div className="ember-card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(22,163,74,0.08)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 24
              }}>
                🔗
              </div>
              <div>
                <span className="ember-label" style={{ margin: 0 }}>n8n Server Status</span>
                <span className="ember-badge ember-badge-success" style={{ gap: 6, marginTop: 4 }}>
                  <span className="ember-dot ember-dot-online" style={{ width: 6, height: 6 }} />
                  Connected & Active
                </span>
              </div>
            </div>

            {/* Webhook Receiver Status */}
            <div className="ember-card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(194,65,12,0.08)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 24
              }}>
                📥
              </div>
              <div>
                <span className="ember-label" style={{ margin: 0 }}>Portfolio Webhook endpoint</span>
                <span className="ember-code" style={{ fontSize: 11, background: "var(--ember-bg)", padding: "2px 6px", borderRadius: 4, display: "inline-block", marginTop: 4 }}>
                  /api/v1/webhook/chat
                </span>
              </div>
            </div>

          </div>

          {/* Workflow logs */}
          <div className="ember-card" style={{ display: "flex", flexDirection: "column" }}>
            <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>Workflow Execution Logs</span>
            {runs.length === 0 ? (
              <p className="ember-caption" style={{ textAlign: "center", padding: "28px 0" }}>
                No workflow executions logged yet. Configure n8n to send logs to <code>/api/workflows/log</code>.
              </p>
            ) : (
              <div style={{ overflowX: "auto", margin: "0 -16px -16px" }}>
                <table className="ember-table">
                  <thead>
                    <tr>
                      <th>Workflow Name</th>
                      <th>Execution Status</th>
                      <th>Runtime Duration</th>
                      <th>Error Context</th>
                      <th>Time Executed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {runs.map((r) => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 600 }}>{r.name}</td>
                        <td>
                          <span className={`ember-badge ${
                            r.status === "SUCCESS" ? "ember-badge-success" : "ember-badge-error"
                          }`} style={{ fontSize: 11 }}>
                            {r.status}
                          </span>
                        </td>
                        <td>{formatDuration(Math.round(r.duration / 1000))}</td>
                        <td style={{ color: "var(--ember-error)", fontSize: 12 }}>
                          {r.error || <span style={{ color: "var(--ember-neutral)" }}>—</span>}
                        </td>
                        <td>{formatDateTime(r.createdAt)}</td>
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
