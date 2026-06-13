import { useState, useEffect, useRef } from "react";
import api from "../hooks/useApi";

// ─── Flag emoji helper ────────────────────────────────────────────────────────
function getFlagEmoji(countryName = "") {
  const flagMap = {
    "India": "🇮🇳", "United States": "🇺🇸", "Germany": "🇩🇪",
    "United Kingdom": "🇬🇧", "Australia": "🇦🇺", "France": "🇫🇷",
    "Canada": "🇨🇦", "Japan": "🇯🇵", "China": "🇨🇳", "Brazil": "🇧🇷",
    "Russia": "🇷🇺", "South Korea": "🇰🇷", "Italy": "🇮🇹",
    "Netherlands": "🇳🇱", "Spain": "🇪🇸", "Sweden": "🇸🇪",
    "Norway": "🇳🇴", "Finland": "🇫🇮", "Denmark": "🇩🇰",
    "Switzerland": "🇨🇭", "Austria": "🇦🇹", "Belgium": "🇧🇪",
    "Poland": "🇵🇱", "Ukraine": "🇺🇦", "Mexico": "🇲🇽",
    "Argentina": "🇦🇷", "Chile": "🇨🇱", "Colombia": "🇨🇴",
    "South Africa": "🇿🇦", "Nigeria": "🇳🇬", "Kenya": "🇰🇪",
    "Egypt": "🇪🇬", "Turkey": "🇹🇷", "Saudi Arabia": "🇸🇦",
    "UAE": "🇦🇪", "Pakistan": "🇵🇰", "Bangladesh": "🇧🇩",
    "Sri Lanka": "🇱🇰", "Singapore": "🇸🇬", "Malaysia": "🇲🇾",
    "Indonesia": "🇮🇩", "Thailand": "🇹🇭", "Vietnam": "🇻🇳",
    "Philippines": "🇵🇭", "New Zealand": "🇳🇿", "Portugal": "🇵🇹",
    "Ireland": "🇮🇪", "Czech Republic": "🇨🇿",
  };
  return flagMap[countryName] || "🌍";
}

