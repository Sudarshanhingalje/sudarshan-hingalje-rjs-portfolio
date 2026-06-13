import { useState, useEffect } from "react";
import api from "../hooks/useApi";
import ConfirmModal from "../components/ConfirmModal";
import FileUpload from "../components/FileUpload";

export default function Resumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form states
  const [label, setLabel] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    loadResumes();
  }, []);

  async function loadResumes() {
    try {
      const res = await api.get("/resumes");
      if (res.data?.success) setResumes(res.data.data);
    } catch {
      // Mock fallbacks
      setResumes([
        { id: 1, label: "Sudarshan_Hingalje_Software_Engineer_v1.pdf", pdfUrl: "https://raw.githubusercontent.com/Sudarshanhingalje/portfolio-assets/main/resumes/Sudarshan_Hingalje_v1.pdf", isActive: true, createdAt: "2026-05-10T12:00:00Z" },
        { id: 2, label: "Sudarshan_Hingalje_Backend_v2.pdf", pdfUrl: "https://raw.githubusercontent.com/Sudarshanhingalje/portfolio-assets/main/resumes/Sudarshan_Hingalje_v2.pdf", isActive: false, createdAt: "2026-06-01T08:30:00Z" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(id) {
    try {
      await api.put(`/resumes/${id}/activate`);
      loadResumes();
    } catch {
      // Simulated toggling: enforce single active resume constraint in state
      setResumes(resumes.map((r) => ({
        ...r,
        isActive: r.id === id,
      })));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const data = {
      label,
      pdfUrl,
      isActive: resumes.length === 0, // Auto-activate if it's the first
    };

    try {
      await api.post("/resumes", data);
      setModalOpen(false);
      loadResumes();
    } catch (err) {
      setError("Failed to save resume metadata. Updating state locally.");
      const newResume = {
        id: Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      // If we are activating this, deactivate others
      const list = data.isActive 
        ? resumes.map((r) => ({ ...r, isActive: false })) 
        : resumes;
      setResumes([...list, newResume]);
      setModalOpen(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await api.delete(`/resumes/${deleteId}`);
      loadResumes();
    } catch {
      setResumes(resumes.filter((r) => r.id !== deleteId));
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 className="ember-heading" style={{ margin: 0 }}>Resume Manager</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>Manage resume file versions. Ensure only one is marked active for download</p>
        </div>
        <button id="add-resume-btn" onClick={() => { setLabel(""); setPdfUrl(""); setModalOpen(true); }} className="ember-btn ember-btn-primary ember-btn-md">
          <span>+ Add Resume Version</span>
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading resumes…</div>
      ) : (
        <div className="ember-card" style={{ padding: 0, overflowX: "auto" }}>
          <table className="ember-table">
            <thead>
              <tr>
                <th>Active</th>
                <th>File Label</th>
                <th>Upload Link (GitHub Raw)</th>
                <th>Date Added</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((r) => (
                <tr key={r.id} style={{ background: r.isActive ? "rgba(194,65,12,0.02)" : "transparent" }}>
                  <td style={{ width: 80, verticalAlign: "middle" }}>
                    <button
                      onClick={() => handleToggleActive(r.id)}
                      className={`ember-btn ember-btn-sm ${r.isActive ? "ember-btn-primary" : "ember-btn-secondary"}`}
                      style={{ fontSize: 11, height: 26, padding: "0 10px" }}
                    >
                      {r.isActive ? "Active ✔" : "Activate"}
                    </button>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: r.isActive ? "var(--ember-primary)" : "inherit" }}>
                      {r.label}
                    </span>
                  </td>
                  <td className="ember-code" style={{ fontSize: 12 }}>
                    <a href={r.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ember-text-secondary)", textDecoration: "none" }}>
                      {r.pdfUrl.substring(0, 60)}... ↗
                    </a>
                  </td>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      disabled={r.isActive}
                      onClick={() => setDeleteId(r.id)}
                      className="ember-btn ember-btn-ghost ember-btn-sm"
                      style={{ color: r.isActive ? "var(--ember-neutral)" : "var(--ember-error)", opacity: r.isActive ? 0.4 : 1 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit/Add Overlay Modal */}
      {modalOpen && (
        <div className="ember-overlay">
          <div className="ember-modal" style={{ width: "90%", maxWidth: 460 }}>
            <h3 className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>
              Add Resume Version
            </h3>
            {error && <div style={{ color: "var(--ember-error)", marginBottom: 12, fontSize: 14 }}>⚠️ {error}</div>}
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <FileUpload
                  endpoint="/upload/resume"
                  accept=".pdf"
                  label="Drag & Drop Resume PDF"
                  onUploaded={(url, fileName) => {
                    setPdfUrl(url);
                    if (!label) setLabel(fileName);
                  }}
                />
              </div>
              <div>
                <label className="ember-label">Resume Label</label>
                <input required className="ember-input" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Sudarshan_Hingalje_Developer_2026.pdf" />
              </div>
              <div>
                <label className="ember-label">Selected Resume File URL</label>
                <input required readOnly className="ember-input" value={pdfUrl} placeholder="Auto-populated after drag and drop upload" style={{ background: "var(--ember-surface-raised)", cursor: "not-allowed" }} />
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 12 }}>
                <button type="button" className="ember-btn ember-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="ember-btn ember-btn-primary">Add Version</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Resume Version?"
        message="Are you sure you want to delete this resume version? The main homepage button will stop serving it if it was active."
        confirmLabel="Delete"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
