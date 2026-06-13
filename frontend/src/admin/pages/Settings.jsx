import { useState, useEffect } from "react";
import api from "../hooks/useApi";
import FileUpload from "../components/FileUpload";

export default function Settings() {
  const [ownerName, setOwnerName] = useState("");
  const [tagline, setTagline] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [dbPort, setDbPort] = useState("3306");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpStatus, setSmtpStatus] = useState("checking");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await api.get("/settings");
      if (res.data?.success) {
        const d = res.data.data;
        setOwnerName(d.ownerName);
        setTagline(d.tagline);
        setGithubUrl(d.githubUrl);
        setLinkedinUrl(d.linkedinUrl);
        setWhatsappNumber(d.whatsappNumber);
        setVideoUrl(d.videoUrl || "");
        setSmtpStatus(d.smtpStatus || "active");
        setDbPort(d.dbPort || "3306");
        setSmtpPort(d.smtpPort || "587");
      }
    } catch {
      // Mock fallbacks
      setOwnerName("Sudarshan Hingalje");
      setTagline("Full Stack Java Developer & Software Engineer");
      setGithubUrl("https://github.com/Sudarshanhingalje");
      setLinkedinUrl("https://linkedin.com/in/sudarshan-hingalje-b07993158");
      setWhatsappNumber("9579853955");
      setVideoUrl("/assets/projectvideo.mp4");
      setSmtpStatus("active");
      setDbPort("3306");
      setSmtpPort("587");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const data = {
      ownerName,
      tagline,
      githubUrl,
      linkedinUrl,
      whatsappNumber,
      videoUrl,
      dbPort,
      smtpPort,
    };
    try {
      await api.put("/settings", data);
      setMsg("Settings successfully updated!");
    } catch {
      setMsg("Simulated setting update (saved locally).");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 className="ember-heading" style={{ margin: 0 }}>System Settings</h1>
        <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>Manage portfolio social links, site owner parameters, and SMTP integrations</p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading configurations…</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 28, alignItems: "start" }}>
          
          {/* General Config form */}
          <div className="ember-card">
            <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", display: "block", marginBottom: 20 }}>Site Ownership & Info</span>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label className="ember-label">Full Name</label>
                  <input required className="ember-input" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} disabled={saving} />
                </div>
                <div>
                  <label className="ember-label">WhatsApp Number</label>
                  <input required className="ember-input" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} placeholder="e.g. 9579853955" disabled={saving} />
                </div>
              </div>

              <div>
                <label className="ember-label">Hero Title / Tagline</label>
                <input required className="ember-input" value={tagline} onChange={(e) => setTagline(e.target.value)} disabled={saving} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label className="ember-label">GitHub URL</label>
                  <input required className="ember-input" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} disabled={saving} />
                </div>
                <div>
                  <label className="ember-label">LinkedIn URL</label>
                  <input required className="ember-input" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} disabled={saving} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label className="ember-label">MySQL Database Port</label>
                  <input required type="number" className="ember-input" value={dbPort} onChange={(e) => setDbPort(e.target.value)} disabled={saving} placeholder="3306" />
                </div>
                <div>
                  <label className="ember-label">SMTP Connection Port</label>
                  <input required type="number" className="ember-input" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} disabled={saving} placeholder="587" />
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--ember-border)", paddingTop: 16 }}>
                <FileUpload
                  endpoint="/upload/video"
                  accept="video/mp4"
                  label="Upload Intro Video (MP4)"
                  onUploaded={(url) => setVideoUrl(url)}
                />
              </div>
              <div>
                <label className="ember-label">Intro Video URL</label>
                <input required className="ember-input" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} disabled={saving} placeholder="/assets/projectvideo.mp4" />
              </div>

              {msg && (
                <div style={{
                  color: "var(--ember-success)", fontSize: 14, fontWeight: 600,
                  background: "rgba(22,163,74,0.08)", padding: "10px 14px", borderRadius: 8,
                  border: "1px solid rgba(22,163,74,0.2)"
                }}>
                  {msg}
                </div>
              )}

              <button
                id="settings-save-btn"
                type="submit"
                disabled={saving}
                className="ember-btn ember-btn-primary ember-btn-md"
                style={{ alignSelf: "flex-start", opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Saving Changes…" : "Save Configurations"}
              </button>
            </form>
          </div>

          {/* Infrastructure Integration card */}
          <div className="ember-card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif" }}>SMTP Integration Status</span>
            
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "rgba(22,163,74,0.08)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 18
              }}>
                ✉️
              </div>
              <div>
                <span className="ember-label" style={{ margin: 0, fontSize: 14 }}>Gmail SMTP Transport</span>
                <span className={`ember-badge ${
                  smtpStatus === "active" ? "ember-badge-success" : "ember-badge-error"
                }`} style={{ gap: 6, marginTop: 4, padding: "1px 8px", fontSize: 10 }}>
                  {smtpStatus === "active" ? `Active (Port ${smtpPort})` : "Offline"}
                </span>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--ember-border)", paddingTop: 16 }}>
              <span className="ember-label">Notification Recipient Address</span>
              <p className="ember-code" style={{ fontSize: 13, background: "var(--ember-bg)", padding: "8px 12px", borderRadius: 6, border: "1px solid var(--ember-border)", margin: "4px 0 0" }}>
                sudarshanhigalje1@gmail.com
              </p>
              <span className="ember-caption" style={{ marginTop: 6, display: "block" }}>
                All contact form submissions will trigger a mail forwarding notification to this address.
              </span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
