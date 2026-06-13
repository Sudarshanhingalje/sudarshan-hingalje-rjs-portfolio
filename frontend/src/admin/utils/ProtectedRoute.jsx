import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// ─── Protected Route ─────────────────────────────────────────────────────────
// Wraps any admin page. If not authenticated → redirect to login.
// ─────────────────────────────────────────────────────────────────────────────

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
