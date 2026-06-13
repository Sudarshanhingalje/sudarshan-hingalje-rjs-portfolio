import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─── Relative time helper ─────────────────────────────────────────────────────
function relativeTime(iso) {
  if (!iso) return "";
  try {
    const diff = Date.now() - new Date(iso).getTime();
    if (isNaN(diff)) return iso;
    const mins  = Math.floor(diff / 60_000);
    const hours = Math.floor(diff / 3_600_000);
    const days  = Math.floor(diff / 86_400_000);
    if (mins  < 1)   return "Just now";
    if (mins  < 60)  return `${mins}m ago`;
    if (hours < 24)  return `${hours}h ago`;
    return `${days}d ago`;
  } catch {
    return "";
  }
}

// ─── Type → accent colour map ─────────────────────────────────────────────────
const TYPE_COLOR = {
  warning: "var(--ember-accent)",
  info:    "var(--ember-primary)",
  success: "#22c55e",
};

// ─── Notification Dropdown Component ─────────────────────────────────────────
// Props:
//   notifications  – array of unseen notification objects (from useNotifications)
//   onDismiss(id)  – permanently hide one notification
//   onDismissAll() – permanently hide all notifications
//   onClose()      – close the dropdown
// ─────────────────────────────────────────────────────────────────────────────

export default function NotifDropdown({ notifications = [], onDismiss, onDismissAll, onClose }) {
  const containerRef = useRef(null);

  // Close when clicked outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: "44px",
        right: 0,
        width: 340,
        background: "var(--ember-bg)",
        border: "1px solid var(--ember-border)",
        borderRadius: 12,
        boxShadow: "var(--shadow-modal)",
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={{
        padding: "12px 16px",
        borderBottom: "1px solid var(--ember-border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "var(--ember-surface)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ember-text-primary)" }}>
            Notifications
          </span>
          {notifications.length > 0 && (
            <span style={{
              background: "var(--ember-accent)",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              borderRadius: 10,
              padding: "1px 7px",
            }}>
              {notifications.length}
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {notifications.length > 0 && (
            <button
              className="ember-btn ember-btn-ghost ember-btn-sm"
              style={{ padding: "2px 8px", height: "auto", fontSize: 11 }}
              onClick={() => { onDismissAll?.(); }}
              title="Mark all as read"
            >
              Clear all
            </button>
          )}
          <button
            className="ember-btn ember-btn-ghost ember-btn-sm"
            style={{ padding: "2px 8px", height: "auto", fontSize: 11 }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>

      {/* ── Notifications List ──────────────────────────────────────────── */}
      <div style={{ maxHeight: 320, overflowY: "auto" }}>
        {notifications.length === 0 ? (
          /* Empty state */
          <div style={{
            padding: "36px 16px",
            textAlign: "center",
            color: "var(--ember-neutral)",
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔕</div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>All caught up!</p>
            <p style={{ margin: "4px 0 0", fontSize: 12 }}>No new notifications.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "11px 14px",
                borderBottom: "1px solid var(--ember-border)",
                display: "flex",
                gap: 11,
                alignItems: "flex-start",
                transition: "background var(--transition-fast)",
                position: "relative",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ember-surface)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Accent stripe */}
              <div style={{
                position: "absolute",
                left: 0, top: 0, bottom: 0,
                width: 3,
                borderRadius: "3px 0 0 3px",
                background: TYPE_COLOR[item.type] || "var(--ember-primary)",
              }} />

              {/* Icon */}
              <span style={{ fontSize: 18, marginTop: 1, flexShrink: 0 }}>{item.icon}</span>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  display: "block", fontSize: 13, fontWeight: 600,
                  color: "var(--ember-text-primary)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {item.title}
                </span>
                <p className="ember-caption" style={{
                  margin: "2px 0 4px", fontSize: 12, lineHeight: 1.4,
                  color: "var(--ember-text-secondary)",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {item.desc}
                </p>
                <span style={{ fontSize: 10, color: "var(--ember-neutral)" }}>
                  {relativeTime(item.time)}
                </span>
              </div>

              {/* Dismiss (×) button — permanently hides this notification */}
              <button
                title="Dismiss permanently"
                onClick={(e) => { e.stopPropagation(); onDismiss?.(item.id); }}
                style={{
                  flexShrink: 0,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ember-neutral)",
                  fontSize: 15,
                  lineHeight: 1,
                  padding: "0 2px",
                  marginTop: 1,
                  borderRadius: 4,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ember-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ember-neutral)")}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <div style={{
        padding: 10,
        textAlign: "center",
        background: "var(--ember-surface)",
        borderTop: "1px solid var(--ember-border)",
      }}>
        <Link
          to="security"
          onClick={onClose}
          style={{
            fontSize: 12, fontWeight: 600, color: "var(--ember-primary)",
            textDecoration: "none", display: "inline-block",
          }}
        >
          View Full Security Audit Log →
        </Link>
      </div>
    </div>
  );
}
