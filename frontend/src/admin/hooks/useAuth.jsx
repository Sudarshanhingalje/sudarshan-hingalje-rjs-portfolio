import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "./useApi";

// ─── Auth Context & Hook ─────────────────────────────────────────────────────
// JWT is stored in HttpOnly cookie by the backend.
// Frontend only tracks `isAuthenticated` + basic admin info in state.
// ─────────────────────────────────────────────────────────────────────────────

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = sessionStorage.getItem("admin_info");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { adminInfo } = res.data.data;
    sessionStorage.setItem("admin_info", JSON.stringify(adminInfo));
    setAdmin(adminInfo);
    navigate("/admin/dashboard");
    return res.data;
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await api.delete("/auth/logout");
    } catch {
      // ignore logout errors
    }
    sessionStorage.removeItem("admin_info");
    setAdmin(null);
    navigate("/admin/login");
  }, [navigate]);

  const requestOtp = useCallback(async (email) => {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data;
  }, []);

  const verifyOtp = useCallback(async (email, otp) => {
    const res = await api.post("/auth/verify-otp", { email, otp });
    return res.data;
  }, []);

  const resetPassword = useCallback(async (email, otp, newPassword) => {
    const res = await api.post("/auth/reset-password", { email, otp, newPassword });
    return res.data;
  }, []);

  return (
    <AuthContext.Provider
      value={{ admin, isAuthenticated: !!admin, login, logout, requestOtp, verifyOtp, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
