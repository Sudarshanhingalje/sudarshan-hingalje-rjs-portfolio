import { useState, useRef } from "react";
import api from "../hooks/useApi";

// ─── Drag & Drop File Upload Component ───────────────────────────────────────
// Uploads file to Spring Boot → GitHub API → Returns download URL
// Props:
//   endpoint: "/upload/resume" | "/upload/certificate" | "/upload/project" | "/upload/video"
//   accept: e.g. "application/pdf" | "image/*" | "video/mp4"
//   label: Display text
//   onUploaded: callback(url, fileName) called after success
// ─────────────────────────────────────────────────────────────────────────────

export default function FileUpload({ endpoint, accept, label, onUploaded }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) uploadFile(file);
  };

  async function uploadFile(file) {
    setError("");
    setSuccess("");
    setUploading(true);
    setProgress(10);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setProgress(40);
      const res = await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded / e.total) * 60) + 30;
          setProgress(Math.min(pct, 90));
        },
      });
      setProgress(100);
      if (res.data?.success) {
        setSuccess(`✅ Uploaded: ${res.data.fileName}`);
        if (onUploaded) onUploaded(res.data.url, res.data.fileName);
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch (e) {
      setError("Upload error: " + (e.response?.data?.message || e.message));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="ember-label">{label}</label>

      {/* Drop Zone */}
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragging ? "var(--ember-primary)" : "var(--ember-border)"}`,
          borderRadius: 10,
          padding: "28px 16px",
          textAlign: "center",
          cursor: uploading ? "not-allowed" : "pointer",
          background: dragging ? "rgba(194,65,12,0.05)" : "var(--ember-bg)",
          transition: "all 0.2s ease",
          opacity: uploading ? 0.7 : 1,
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>
          {uploading ? "⏳" : "📁"}
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ember-text-primary)", margin: 0 }}>
          {uploading ? "Uploading to GitHub…" : "Drag & Drop file here"}
        </p>
        <p className="ember-caption" style={{ margin: "4px 0 10px" }}>
          or click to Choose File
        </p>
        <span className="ember-badge ember-badge-neutral" style={{ fontSize: 11 }}>
          {accept}
        </span>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Progress Bar */}
      {uploading && (
        <div style={{ marginTop: 10 }}>
          <div className="ember-progress-track">
            <div className="ember-progress-fill" style={{ width: `${progress}%`, transition: "width 0.3s" }} />
          </div>
          <span className="ember-caption" style={{ display: "block", marginTop: 4 }}>
            Uploading to GitHub repository… {progress}%
          </span>
        </div>
      )}

      {/* Status messages */}
      {success && (
        <div style={{
          marginTop: 10, padding: "8px 12px", borderRadius: 8, fontSize: 13,
          background: "rgba(22,163,74,0.08)", color: "var(--ember-success)",
          border: "1px solid rgba(22,163,74,0.2)"
        }}>
          {success}
        </div>
      )}
      {error && (
        <div style={{
          marginTop: 10, padding: "8px 12px", borderRadius: 8, fontSize: 13,
          background: "rgba(220,38,38,0.08)", color: "var(--ember-error)",
          border: "1px solid rgba(220,38,38,0.2)"
        }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
