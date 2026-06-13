import { useState, useEffect } from "react";
import api from "../hooks/useApi";
import ConfirmModal from "../components/ConfirmModal";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form states
  const [currentExp, setCurrentExp] = useState(null);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bullets, setBullets] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => { loadExperiences(); }, []);

  async function loadExperiences() {
    try {
      const res = await api.get("/experience");
      if (res.data?.success) setExperiences(res.data.data);
    } catch {
      setExperiences([
        { id: 1, role: "Software Engineer Intern", company: "Cyberdyne Systems", location: "Mumbai", startDate: "2025-01", endDate: "2025-06", bullets: ["Built full stack Java REST APIs.", "Designed responsive frontend widgets in React."], displayOrder: 1 }
      ]);
    } finally { setLoading(false); }
  }

  function openModal(exp = null) {
    setCurrentExp(exp);
    setRole(exp ? exp.role : "");
    setCompany(exp ? exp.company : "");
    setLocation(exp ? exp.location || "" : "");
    setStartDate(exp ? exp.startDate || "" : "");
    setEndDate(exp ? exp.endDate || "" : "");
    setBullets(exp && exp.bullets ? exp.bullets.join("\n") : "");
    setDisplayOrder(exp ? exp.displayOrder || 0 : experiences.length + 1);
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const data = {
      role, company, location, startDate, endDate,
      bullets: bullets.split("\n").map((b) => b.trim()).filter(Boolean),
      displayOrder: parseInt(displayOrder),
    };

    try {
      if (currentExp) {
        await api.put(`/experience/${currentExp.id}`, data);
      } else {
        await api.post("/experience", data);
      }
      setModalOpen(false);
      loadExperiences();
    } catch {
      setError("Error saving. Mocks updated.");
      setExperiences(currentExp
        ? experiences.map((ex) => ex.id === currentExp.id ? { ...ex, ...data } : ex)
        : [...experiences, { id: Date.now(), ...data }]);
      setModalOpen(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await api.delete(`/experience/${deleteId}`);
      loadExperiences();
    } catch {
      setExperiences(experiences.filter((e) => e.id !== deleteId));
    } finally { setDeleteId(null); }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 className="ember-heading" style={{ margin: 0 }}>Work Experience</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>Manage career milestones shown on experience section</p>
        </div>
        <button id="add-exp-btn" onClick={() => openModal()} className="ember-btn ember-btn-primary ember-btn-md">+ Add Experience</button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading experiences…</div>
      ) : (
        <div className="ember-card" style={{ overflowX: "auto", padding: 0 }}>
          <table className="ember-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Role & Company</th>
                <th>Duration</th>
                <th>Key Tasks</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.sort((a,b) => a.displayOrder - b.displayOrder).map((exp) => (
                <tr key={exp.id}>
                  <td style={{ fontWeight: 600, width: 60 }}>{exp.displayOrder}</td>
                  <td>
                    <span style={{ fontWeight: 600, display: "block" }}>{exp.role}</span>
                    <span style={{ fontSize: 13, color: "var(--ember-text-secondary)" }}>{exp.company} {exp.location ? `• ${exp.location}` : ""}</span>
                  </td>
                  <td>
                    <span className="ember-badge ember-badge-neutral" style={{ fontSize: 11 }}>{exp.startDate} to {exp.endDate || "Present"}</span>
                  </td>
                  <td>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: "var(--ember-text-secondary)" }}>
                      {exp.bullets?.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </td>
                  <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                    <button onClick={() => openModal(exp)} className="ember-btn ember-btn-ghost ember-btn-sm" style={{ marginRight: 8 }}>Edit</button>
                    <button onClick={() => setDeleteId(exp.id)} className="ember-btn ember-btn-ghost ember-btn-sm" style={{ color: "var(--ember-error)" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="ember-overlay">
          <div className="ember-modal" style={{ width: "90%", maxWidth: 500, maxHeight: "90vh", overflowY: "auto" }}>
            <h3 className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>{currentExp ? "Edit Experience" : "Add Experience"}</h3>
            {error && <div style={{ color: "var(--ember-error)", marginBottom: 12, fontSize: 14 }}>⚠️ {error}</div>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input required className="ember-input" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role title" />
                <input required className="ember-input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input className="ember-input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
                <input type="number" className="ember-input" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input className="ember-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date (YYYY-MM)" />
                <input className="ember-input" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date (or Present)" />
              </div>
              <div>
                <label className="ember-label">Key Achievements (one per line)</label>
                <textarea className="ember-textarea" value={bullets} onChange={(e) => setBullets(e.target.value)} placeholder="Achievements..." />
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 12 }}>
                <button type="button" className="ember-btn ember-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="ember-btn ember-btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Work Experience?"
        message="Are you sure you want to delete this career event? This cannot be undone."
        confirmLabel="Delete"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
