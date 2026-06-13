import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── Gooey Filter Dock ──────────────────────────────────────────────────────
// Floating right-side dock on portfolio homepage.
// Uses SVG feGaussianBlur + feColorMatrix gooey effect (inspired by 21st.dev).
// Clicking Admin → navigates to /admin/login
// ────────────────────────────────────────────────────────────────────────────

const DOCK_ITEMS = [
  {
    id: "admin",
    icon: "🔐",
    label: "Admin",
    href: null,
    action: "admin",
    color: "#C2410C",
  },
  {
    id: "github",
    icon: "🐙",
    label: "GitHub",
    href: "https://github.com/Sudarshanhingalje",
    action: "link",
    color: "#1C1917",
  },
  {
    id: "linkedin",
    icon: "💼",
    label: "LinkedIn",
    href: "https://linkedin.com/in/sudarshan-hingalje-b07993158",
    action: "link",
    color: "#0A66C2",
  },
  {
    id: "whatsapp",
    icon: "💬",
    label: "WhatsApp",
    href: "https://wa.me/919579853955",
    action: "link",
    color: "#25D366",
  },
];

export default function AdminDock() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [visible, setVisible] = useState(true);

  // Hide dock when scrolled past hero section
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (item) => {
    if (item.action === "admin") {
      navigate("/admin/login");
      setOpen(false);
    } else if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {/* SVG Gooey Filter Definition */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="gooey-dock">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Dock Container */}
      <div
        className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-0"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translateY(-50%) translateX(${visible ? "0" : "80px"})`,
          transition: "opacity 0.4s ease, transform 0.4s ease",
          filter: open ? "url(#gooey-dock)" : "none",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {/* Toggle Trigger Button */}
        <button
          id="admin-dock-toggle"
          onClick={() => setOpen((v) => !v)}
          className="relative flex items-center justify-center rounded-full text-white font-bold shadow-lg cursor-pointer select-none"
          style={{
            width: 52,
            height: 52,
            background: open
              ? "linear-gradient(135deg,#C2410C,#9A3412)"
              : "rgba(28,25,23,0.85)",
            border: "2px solid rgba(194,65,12,0.4)",
            backdropFilter: "blur(12px)",
            transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            zIndex: 10,
          }}
          title="Portfolio Links"
          aria-expanded={open}
        >
          <span style={{ fontSize: 22, transform: open ? "rotate(-45deg)" : "rotate(0)", transition: "transform 0.3s" }}>
            {open ? "✕" : "⚡"}
          </span>
        </button>

        {/* Dock Items — expand upward */}
        <div
          className="flex flex-col-reverse items-center absolute bottom-16 right-0"
          style={{ gap: open ? 12 : 0 }}
        >
          {DOCK_ITEMS.map((item, i) => (
            <button
              key={item.id}
              id={`dock-${item.id}`}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              title={item.label}
              className="relative flex items-center justify-center rounded-full text-white shadow-lg cursor-pointer select-none"
              style={{
                width: hoveredId === item.id ? 56 : 48,
                height: hoveredId === item.id ? 56 : 48,
                background: item.color,
                border: "2px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                opacity: open ? 1 : 0,
                transform: open
                  ? `translateY(0) scale(${hoveredId === item.id ? 1.15 : 1})`
                  : `translateY(20px) scale(0.5)`,
                transition: `all 0.35s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.05}s`,
                pointerEvents: open ? "auto" : "none",
                zIndex: 9 - i,
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>

              {/* Tooltip label */}
              {hoveredId === item.id && (
                <span
                  className="absolute right-full mr-3 whitespace-nowrap text-xs font-semibold rounded-lg px-3 py-1.5 pointer-events-none"
                  style={{
                    background: "rgba(28,25,23,0.9)",
                    color: "#FAFAF9",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(194,65,12,0.3)",
                  }}
                >
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
