import { useState, useEffect } from "react";
import api from "../hooks/useApi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// ─── Ad Management Page ────────────────────────────────────────────────────────
// Controls what project is shown in the homepage advertisement popup.
// ──────────────────────────────────────────────────────────────────────────────

export default function AdManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Settings state
  const [adEnabled, setAdEnabled] = useState(true);
  const [adMode, setAdMode] = useState("LATEST");
  const [adProjectId, setAdProjectId] = useState("");

  // All projects list for dropdown
  const [projects, setProjects] = useState([]);

  // Live preview state
  const [previewProject, setPreviewProject] = useState(null);

  // ── Load settings + projects on mount ────────────────────────────────────
  useEffect(() => {
    Promise.all([
      api.get("/settings").catch(() => null),
      api.get("/projects").catch(() => null),
    ]).then(([settRes, projRes]) => {
      if (settRes?.data?.success && settRes.data.data) {
        const d = settRes.data.data;
        setAdEnabled(d.adEnabled !== false);
        setAdMode(d.adMode || "LATEST");
        setAdProjectId(d.adProjectId != null ? String(d.adProjectId) : "");
      }
      if (projRes?.data?.success && projRes.data.data) {
        setProjects(projRes.data.data);
      }
      setLoading(false);
    });
  }, []);

  // ── Compute live preview whenever controls change ─────────────────────────
  useEffect(() => {
    if (!adEnabled) { setPreviewProject(null); return; }
    if (adMode === "SPECIFIC" && adProjectId) {
      const found = projects.find((p) => String(p.id) === String(adProjectId));
      setPreviewProject(found || null);
    } else {
      // LATEST — pick the last-added project (highest id)
      if (projects.length > 0) {
        const latest = [...projects].sort((a, b) => b.id - a.id)[0];
        setPreviewProject(latest);
      } else {
        setPreviewProject(null);
      }
    }
  }, [adEnabled, adMode, adProjectId, projects]);

  // ── Save settings ─────────────────────────────────────────────────────────
  async function handleSave() {
    setSaving(true);
    try {
      // Fetch current settings first so we don't clobber other fields
      const settRes = await api.get("/settings");
      const existing = settRes?.data?.data || {};
      await api.put("/settings", {
        ...existing,
        adEnabled,
        adMode,
        adProjectId: adMode === "SPECIFIC" && adProjectId ? Number(adProjectId) : null,
      });
      showToast("✅ Ad settings saved successfully!", "success");
    } catch (err) {
      showToast("❌ Failed to save settings. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  }

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  const resolvedImageUrl = previewProject?.imageUrl
    ? previewProject.imageUrl.startsWith("http")
      ? previewProject.imageUrl
      : `${API_URL.replace("/api", "")}${previewProject.imageUrl}`
    : null;

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
        <div className="ember-caption" style={{ fontSize: 16 }}>Loading ad settings…</div>
      </div>
    );
  }

  return (
    <div>
      {/* ── Toast notification ── */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 9999,
          padding: "12px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14,
          background: toast.type === "success" ? "var(--ember-success, #10b981)" : "var(--ember-error, #ef4444)",
          color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.3s ease",
        }}>{toast.msg}</div>
      )}

      {/* ── Page header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 className="ember-heading" style={{ margin: 0 }}>📢 Project Ads</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)", marginTop: 4 }}>
            Control the advertisement popup shown on your portfolio homepage
          </p>
        </div>
        <button
          id="ad-save-btn"
          onClick={handleSave}
          disabled={saving}
          className="ember-btn ember-btn-primary ember-btn-md"
        >
          {saving ? "Saving…" : "💾 Save Settings"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

        {/* ── Controls card ── */}
        <div className="ember-card" style={{ padding: 24 }}>
          <h3 className="ember-subhead" style={{ marginBottom: 20 }}>Ad Configuration</h3>

          {/* Toggle */}
          <div style={{ marginBottom: 24 }}>
            <label className="ember-label" style={{ marginBottom: 8, display: "block" }}>
              Ad Visibility
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button
                id="ad-toggle"
                onClick={() => setAdEnabled((v) => !v)}
                style={{
                  position: "relative", width: 52, height: 28,
                  borderRadius: 14, border: "none", cursor: "pointer",
                  background: adEnabled ? "var(--ember-primary, #6366f1)" : "var(--ember-border, #d1d5db)",
                  transition: "background 0.25s",
                }}
              >
                <div style={{
                  position: "absolute", top: 3, left: adEnabled ? 26 : 3,
                  width: 22, height: 22, borderRadius: "50%", background: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  transition: "left 0.25s",
                }} />
              </button>
              <span style={{
                fontSize: 13, fontWeight: 600,
                color: adEnabled ? "var(--ember-success, #10b981)" : "var(--ember-text-secondary)",
              }}>
                {adEnabled ? "ACTIVE — Ad is visible on homepage" : "HIDDEN — No ad shown on homepage"}
              </span>
            </div>
          </div>

          {/* Mode selection */}
          <div style={{ marginBottom: 24, opacity: adEnabled ? 1 : 0.4, pointerEvents: adEnabled ? "auto" : "none" }}>
            <label className="ember-label" style={{ marginBottom: 10, display: "block" }}>
              Project Selection Mode
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { value: "LATEST", icon: "⚡", label: "Auto — Always show the latest project", desc: "Automatically displays the most recently added project from the database." },
                { value: "SPECIFIC", icon: "🎯", label: "Manual — Choose a specific project", desc: "Lets you handpick exactly which project to advertise." },
              ].map(({ value, icon, label, desc }) => (
                <label
                  key={value}
                  htmlFor={`mode-${value}`}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                    border: `2px solid ${adMode === value ? "var(--ember-primary, #6366f1)" : "var(--ember-border, #e5e7eb)"}`,
                    background: adMode === value ? "rgba(99,102,241,0.06)" : "transparent",
                    transition: "all 0.2s",
                  }}
                >
                  <input
                    type="radio"
                    id={`mode-${value}`}
                    name="adMode"
                    value={value}
                    checked={adMode === value}
                    onChange={() => setAdMode(value)}
                    style={{ marginTop: 2 }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "var(--ember-text-primary)" }}>
                      {icon} {label}
                    </div>
                    <div className="ember-caption" style={{ marginTop: 2 }}>{desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Specific project dropdown */}
          {adEnabled && adMode === "SPECIFIC" && (
            <div style={{ marginBottom: 8 }}>
              <label className="ember-label" style={{ marginBottom: 8, display: "block" }}>
                Select Project to Advertise
              </label>
              {projects.length === 0 ? (
                <p className="ember-caption">No projects found. Add a project first.</p>
              ) : (
                <select
                  id="ad-project-select"
                  className="ember-input"
                  value={adProjectId}
                  onChange={(e) => setAdProjectId(e.target.value)}
                >
                  <option value="">— Select a project —</option>
                  {projects.map((p) => (
                    <option key={p.id} value={String(p.id)}>
                      #{p.id} — {p.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>

        {/* ── Live preview card ── */}
        <div>
          <div className="ember-card" style={{ padding: 20 }}>
            <h3 className="ember-subhead" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              🖥️ Live Preview
              <span className="ember-caption" style={{ fontWeight: 400 }}>— how the popup looks on homepage</span>
            </h3>

            {!adEnabled ? (
              <div style={{
                textAlign: "center", padding: "40px 20px",
                borderRadius: 12, border: "2px dashed var(--ember-border)",
                color: "var(--ember-text-secondary)", fontSize: 14,
              }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🚫</div>
                <strong>Ad is disabled.</strong>
                <p style={{ margin: "6px 0 0", fontSize: 12 }}>Enable the ad above to see a preview.</p>
              </div>
            ) : !previewProject ? (
              <div style={{
                textAlign: "center", padding: "40px 20px",
                borderRadius: 12, border: "2px dashed var(--ember-border)",
                color: "var(--ember-text-secondary)", fontSize: 14,
              }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>📂</div>
                <strong>No project selected.</strong>
                <p style={{ margin: "6px 0 0", fontSize: 12 }}>
                  {adMode === "SPECIFIC" ? "Choose a project from the dropdown." : "Add a project to see the preview."}
                </p>
              </div>
            ) : (
              /* Popup mockup */
              <div style={{
                display: "flex", borderRadius: 12, overflow: "hidden",
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                border: "1px solid var(--ember-border)",
                background: "var(--ember-surface)",
                maxWidth: 340,
              }}>
                {/* Left pink strip */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "0 8px", background: "#db2777", color: "#fff", minWidth: 28,
                }}>
                  <p style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: 2,
                    writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap",
                  }}>
                    PROJECT
                  </p>
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: "12px 14px" }}>
                  {/* Media */}
                  <div style={{ marginBottom: 10, borderRadius: 8, overflow: "hidden", height: 110, background: "var(--ember-surface-raised)" }}>
                    {resolvedImageUrl ? (
                      <img
                        src={resolvedImageUrl}
                        alt={previewProject.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ember-text-secondary)", fontSize: 12 }}>
                        No image
                      </div>
                    )}
                  </div>

                  {/* Title + link icon */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "#3b82f6" }}>
                      {previewProject.title}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--ember-text-secondary)" }}>↗</span>
                  </div>

                  {/* Credentials */}
                  {previewProject.credentials && (
                    <p style={{ fontSize: 11, fontWeight: 600, color: "#10b981", marginBottom: 6 }}>
                      {previewProject.credentials}
                    </p>
                  )}

                  {/* Tech tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {(previewProject.techStack || []).slice(0, 5).map((t, i) => (
                      <span key={i} style={{
                        fontSize: 10, padding: "2px 8px", borderRadius: 999,
                        background: "var(--ember-surface-raised)",
                        color: "#db2777", fontWeight: 500,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info box */}
          {adEnabled && previewProject && (
            <div className="ember-card" style={{ padding: 16, marginTop: 16, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)" }}>
              <p className="ember-caption" style={{ margin: 0, lineHeight: 1.6 }}>
                <strong>ℹ️ How it works:</strong> The homepage popup fetches <code style={{ background: "var(--ember-surface-raised)", padding: "1px 4px", borderRadius: 4, fontSize: 11 }}>/settings/ad</code> on load and renders this project's details automatically. Any change you save here reflects instantly for all visitors.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
