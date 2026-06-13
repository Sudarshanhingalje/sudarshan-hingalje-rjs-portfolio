import { useState } from "react";
import { useLocation } from "react-router-dom";
import HealthMonitor from "./HealthMonitor";
import NotifDropdown from "./NotifDropdown";
import useNotifications from "../hooks/useNotifications";

// ─── Topbar Component ────────────────────────────────────────────────────────
// Sticky top navigation showing current page, system health indicator, notifications.
// Notification count only shows UNSEEN (undismissed) notifications.
// ─────────────────────────────────────────────────────────────────────────────

export default function TopBar() {
  const location             = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const { unseen, dismiss, dismissAll } = useNotifications();

  function getPageTitle(pathname) {
    const path = pathname.split("/").filter(Boolean).pop();
    switch (path) {
      case "dashboard":     return "Dashboard Overview";
      case "analytics":     return "Visitor Analytics";
      case "map":           return "Visitor Location Map";
      case "projects":      return "Portfolio Projects";
      case "experience":    return "Work Experience";
      case "skills":        return "Skills Inventory";
      case "certifications":return "Certifications";
      case "resumes":       return "Resume Manager";
      case "contacts":      return "Contact Inquiries";
      case "ai":            return "Gemini AI Assistant";
      case "workflows":     return "n8n Workflow Center";
      case "security":      return "Security & Auditing";
      case "settings":      return "System Settings";
      default:              return "Admin Workspace";
    }
  }

  const pageTitle   = getPageTitle(location.pathname);
  const notifCount  = unseen.length;

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 90,
      height: 64,
      background: "var(--ember-bg)",
      borderBottom: "1px solid var(--ember-border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 40px",
    }}>
      {/* Title */}
      <div>
        <h2 className="ember-subhead" style={{ margin: 0, fontWeight: 700, fontFamily: "'Playfair Display', serif", fontSize: 22 }}>
          {pageTitle}
        </h2>
      </div>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {/* System Health */}
        <HealthMonitor />

        {/* View Main Site */}
        <a
          id="topbar-view-site"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="ember-btn ember-btn-secondary ember-btn-sm"
          style={{ gap: 6 }}
        >
          <span>🌐</span>
          <span>View Site</span>
          <span style={{ fontSize: 10 }}>↗</span>
        </a>

        {/* Notification Bell Wrapper */}
        <div style={{ position: "relative" }}>
          <button
            id="topbar-notif-bell"
            className="ember-btn ember-btn-ghost"
            style={{
              width: 36, height: 36, borderRadius: "50%", padding: 0, position: "relative",
              background: showNotifications ? "var(--ember-surface-raised)" : "transparent"
            }}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span style={{ fontSize: 18 }}>🔔</span>
            {notifCount > 0 && (
              <span style={{
                position: "absolute", top: 2, right: 2,
                minWidth: 16, height: 16, borderRadius: 8,
                background: "var(--ember-accent)",
                color: "#fff",
                fontSize: 9,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 3px",
                lineHeight: 1,
              }}>
                {notifCount > 9 ? "9+" : notifCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <NotifDropdown
              notifications={unseen}
              onDismiss={dismiss}
              onDismissAll={dismissAll}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
}
