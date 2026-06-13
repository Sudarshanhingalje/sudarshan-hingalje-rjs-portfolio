import { useState, useEffect } from "react";
import api from "../hooks/useApi";
import { formatDateTime } from "../utils/formatters";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    try {
      const res = await api.get("/contacts");
      if (res.data?.success) setContacts(res.data.data);
    } catch {
      // Backend offline — empty state, no dummy data
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      await api.put(`/contacts/${id}/status`, { status: newStatus });
      loadContacts();
    } catch {
      // Offline fallback: update local state
      const updated = contacts.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
      setContacts(updated);
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }
    }
  }

  const filteredContacts = filter === "ALL" 
    ? contacts 
    : contacts.filter((c) => c.status === filter);

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="ember-heading" style={{ margin: 0 }}>Contact Inquiries</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>View and manage correspondence from portfolio visitors</p>
        </div>
        {/* Status filters */}
        <div style={{ display: "flex", gap: 8, background: "var(--ember-surface)", padding: 4, borderRadius: 8, border: "1px solid var(--ember-border)" }}>
          {["ALL", "NEW", "IN_PROGRESS", "REPLIED", "ARCHIVED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="ember-btn ember-btn-sm"
              style={{
                background: filter === s ? "var(--ember-primary)" : "transparent",
                color: filter === s ? "#fff" : "var(--ember-text-secondary)",
                borderRadius: 6,
                fontSize: 12,
              }}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading correspondence…</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "start" }}>
          
          {/* Messages table list */}
          <div className="ember-card" style={{ padding: 0 }}>
            <table className="ember-table">
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedContact(c)}
                    style={{
                      cursor: "pointer",
                      background: selectedContact?.id === c.id ? "var(--ember-surface-raised)" : "transparent",
                    }}
                  >
                    <td>
                      <span style={{ fontWeight: 600, display: "block" }}>{c.name}</span>
                      <span className="ember-caption">{c.email}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: c.status === "NEW" ? 700 : 500 }}>{c.subject}</span>
                    </td>
                    <td>
                      <span className={`ember-badge ${
                        c.status === "NEW" ? "ember-badge-accent" : 
                        c.status === "IN_PROGRESS" ? "ember-badge-neutral" : 
                        c.status === "REPLIED" ? "ember-badge-success" : 
                        "ember-badge-neutral"
                      }`} style={{ fontSize: 11 }}>
                        {c.status.replace("_", " ")}
                      </span>
                    </td>
                    <td>{formatDateTime(c.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Details Sidebar panel */}
          <div className="ember-card" style={{ display: "flex", flexDirection: "column", minHeight: 320 }}>
            {selectedContact ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <span className="ember-overline">Inquiry Details</span>
                  <h3 className="ember-subhead" style={{ margin: "4px 0 2px", fontFamily: "'Playfair Display', serif" }}>{selectedContact.name}</h3>
                  <span style={{ fontSize: 13, color: "var(--ember-text-secondary)" }}>{selectedContact.email}</span>
                </div>

                <div>
                  <span className="ember-label">Subject</span>
                  <p className="ember-body" style={{ margin: 0, fontWeight: 600 }}>{selectedContact.subject}</p>
                </div>

                <div>
                  <span className="ember-label">Message</span>
                  <div style={{
                    background: "var(--ember-bg)", border: "1px solid var(--ember-border)",
                    borderRadius: 8, padding: 12, fontSize: 13.5, lineHeight: 1.4,
                    color: "var(--ember-text-primary)", whiteSpace: "pre-wrap"
                  }}>
                    {selectedContact.message}
                  </div>
                </div>

                <div>
                  <label className="ember-label">Update Status</label>
                  <select
                    className="ember-input"
                    value={selectedContact.status}
                    onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                  >
                    <option value="NEW">New</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="REPLIED">Replied</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <a
                    id="contact-reply-email"
                    href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(selectedContact.subject)}`}
                    className="ember-btn ember-btn-primary"
                    style={{ flex: 1, textDecoration: "none", fontSize: 13 }}
                  >
                    Draft Email ✉️
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "80px 0", color: "var(--ember-text-secondary)" }}>
                <span>👉 Click on a contact message in the list to review the content here.</span>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
