import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./utils/ProtectedRoute";
import "./styles/ember.css";

// ─── Auth Pages ───────────────────────────────────────────────────────────────
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerify from "./pages/OtpVerify";
import ResetPassword from "./pages/ResetPassword";

// ─── Dashboard Pages ──────────────────────────────────────────────────────────
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Certifications from "./pages/Certifications";
import Resumes from "./pages/Resumes";
import Analytics from "./pages/Analytics";
import WorldMap from "./pages/WorldMap";
import Contacts from "./pages/Contacts";
import AiManagement from "./pages/AiManagement";
import Workflows from "./pages/Workflows";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import AdManagement from "./pages/AdManagement";

// ─── Admin App Root ──────────────────────────────────────────────────────────
// All admin routes live under /admin/* in the portfolio's React Router.
// The ember-root class scopes all Ember Studio styles — never leaks to portfolio.
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminApp() {
  return (
    <div className="ember-root">
      <AuthProvider>
        <Routes>
          {/* Auth routes (public) */}
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-otp" element={<OtpVerify />} />
          <Route path="reset-password" element={<ResetPassword />} />

          {/* Protected dashboard routes */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"       element={<Dashboard />} />
            <Route path="projects"        element={<Projects />} />
            <Route path="experience"      element={<Experience />} />
            <Route path="skills"          element={<Skills />} />
            <Route path="certifications"  element={<Certifications />} />
            <Route path="resumes"         element={<Resumes />} />
            <Route path="analytics"       element={<Analytics />} />
            <Route path="map"             element={<WorldMap />} />
            <Route path="contacts"        element={<Contacts />} />
            <Route path="ai"              element={<AiManagement />} />
            <Route path="workflows"       element={<Workflows />} />
            <Route path="security"        element={<Security />} />
            <Route path="settings"        element={<Settings />} />
            <Route path="ads"             element={<AdManagement />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}
