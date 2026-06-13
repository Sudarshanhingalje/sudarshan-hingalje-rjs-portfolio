import { useState, useEffect } from "react";
import api from "../hooks/useApi";
import { formatDateTime, formatDuration } from "../utils/formatters";

export default function Analytics() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    browsers: {},
    devices: {},
    pages: {}
  });

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await api.get("/analytics/summary");
        if (res.data?.success) {
          setLogs(res.data.data.logs);
          setSummary(res.data.data.summary);
        }
      } catch {
        // Backend offline — show empty state, no dummy data
        setLogs([]);
        setSummary({ browsers: {}, devices: {}, pages: {} });
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 className="ember-heading" style={{ margin: 0 }}>Visitor Analytics</h1>
        <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>Privacy-friendly traffic monitor tracking visits, browsers, and pages</p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading analytics logs…</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          
          {/* Breakdown cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            
            {/* Devices Card */}
            <div className="ember-card">
              <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", display: "block", marginBottom: 16 }}>Top Devices</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {Object.keys(summary.devices).length === 0 ? (
                  <p className="ember-caption" style={{ textAlign: "center", padding: "16px 0" }}>No device data yet.</p>
                ) : Object.entries(summary.devices).map(([device, percentage]) => (
                  <div key={device}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                      <span>{device === "Desktop" ? "💻 Desktop" : device === "Mobile" ? "📱 Mobile" : "📟 Tablet"}</span>
                      <span style={{ color: "var(--ember-primary)" }}>{percentage}%</span>
                    </div>
                    <div className="ember-progress-track">
                      <div className="ember-progress-fill" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browsers Card */}
            <div className="ember-card">
              <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", display: "block", marginBottom: 16 }}>Browser Share</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {Object.keys(summary.browsers).length === 0 ? (
                  <p className="ember-caption" style={{ textAlign: "center", padding: "16px 0" }}>No browser data yet.</p>
                ) : Object.entries(summary.browsers).map(([browser, val]) => (
                  <div key={browser}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                      <span>🌐 {browser}</span>
                      <span style={{ color: "var(--ember-primary)" }}>{val}%</span>
                    </div>
                    <div className="ember-progress-track">
                      <div className="ember-progress-fill" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Page views Card */}
            <div className="ember-card">
              <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", display: "block", marginBottom: 16 }}>Popular Pages</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {Object.keys(summary.pages).length === 0 ? (
                  <p className="ember-caption" style={{ textAlign: "center", padding: "16px 0" }}>No page data yet.</p>
                ) : Object.entries(summary.pages).map(([page, views]) => (
                  <div key={page} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid var(--ember-border)", paddingBottom: 6 }}>
                    <span className="ember-code" style={{ color: "var(--ember-text-secondary)" }}>{page}</span>
                    <span style={{ fontWeight: 600 }}>{views} views</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Detailed Sessions Table */}
          <div className="ember-card" style={{ display: "flex", flexDirection: "column" }}>
            <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>Live Traffic Stream</span>
            {logs.length === 0 ? (
              <p className="ember-caption" style={{ textAlign: "center", padding: "28px 0" }}>No visitor sessions recorded yet. Visits will appear here automatically.</p>
            ) : (
              <div style={{ overflowX: "auto", margin: "0 -16px -16px" }}>
                <table className="ember-table">
                  <thead>
                    <tr>
                      <th>Anonymized IP</th>
                      <th>Location</th>
                      <th>Device &amp; OS</th>
                      <th>Browser</th>
                      <th>Duration</th>
                      <th>Views</th>
                      <th>Visit Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id}>
                        <td className="ember-code" style={{ fontSize: 12 }}>{log.ipHash}</td>
                        <td>
                          <span style={{ fontWeight: 600, display: "block" }}>{log.country}</span>
                          <span className="ember-caption">{log.city}</span>
                        </td>
                        <td>
                          <span style={{ display: "block" }}>{log.device}</span>
                          <span className="ember-caption">{log.os}</span>
                        </td>
                        <td>{log.browser}</td>
                        <td>{formatDuration(log.sessionDuration)}</td>
                        <td style={{ fontWeight: 600 }}>{log.pageViews}</td>
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
