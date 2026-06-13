// ─── Confirmation Modal Component ──────────────────────────────────────────
// Reusable popup modal for destructive or major confirmation steps.
// ─────────────────────────────────────────────────────────────────────────────

export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="ember-overlay">
      <div className="ember-modal" style={{ width: "90%", maxWidth: 400, padding: 24 }}>
        <h3 className="ember-subhead" style={{
          margin: "0 0 10px",
          fontFamily: "'Playfair Display', serif",
          fontSize: 20,
          fontWeight: 700,
        }}>
          {title}
        </h3>
        <p className="ember-body" style={{
          color: "var(--ember-text-secondary)",
          fontSize: 14,
          marginBottom: 24,
          lineHeight: 1.4,
        }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button
            type="button"
            className="ember-btn ember-btn-secondary ember-btn-md"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`ember-btn ember-btn-md ${
              isDestructive ? "ember-btn-destructive" : "ember-btn-primary"
            }`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