// ─── Relative time ────────────────────────────────────────────────────────────
function relTime(iso) {
  if (!iso) return "—";
  try {
    const diff  = Date.now() - new Date(iso).getTime();
    const mins  = Math.floor(diff / 60_000);
    const hours = Math.floor(diff / 3_600_000);
    const days  = Math.floor(diff / 86_400_000);
    if (mins  < 1)  return "Just now";
    if (mins  < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  } catch { return "—"; }
}

// ─── Tile layer presets — all free, no API key, unlimited ─────────────────────
const TILE_PRESETS = {
  dark: {
    label: "🌑 Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://openstreetmap.org">OSM</a> &copy; <a href="https://carto.com">CARTO</a>',
    subdomains: "abcd", maxZoom: 19,
  },
  street: {
    label: "🗺️ Street",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abc", maxZoom: 19,
  },
  satellite: {
    label: "🛰️ Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; Esri, USGS, NOAA',
    subdomains: "", maxZoom: 19,
  },
};

// ─── Dot SVG builders ─────────────────────────────────────────────────────────
function activeDot() {
  // Pulsing green dot
  return `
    <div style="position:relative;width:24px;height:24px;display:flex;align-items:center;justify-content:center;">
      <div style="position:absolute;width:22px;height:22px;background:rgba(34,197,94,0.25);border-radius:50%;animation:ripple 1.6s ease-out infinite;"></div>
      <div style="position:absolute;width:14px;height:14px;background:rgba(34,197,94,0.18);border-radius:50%;animation:ripple 1.6s ease-out 0.4s infinite;"></div>
      <div style="width:10px;height:10px;background:#22c55e;border-radius:50%;border:2px solid #fff;box-shadow:0 0 10px rgba(34,197,94,0.8);"></div>
    </div>`;
}

function pastDot() {
  // Solid blue dot
  return `
    <div style="width:9px;height:9px;background:#3b82f6;border-radius:50%;border:2px solid rgba(255,255,255,0.7);box-shadow:0 0 6px rgba(59,130,246,0.6);"></div>`;
}

// ─── WorldMap Component ───────────────────────────────────────────────────────
// Fetches /analytics/visitors → plots ONE dot per individual visitor:
//   🟢 Green pulsing = active in last 10 minutes
//   🔵 Blue solid    = past visitor (older than 10 min)
// All tile layers: free, no API key, works on any hosted domain.
// ─────────────────────────────────────────────────────────────────────────────

export default function WorldMap() {
  const [visitors,     setVisitors]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [tileKey,      setTileKey]      = useState("dark");
  const [filter,       setFilter]       = useState("all"); // all | active | past
  const [selectedUser, setSelectedUser] = useState(null);

  const mapRef         = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef     = useRef([]);

  // ── Fetch individual visitors ────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/analytics/visitors");
        if (res.data?.success) {
          setVisitors(res.data.data);
        }
      } catch {
        setVisitors([]);
      } finally {
        setLoading(false);
      }
    }
    load();
    // Auto-refresh every 30 seconds to update active status
    const interval = setInterval(load, 30_000);
    return () => clearInterval(interval);
  }, []);

  // ── Init / rebuild Leaflet map ───────────────────────────────────────────
  useEffect(() => {
    if (loading || !mapRef.current) return;
    const L = window.L;
    if (!L) return;

    // Destroy old map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    markersRef.current = [];

    const preset = TILE_PRESETS[tileKey];
    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 19,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    // Free tile layer
    L.tileLayer(preset.url, {
      attribution: preset.attribution,
      subdomains: preset.subdomains || "",
      maxZoom: preset.maxZoom,
    }).addTo(map);

    // Filter visitors
    const shown = visitors.filter(v =>
      filter === "all"    ? true :
      filter === "active" ? v.active :
      !v.active
    );

    // Plot one marker per visitor
    shown.forEach((v) => {
      if (!v.lat || !v.lon) return;

      const html  = v.active ? activeDot() : pastDot();
      const size  = v.active ? 24 : 13;
      const icon  = L.divIcon({
        html,
        className: "",
        iconSize:   [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker([v.lat, v.lon], { icon, zIndexOffset: v.active ? 1000 : 0 }).addTo(map);

      const popupHtml = `
        <div style="font-family:Inter,sans-serif;min-width:190px;padding:4px 2px;">
          <div style="font-size:14px;font-weight:700;margin-bottom:5px;">
            ${getFlagEmoji(v.country)} ${v.city}, ${v.country}
          </div>
          <div style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;margin-bottom:6px;
            background:${v.active ? "rgba(34,197,94,0.2)" : "rgba(59,130,246,0.2)"};
            color:${v.active ? "#22c55e" : "#3b82f6"};">
            ${v.active ? "🟢 ACTIVE NOW" : "🔵 Past Visitor"}
          </div>
          <div style="font-size:11px;color:#aaa;margin-top:2px;">📱 ${v.device} · ${v.browser}</div>
          <div style="font-size:11px;color:#aaa;">👁 ${v.pageViews} page view${v.pageViews !== 1 ? "s" : ""} · ⏱ ${Math.round(v.duration / 60) || "<1"}m</div>
          <div style="font-size:10px;color:#666;margin-top:4px;">🕐 ${relTime(v.createdAt)}</div>
          <div style="font-size:10px;color:#444;margin-top:2px;">📍 ${v.lat?.toFixed(4)}, ${v.lon?.toFixed(4)}</div>
        </div>`;

      marker.bindPopup(popupHtml, { className: "leaflet-ember-popup" });
      marker.on("click",     () => setSelectedUser(v));
      marker.on("mouseover", () => marker.openPopup());
      markersRef.current.push({ id: v.id, marker, active: v.active });
    });

    mapInstanceRef.current = map;
    return () => { if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; } };
  }, [loading, visitors, tileKey, filter]);

  // ── Derived counts ───────────────────────────────────────────────────────
  const activeCount = visitors.filter(v => v.active).length;
  const pastCount   = visitors.filter(v => !v.active).length;
  const totalCount  = visitors.length;

  // ── Fly to a visitor ─────────────────────────────────────────────────────
  function flyTo(v) {
    setSelectedUser(v);
    if (mapInstanceRef.current && v.lat && v.lon) {
      mapInstanceRef.current.flyTo([v.lat, v.lon], 14, { animate: true, duration: 1.2 });
      const entry = markersRef.current.find(m => m.id === v.id);
      if (entry) entry.marker.openPopup();
    }
  }

  function resetView() {
    setSelectedUser(null);
    if (mapInstanceRef.current) mapInstanceRef.current.flyTo([20, 0], 2, { animate: true, duration: 1 });
  }

  // ── Filter list for sidebar table ────────────────────────────────────────
  const filteredList = visitors.filter(v =>
    filter === "all"    ? true :
    filter === "active" ? v.active :
    !v.active
  );

  return (
    <div>
      {/* Styles */}
      <style>{`
        @keyframes ripple {
          0%   { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .leaflet-ember-popup .leaflet-popup-content-wrapper {
          background: #1c1917; color: #e7e5e4;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; box-shadow: 0 8px 32px rgba(0,0,0,0.7);
        }
        .leaflet-ember-popup .leaflet-popup-tip       { background: #1c1917; }
        .leaflet-ember-popup .leaflet-popup-close-button { color: #e7e5e4 !important; }
        .leaflet-control-zoom a {
          background: #1c1917 !important; color: #e7e5e4 !important;
          border-color: rgba(255,255,255,0.15) !important;
        }
        .leaflet-control-zoom a:hover { background: #292524 !important; }
        .leaflet-control-attribution {
          background: rgba(28,25,23,0.85) !important;
          color: #78716c !important; font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: #a8a29e !important; }
      `}</style>

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <h1 className="ember-heading" style={{ margin: 0 }}>Live Visitor Map</h1>
        <p className="ember-body" style={{ color: "var(--ember-text-secondary)", margin: "4px 0 0" }}>
          One dot per visitor — 🟢 active now · 🔵 past visitor
        </p>
      </div>

      {/* ── Summary badges ───────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { key: "all",    label: "All Visitors",     count: totalCount,  color: "var(--ember-primary)" },
          { key: "active", label: "🟢 Active Now",    count: activeCount, color: "#22c55e" },
          { key: "past",   label: "🔵 Past Visitors", count: pastCount,   color: "#3b82f6" },
        ].map(({ key, label, count, color }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              padding: "8px 18px", borderRadius: 8, cursor: "pointer",
              border: `2px solid ${filter === key ? color : "var(--ember-border)"}`,
              background: filter === key ? `${color}18` : "var(--ember-surface)",
              color: filter === key ? color : "var(--ember-text-secondary)",
              fontWeight: 600, fontSize: 13, transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            {label}
            <span style={{
              background: color, color: "#fff",
              borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 700,
            }}>{count}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 80 }}>
          <span style={{ color: "var(--ember-text-secondary)", fontSize: 15 }}>Loading visitor data…</span>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* ── Map card ────────────────────────────────────────────────── */}
          <div className="ember-card" style={{ padding: 0, overflow: "hidden", borderRadius: 12 }}>

            {/* Map toolbar */}
            <div style={{ padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Real-Time Visitor Locations
                </span>
                {activeCount > 0 && (
                  <span style={{
                    background: "rgba(34,197,94,0.15)", color: "#22c55e",
                    fontSize: 11, fontWeight: 700, padding: "2px 10px",
                    borderRadius: 10, border: "1px solid rgba(34,197,94,0.3)",
                    animation: "none",
                  }}>
                    ● {activeCount} LIVE
                  </span>
                )}
              </div>

              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {/* Tile switcher */}
                {Object.entries(TILE_PRESETS).map(([key, preset]) => (
                  <button key={key} onClick={() => setTileKey(key)} style={{
                    fontSize: 11, padding: "3px 9px", borderRadius: 6,
                    border: "1px solid var(--ember-border)",
                    background: tileKey === key ? "var(--ember-primary)" : "var(--ember-surface-raised)",
                    color: tileKey === key ? "#fff" : "var(--ember-text-secondary)",
                    cursor: "pointer", fontWeight: tileKey === key ? 700 : 400,
                    transition: "all 0.2s",
                  }}>{preset.label}</button>
                ))}
                <button onClick={resetView} style={{
                  fontSize: 11, padding: "3px 10px", borderRadius: 6,
                  border: "1px solid var(--ember-border)",
                  background: "var(--ember-surface-raised)",
                  color: "var(--ember-text-secondary)", cursor: "pointer",
                }}>⊙ Reset</button>
              </div>
            </div>

            {/* Map container */}
            <div ref={mapRef} style={{ width: "100%", height: 500, background: "#111" }} />

            {/* Legend */}
            <div style={{ padding: "10px 18px", display: "flex", gap: 20, borderTop: "1px solid var(--ember-border)", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "var(--ember-text-secondary)" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.8)" }} />
                Active now (last 10 min)
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "var(--ember-text-secondary)" }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 6px rgba(59,130,246,0.6)" }} />
                Past visitor
              </div>
              <div style={{ fontSize: 11, color: "var(--ember-neutral)", marginLeft: "auto" }}>
                🖱 Scroll to zoom · Click any dot for visitor details · Auto-refreshes every 30s
              </div>
            </div>
          </div>

          {/* ── Visitor list table ──────────────────────────────────────── */}
          <div className="ember-card" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span className="ember-subhead" style={{ fontFamily: "'Playfair Display', serif" }}>
                Visitor Log
              </span>
              <span style={{ fontSize: 12, color: "var(--ember-neutral)" }}>
                Showing {filteredList.length} of {totalCount} visitors
              </span>
            </div>

            {filteredList.length === 0 ? (
              <p className="ember-caption" style={{ textAlign: "center", padding: "24px 0" }}>
                {filter === "active" ? "No active visitors right now." : "No visitor data yet."}
              </p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="ember-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Location</th>
                      <th>Device · Browser</th>
                      <th>Page Views</th>
                      <th>Duration</th>
                      <th>Visited</th>
                      <th style={{ textAlign: "right" }}>Locate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList.map((v) => (
                      <tr
                        key={v.id}
                        onClick={() => flyTo(v)}
                        style={{
                          background: selectedUser?.id === v.id ? "var(--ember-surface-raised)" : "transparent",
                          transition: "background var(--transition-fast)",
                          cursor: "pointer",
                        }}
                      >
                        <td>
                          {v.active ? (
                            <span style={{
                              display: "inline-flex", alignItems: "center", gap: 5,
                              background: "rgba(34,197,94,0.15)", color: "#22c55e",
                              padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 700,
                            }}>
                              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                              LIVE
                            </span>
                          ) : (
                            <span style={{
                              display: "inline-flex", alignItems: "center", gap: 5,
                              background: "rgba(59,130,246,0.12)", color: "#3b82f6",
                              padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600,
                            }}>
                              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
                              Past
                            </span>
                          )}
                        </td>
                        <td style={{ fontWeight: 600 }}>
                          {getFlagEmoji(v.country)} {v.city}, {v.country}
                        </td>
                        <td style={{ fontSize: 12, color: "var(--ember-text-secondary)" }}>
                          {v.device} · {v.browser}
                        </td>
                        <td>{v.pageViews}</td>
                        <td>{Math.round(v.duration / 60) || "<1"}m</td>
                        <td style={{ fontSize: 12, color: "var(--ember-neutral)" }}>{relTime(v.createdAt)}</td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); flyTo(v); }}
                            style={{
                              fontSize: 11, padding: "3px 10px", borderRadius: 6,
                              border: "1px solid var(--ember-border)",
                              background: selectedUser?.id === v.id ? (v.active ? "#22c55e" : "#3b82f6") : "transparent",
                              color: selectedUser?.id === v.id ? "#fff" : (v.active ? "#22c55e" : "#3b82f6"),
                              cursor: "pointer", fontWeight: 600, transition: "all 0.2s",
                            }}
                          >
                            📍 Fly To
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
