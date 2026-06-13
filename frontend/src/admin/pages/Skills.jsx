import { useState, useEffect } from "react";
import api from "../hooks/useApi";
import ConfirmModal from "../components/ConfirmModal";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form states
  const [currentSkill, setCurrentSkill] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Backend");
  const [proficiency, setProficiency] = useState(80);

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    try {
      const res = await api.get("/skills");
      if (res.data?.success) setSkills(res.data.data);
    } catch {
      // Mock fallbacks
      setSkills([
        { id: 1, name: "Java & Spring Boot", category: "Backend", proficiency: 90 },
        { id: 2, name: "MySQL / SQL", category: "Database", proficiency: 85 },
        { id: 3, name: "React / JavaScript", category: "Frontend", proficiency: 80 },
        { id: 4, name: "Git / GitHub", category: "Tools", proficiency: 75 },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setCurrentSkill(null);
    setName("");
    setCategory("Backend");
    setProficiency(80);
    setModalOpen(true);
  }

  function openEditModal(sk) {
    setCurrentSkill(sk);
    setName(sk.name);
    setCategory(sk.category);
    setProficiency(sk.proficiency);
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const data = {
      name,
      category,
      proficiency: parseInt(proficiency),
    };

    try {
      if (currentSkill) {
        await api.put(`/skills/${currentSkill.id}`, data);
      } else {
        await api.post("/skills", data);
      }
      setModalOpen(false);
      loadSkills();
    } catch (err) {
      setError("Failed to save skill. Saving to local state mockup.");
      const updated = currentSkill
        ? skills.map((s) => (s.id === currentSkill.id ? { ...s, ...data } : s))
        : [...skills, { id: Date.now(), ...data }];
      setSkills(updated);
      setModalOpen(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await api.delete(`/skills/${deleteId}`);
      loadSkills();
    } catch {
      setSkills(skills.filter((s) => s.id !== deleteId));
    } finally {
      setDeleteId(null);
    }
  }

  // Helper to group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 className="ember-heading" style={{ margin: 0 }}>Skills Inventory</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>Manage frontend, backend, database, and tool proficiency ratings</p>
        </div>
        <button id="add-skill-btn" onClick={openAddModal} className="ember-btn ember-btn-primary ember-btn-md">
          <span>+ Add Skill</span>
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading skills…</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {categories.map((cat) => (
            <div key={cat} className="ember-card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", borderBottom: "1px solid var(--ember-border)", paddingBottom: 8 }}>
                {cat}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {skills
                  .filter((s) => s.category === cat)
                  .map((s) => (
                    <div key={s.id}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                        <span style={{ color: "var(--ember-text-primary)" }}>{s.name}</span>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{ color: "var(--ember-primary)" }}>{s.proficiency}%</span>
                          <button onClick={() => openEditModal(s)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, padding: 0 }} title="Edit">✏️</button>
                          <button onClick={() => setDeleteId(s.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, padding: 0 }} title="Delete">❌</button>
                        </div>
                      </div>
                      <div className="ember-progress-track">
                        <div className="ember-progress-fill" style={{ width: `${s.proficiency}%` }} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Add Overlay Modal */}
      {modalOpen && (
        <div className="ember-overlay">
          <div className="ember-modal" style={{ width: "90%", maxWidth: 400 }}>
            <h3 className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>
              {currentSkill ? "Edit Skill" : "Add Skill"}
            </h3>
            {error && <div style={{ color: "var(--ember-error)", marginBottom: 12, fontSize: 14 }}>⚠️ {error}</div>}
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="ember-label">Skill Name</label>
                <input required className="ember-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Java, Docker" />
              </div>
              <div>
                <label className="ember-label">Category Group</label>
                <select className="ember-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Database">Database & Cache</option>
                  <option value="Tools">Tools & DevOps</option>
                </select>
              </div>
              <div>
                <label className="ember-label" style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Proficiency Rating</span>
                  <span style={{ color: "var(--ember-primary)", fontWeight: "bold" }}>{proficiency}%</span>
                </label>
                <input type="range" min="10" max="100" step="5" style={{ width: "100%", accentColor: "var(--ember-primary)", height: 8 }} value={proficiency} onChange={(e) => setProficiency(e.target.value)} />
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 12 }}>
                <button type="button" className="ember-btn ember-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="ember-btn ember-btn-primary">Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Skill?"
        message="Are you sure you want to remove this skill from the portfolio display? This cannot be undone."
        confirmLabel="Delete"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
