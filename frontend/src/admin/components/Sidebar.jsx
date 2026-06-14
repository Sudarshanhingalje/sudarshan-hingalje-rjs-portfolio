import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// ─── Sidebar Navigation Component ───────────────────────────────────────────
// Sidebar display with scrolling section links, logo header, and logout control.
// ─────────────────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const { logout, admin } = useAuth();

  const menuSections = [
    {
      title: "Monitor",
      items: [
        { label: "Dashboard", path: "/admin/dashboard", icon: "📊" },
        { label: "Analytics", path: "/admin/analytics", icon: "📈" },
        { label: "Locations Map", path: "/admin/map", icon: "🗺️" },
      ]
    },
    {
      title: "Content",
      items: [
        { label: "Projects", path: "/admin/projects", icon: "📁" },
        { label: "Experience", path: "/admin/experience", icon: "💼" },
        { label: "Skills", path: "/admin/skills", icon: "⚡" },
        { label: "Certifications", path: "/admin/certifications", icon: "🎓" },
        { label: "Resumes", path: "/admin/resumes", icon: "📄" },
        { label: "Project Ads", path: "/admin/ads", icon: "📢" },
      ]
    },
    {
      title: "Interactions & System",
      items: [
        { label: "Contacts", path: "/admin/contacts", icon: "✉️" },
        { label: "AI Assistant", path: "/admin/ai", icon: "🤖" },
        { label: "Workflows (n8n)", path: "/admin/workflows", icon: "⚙️" },
        { label: "Security Center", path: "/admin/security", icon: "🔒" },
        { label: "System Settings", path: "/admin/settings", icon: "🛠️" },
      ]
    }
  ];

  return (
    <aside className="ember-sidebar">
      {/* Brand Logo Header */}
      <div style={{
        padding: "24px 20px 20px",
        borderBottom: "1px solid var(--ember-border)",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 6,
          background: "linear-gradient(135deg, var(--ember-primary), var(--ember-accent))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: "bold", color: "#fff", fontSize: 14,
        }}>
          SH
        </div>
        <div>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "-0.01em",
            color: "var(--ember-text-primary)",
          }}>
            Sudarshan
          </span>
          <span className="ember-overline" style={{ display: "block", fontSize: 9, marginTop: -2 }}>
            Admin Suite
          </span>
        </div>
      </div>

      {/* Navigation Group Items */}
      <div style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {menuSections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: 16 }}>
            <div className="ember-nav-section-label">{section.title}</div>
            {section.items.map((item, itemIdx) => (
              <NavLink
                key={itemIdx}
                to={item.path}
                className={({ isActive }) => `ember-nav-item ${isActive ? "active" : ""}`}
                end={item.path === "dashboard"}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      {/* User Info & Logout Footer */}
      <div style={{
        padding: "16px",
        borderTop: "1px solid var(--ember-border)",
        background: "var(--ember-surface)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "var(--ember-surface-raised)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "600", color: "var(--ember-primary)",
            fontSize: 14, border: "1px solid var(--ember-border)",
          }}>
            {admin?.name ? admin.name.substring(0, 2).toUpperCase() : "AD"}
          </div>
          <div style={{ overflow: "hidden" }}>
            <span style={{
              display: "block", fontSize: 14, fontWeight: 600,
              color: "var(--ember-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
            }}>
              {admin?.name || "Administrator"}
            </span>
            <span className="ember-caption" style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {admin?.email || "admin@portfolio.com"}
            </span>
          </div>
        </div>
        <button
          id="sidebar-logout"
          onClick={logout}
          className="ember-btn ember-btn-ghost ember-btn-sm"
          style={{
            width: "100%", justifyContent: "flex-start", gap: 8,
            color: "var(--ember-error)", background: "rgba(220,38,38,0.04)"
          }}
        >
          <span>🚪</span>
          <span>Logout Session</span>
        </button>
      </div>
    </aside>
  );
}
