// ─── Stat Card Component ─────────────────────────────────────────────────────
// Reusable KPI card showing a visual icon, key metrics, labels, and percentage changes.
// ─────────────────────────────────────────────────────────────────────────────

export default function StatCard({
  label,
  value,
  delta,
  isPositive = true,
  icon = "📈",
}) {
  return (
    <div className="ember-stat-card" style={{ transition: "all var(--transition-medium)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span className="ember-stat-label">{label}</span>
        <span style={{
          width: 32, height: 32, borderRadius: 8,
          background: "var(--ember-bg)", border: "1px solid var(--ember-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16,
        }}>
          {icon}
        </span>
      </div>
      <div className="ember-stat-value">{value}</div>
      {delta && (
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: isPositive ? "var(--ember-success)" : "var(--ember-error)",
          display: "flex",
          alignItems: "center",
          gap: 4,
          marginTop: 2,
        }}>
          <span>{isPositive ? "▲" : "▼"}</span>
          <span>{delta}</span>
        </span>
      )}
    </div>
  );
}
