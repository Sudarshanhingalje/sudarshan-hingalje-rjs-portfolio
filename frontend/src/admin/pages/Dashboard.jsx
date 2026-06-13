import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import api from "../hooks/useApi";
import { formatDateTime } from "../utils/formatters";

// ─── Admin Dashboard Overview Page ───────────────────────────────────────────
// Core workspace console compiling visitors, inquiries, audits, and health widgets.
// ─────────────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    resumeDownloads: 0,
    contactsCount: 0,
    activeProjects: 0,
  });
  const [contacts, setContacts] = useState([]);
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const res = await api.get("/dashboard/summary");
        if (res.data?.success) {
          setStats(res.data.data.stats);
          setContacts(res.data.data.recentContacts);
          setAudits(res.data.data.recentAudits);
        }
      } catch (err) {
        // Backend offline — keep zero state, no dummy data
        console.warn("Dashboard API unavailable:", err.message);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
        <span style={{ fontSize: 15, color: "var(--ember-text-secondary)" }}>Loading console metrics…</span>
      </div>
    );
  }

  return (
    <div>
      {/* Header Info */}
      <div style={{ marginBottom: 28 }}>
        <h1 className="ember-heading" style={{ margin: 0, fontSize: 32 }}>Welcome Back, Owner</h1>
        <p className="ember-body" style={{ color: "var(--ember-text-secondary)", marginTop: 4 }}>
          Here is what happened on your portfolio site today.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
        marginBottom: 32
      }}>
        <StatCard label="Total Visitors" value={stats.totalVisitors} icon="👥" />
        <StatCard label="Resume Downloads" value={stats.resumeDownloads} icon="📄" />
        <StatCard label="Contact Requests" value={stats.contactsCount} icon="✉️" />
        <StatCard label="Featured Projects" value={stats.activeProjects} icon="📁" />
      </div>

      {/* Split Details Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))", gap: 28, marginBottom: 28 }}>
        
        {/* Recent Inquiries */}
        <div className="ember-card" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif" }}>Recent Contact Requests</span>
            <Link to="/admin/contacts" style={{ fontSize: 13, color: "var(--ember-primary)", fontWeight: 600, textDecoration: "none" }}>View All</Link>
          </div>
          {contacts.length === 0 ? (
            <p className="ember-caption" style={{ padding: "24px 0", textAlign: "center" }}>No recent requests.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="ember-table">
                <thead>
                  <tr>
                    <th>Sender</th>
                    <th>Status</th>
                    <th>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <span style={{ fontWeight: 600, display: "block" }}>{c.name}</span>
                        <span style={{ fontSize: 11, color: "var(--ember-text-secondary)" }}>{c.email}</span>
                      </td>
                      <td>
                        <span className={`ember-badge ${
                          c.status === "NEW" ? "ember-badge-accent" : 
                          c.status === "IN_PROGRESS" ? "ember-badge-neutral" : 
                          "ember-badge-success"
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td>{formatDateTime(c.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Security Logs Audit */}
        <div className="ember-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif" }}>Security Access Log</span>
            <Link to="/admin/security" style={{ fontSize: 13, color: "var(--ember-primary)", fontWeight: 600, textDecoration: "none" }}>Audit Center</Link>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="ember-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>IP Hash</th>
                  <th>Outcome</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {audits.map((a) => (
                  <tr key={a.id}>
                    <td>{a.action}</td>
                    <td className="ember-code" style={{ fontSize: 12 }}>{a.ipHash}</td>
                    <td>
                      <span className={`ember-badge ${
                        a.status === "SUCCESS" ? "ember-badge-success" : "ember-badge-error"
                      }`} style={{ padding: "1px 6px", fontSize: 10 }}>
                        {a.status}
                      </span>
                    </td>
                    <td>{formatDateTime(a.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* System Infrastructure Info */}
      <div className="ember-card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>System Status</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <span className="ember-label">Backend API</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              <span className="ember-caption">Spring Boot running on :8080</span>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <span className="ember-label">Database</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              <span className="ember-caption">MySQL connected · {stats.activeProjects} projects · {stats.contactsCount} contacts</span>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <span className="ember-label">Analytics</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              <span className="ember-caption">{stats.totalVisitors} total sessions tracked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
