import { useState, useEffect } from "react";
import api from "../hooks/useApi";

// ─── Health Monitor Component ────────────────────────────────────────────────
// Polls backend health status periodically and indicates API / Database status.
// ─────────────────────────────────────────────────────────────────────────────

export default function HealthMonitor() {
  const [status, setStatus] = useState("checking"); // checking, online, offline
  const [dbStatus, setDbStatus] = useState("checking"); // checking, healthy, down

  useEffect(() => {
    let active = true;

    async function checkHealth() {
      try {
        const res = await api.get("/system/health");
        if (!active) return;
        
        if (res.data?.status === "UP") {
          setStatus("online");
          setDbStatus(res.data?.details?.db === "UP" ? "healthy" : "down");
        } else {
          setStatus("offline");
          setDbStatus("down");
        }
      } catch (err) {
        if (!active) return;
        setStatus("offline");
        setDbStatus("down");
      }
    }

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Poll every 30 seconds

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "var(--ember-surface)",
      border: "1px solid var(--ember-border)",
      borderRadius: 20,
      padding: "4px 12px",
      fontSize: 13,
      fontWeight: 500,
    }} title={`Database Status: ${dbStatus.toUpperCase()}`}>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span className={`ember-dot ${
          status === "checking" ? "ember-dot-warn" : 
          status === "online" ? "ember-dot-online" : 
          "ember-dot-offline"
        }`} />
        <span style={{ color: "var(--ember-text-secondary)" }}>
          {status === "checking" ? "API Status..." : 
           status === "online" ? "System Active" : 
           "API Offline"}
        </span>
      </span>
    </div>
  );
}
