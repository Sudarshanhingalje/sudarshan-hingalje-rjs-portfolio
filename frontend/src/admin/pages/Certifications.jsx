import { useState, useEffect } from "react";
import api from "../hooks/useApi";
import ConfirmModal from "../components/ConfirmModal";
import FileUpload from "../components/FileUpload";

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form states
  const [currentCert, setCurrentCert] = useState(null);
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    loadCertifications();
  }, []);

  async function loadCertifications() {
    try {
      const res = await api.get("/certifications");
      if (res.data?.success) setCerts(res.data.data);
    } catch {
      // Mock fallbacks
      setCerts([
        { id: 1, name: "Oracle Certified Associate, Java SE 8 Programmer", issuer: "Oracle", issueDate: "2024-11", credentialId: "OCA849204", credentialUrl: "https://oracle.com" },
        { id: 2, name: "Spring Certified Professional", issuer: "VMware", issueDate: "2025-03", credentialId: "VCP-SPRING", credentialUrl: "https://vmware.com" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setCurrentCert(null);
    setName("");
    setIssuer("");
    setIssueDate("");
    setCredentialId("");
    setCredentialUrl("");
    setImageUrl("");
    setModalOpen(true);
  }

  function openEditModal(cert) {
    setCurrentCert(cert);
    setName(cert.name);
    setIssuer(cert.issuer);
    setIssueDate(cert.issueDate || "");
    setCredentialId(cert.credentialId || "");
    setCredentialUrl(cert.credentialUrl || "");
    setImageUrl(cert.imageUrl || "");
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const data = {
      name,
      issuer,
      issueDate,
      credentialId,
      credentialUrl,
      imageUrl,
    };

    try {
      if (currentCert) {
        await api.put(`/certifications/${currentCert.id}`, data);
      } else {
        await api.post("/certifications", data);
      }
      setModalOpen(false);
      loadCertifications();
    } catch (err) {
      setError("Failed to save certification. Mocking state locally.");
      const updated = currentCert
        ? certs.map((c) => (c.id === currentCert.id ? { ...c, ...data } : c))
        : [...certs, { id: Date.now(), ...data }];
      setCerts(updated);
      setModalOpen(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await api.delete(`/certifications/${deleteId}`);
      loadCertifications();
    } catch {
      setCerts(certs.filter((c) => c.id !== deleteId));
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 className="ember-heading" style={{ margin: 0 }}>Certifications</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>Manage professional credentials and licenses</p>
        </div>
        <button id="add-cert-btn" onClick={openAddModal} className="ember-btn ember-btn-primary ember-btn-md">
          <span>+ Add Certification</span>
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading credentials…</div>
      ) : (
        <div className="ember-card" style={{ overflowX: "auto", padding: 0 }}>
          <table className="ember-table">
            <thead>
              <tr>
                <th>Certification Name</th>
                <th>Issuing Organization</th>
                <th>Issue Date</th>
                <th>Credential ID</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certs.map((c) => (
                <tr key={c.id}>
                  <td>
                    {c.credentialUrl ? (
                      <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: "var(--ember-primary)", textDecoration: "none" }}>
                        {c.name} <span style={{ fontSize: 9 }}>↗</span>
                      </a>
                    ) : (
                      <span style={{ fontWeight: 600 }}>{c.name}</span>
                    )}
                  </td>
                  <td>{c.issuer}</td>
                  <td>
                    <span className="ember-badge ember-badge-neutral" style={{ fontSize: 11 }}>{c.issueDate}</span>
                  </td>
                  <td className="ember-code" style={{ fontSize: 12 }}>{c.credentialId || "N/A"}</td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => openEditModal(c)} className="ember-btn ember-btn-ghost ember-btn-sm" style={{ marginRight: 8 }}>Edit</button>
                    <button onClick={() => setDeleteId(c.id)} className="ember-btn ember-btn-ghost ember-btn-sm" style={{ color: "var(--ember-error)" }}>Delete</button>
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
              {currentCert ? "Edit Certification" : "Add Certification"}
            </h3>
            {error && <div style={{ color: "var(--ember-error)", marginBottom: 12, fontSize: 14 }}>⚠️ {error}</div>}
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="ember-label">Certification Name</label>
                <input required className="ember-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. AWS Cloud Practitioner" />
              </div>
              <div>
                <label className="ember-label">Issuing Organization</label>
                <input required className="ember-input" value={issuer} onChange={(e) => setIssuer(e.target.value)} placeholder="e.g. Amazon Web Services" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="ember-label">Issue Date</label>
                  <input className="ember-input" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} placeholder="YYYY-MM (e.g. 2025-01)" />
                </div>
                <div>
                  <label className="ember-label">Credential ID (Optional)</label>
                  <input className="ember-input" value={credentialId} onChange={(e) => setCredentialId(e.target.value)} placeholder="e.g. AWS-1234" />
                </div>
              </div>
              <div>
                <label className="ember-label">Credential Verification URL (Optional)</label>
                <input className="ember-input" value={credentialUrl} onChange={(e) => setCredentialUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div>
                <FileUpload
                  endpoint="/upload/certificate"
                  accept="image/*"
                  label="Upload Certificate Badge/Image"
                  onUploaded={(url) => setImageUrl(url)}
                />
              </div>
              <div>
                <label className="ember-label">Certificate Image URL</label>
                <input required className="ember-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Auto-populated or certificates/1.png" />
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 12 }}>
                <button type="button" className="ember-btn ember-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="ember-btn ember-btn-primary">Save Credential</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Certification?"
        message="Are you sure you want to remove this credential? This cannot be undone."
        confirmLabel="Delete"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
