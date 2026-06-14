import { useState, useEffect } from "react";
import api from "../hooks/useApi";
import ConfirmModal from "../components/ConfirmModal";
import FileUpload from "../components/FileUpload";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form states
  const [currentProject, setCurrentProject] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [techStack, setTechStack] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [credentials, setCredentials] = useState("");

  useEffect(() => { loadProjects(); }, []);

  async function loadProjects() {
    try {
      const res = await api.get("/projects");
      if (res.data?.success) setProjects(res.data.data);
    } catch {
      setProjects([
        { id: 1, title: "E-Commerce App", description: "Spring Boot + React online shopping site.", liveUrl: "https://shop.com", githubUrl: "https://github.com", imageUrl: "", displayOrder: 1, techStack: ["React", "Spring Boot"], isFeatured: true }
      ]);
    } finally { setLoading(false); }
  }

  function openModal(proj = null) {
    setCurrentProject(proj);
    setTitle(proj ? proj.title : "");
    setDesc(proj ? proj.description || "" : "");
    setLiveUrl(proj ? proj.liveUrl || "" : "");
    setGithubUrl(proj ? proj.githubUrl || "" : "");
    setImageUrl(proj ? proj.imageUrl || "" : "");
    setDisplayOrder(proj ? proj.displayOrder || 0 : projects.length + 1);
    setTechStack(proj && proj.techStack ? proj.techStack.join(", ") : "");
    setIsFeatured(proj ? proj.isFeatured || false : false);
    setCredentials(proj ? proj.credentials || "" : "");
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const data = {
      title, description: desc, liveUrl, githubUrl, imageUrl,
      displayOrder: parseInt(displayOrder),
      techStack: techStack.split(",").map((s) => s.trim()).filter(Boolean),
      isFeatured,
      credentials,
    };
    try {
      if (currentProject) {
        await api.put(`/projects/${currentProject.id}`, data);
      } else {
        await api.post("/projects", data);
      }
      setModalOpen(false);
      loadProjects();
    } catch {
      setError("Error saving. Mocks updated.");
      setProjects(currentProject 
        ? projects.map((p) => p.id === currentProject.id ? { ...p, ...data } : p)
        : [...projects, { id: Date.now(), ...data }]);
      setModalOpen(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await api.delete(`/projects/${deleteId}`);
      loadProjects();
    } catch {
      setProjects(projects.filter((p) => p.id !== deleteId));
    } finally { setDeleteId(null); }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 className="ember-heading" style={{ margin: 0 }}>Portfolio Projects</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>Manage work highlights visible on homepage</p>
        </div>
        <button id="add-proj-btn" onClick={() => openModal()} className="ember-btn ember-btn-primary ember-btn-md">+ Add Project</button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading projects…</div>
      ) : (
        <div className="ember-card" style={{ overflowX: "auto", padding: 0 }}>
          <table className="ember-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Tech Stack</th>
                <th>Featured</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.sort((a,b) => a.displayOrder - b.displayOrder).map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600, width: 60 }}>{p.displayOrder}</td>
                  <td>
                    <span style={{ fontWeight: 600, display: "block" }}>{p.title}</span>
                    <span className="ember-caption" style={{ display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: 300 }}>{p.description}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.techStack?.map((t, i) => (
                        <span key={i} className="ember-badge ember-badge-neutral" style={{ fontSize: 11, padding: "1px 6px" }}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`ember-badge ${p.isFeatured ? "ember-badge-success" : "ember-badge-neutral"}`} style={{ fontSize: 11 }}>
                      {p.isFeatured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => openModal(p)} className="ember-btn ember-btn-ghost ember-btn-sm" style={{ marginRight: 8 }}>Edit</button>
                    <button onClick={() => setDeleteId(p.id)} className="ember-btn ember-btn-ghost ember-btn-sm" style={{ color: "var(--ember-error)" }}>Delete</button>
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
            <h3 className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>{currentProject ? "Edit Project" : "Add Project"}</h3>
            {error && <div style={{ color: "var(--ember-error)", marginBottom: 12, fontSize: 14 }}>⚠️ {error}</div>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="ember-label">Project Title</label>
                <input required className="ember-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project title" />
              </div>
              <div>
                <label className="ember-label">Description</label>
                <textarea className="ember-textarea" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Summary description" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="ember-label">Display Order</label>
                  <input type="number" className="ember-input" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 28 }}>
                  <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                  <label htmlFor="isFeatured" className="ember-label" style={{ margin: 0, cursor: "pointer" }}>Featured</label>
                </div>
              </div>
              <div>
                <label className="ember-label">Tech Stack (comma separated)</label>
                <input className="ember-input" value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="React, Spring Boot" />
              </div>
              <div>
                <FileUpload
                  endpoint="/upload/project"
                  accept="image/*"
                  label="Upload Project Preview Image"
                  onUploaded={(url) => setImageUrl(url)}
                />
              </div>
              <div>
                <label className="ember-label">Project Image URL</label>
                <input className="ember-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Auto-populated or project/thewildoasiswebsite.png" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input className="ember-input" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="Live link" />
                <input className="ember-input" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="GitHub link" />
              </div>
              <div>
                <label className="ember-label">Demo Credentials (optional)</label>
                <input className="ember-input" value={credentials} onChange={(e) => setCredentials(e.target.value)} placeholder="e.g. demo@gmail.com / demo@123" />
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
        title="Delete Project?"
        message="Are you sure you want to permanently delete this project? This cannot be undone."
        confirmLabel="Delete"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
