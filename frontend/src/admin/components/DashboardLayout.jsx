import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

// ─── Dashboard Layout Component ──────────────────────────────────────────────
// Grid/Flex layout containing sticky Sidebar, sticky TopBar, and the inner content.
// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardLayout() {
  return (
    <div className="ember-root" style={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "var(--ember-bg)",
    }}>
      {/* Sticky Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        minWidth: 0,
      }}>
        {/* Sticky Top Bar */}
        <TopBar />

        {/* Scrollable Page Body */}
        <main style={{
          flex: 1,
          padding: "32px 40px",
          overflowY: "auto",
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
