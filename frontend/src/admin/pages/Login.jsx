import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// ─── Login Page ──────────────────────────────────────────────────────────────
// Full-page login using Ember Studio design system.
// JWT is set as HttpOnly cookie by the backend on success.
// Lockout: 5 failed attempts → 15 min lock (enforced server-side).
// ─────────────────────────────────────────────────────────────────────────────

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("sudarshanhigalje1@gmail.com");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError(""); setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(msg || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", background: "var(--ember-bg)",
        backgroundImage: "radial-gradient(ellipse at 30% 20%, rgba(194,65,12,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(245,158,11,0.05) 0%, transparent 60%)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 440, padding: "0 24px" }}>
        {/* Logo / Title */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%", margin: "0 auto 16px",
            background: "linear-gradient(135deg, var(--ember-primary), var(--ember-primary-hover))",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--shadow-btn-primary)",
          }}>
            <span style={{ fontSize: 26 }}>🔐</span>
          </div>
          <h1 className="ember-heading" style={{ marginBottom: 6 }}>Admin Login</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>
            Sudarshan Hingalje · Portfolio Admin
          </p>
        </div>

        {/* Card */}
        <div className="ember-card" style={{ padding: "32px 32px 28px" }}>
          {error && (
            <div style={{
              background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: 8, padding: "10px 14px", marginBottom: 20,
              color: "var(--ember-error)", fontSize: 14,
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: 20 }}>
              <label className="ember-label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                className={`ember-input ${error ? "ember-input-error" : ""}`}
                type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@email.com"
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 24 }}>
              <label className="ember-label" htmlFor="login-password">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="login-password"
                  className={`ember-input ${error ? "ember-input-error" : ""}`}
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--ember-neutral)", fontSize: 18,
                  }}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="ember-btn ember-btn-primary ember-btn-lg"
              style={{ width: "100%", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Logging in…" : "Login to Dashboard"}
            </button>
          </form>

          <div style={{ textAlign: "right", marginTop: 16 }}>
            <Link
              to="/admin/forgot-password"
              style={{ fontSize: 13, color: "var(--ember-primary)", textDecoration: "none", fontWeight: 600 }}
            >
              Forgot Password? →
            </Link>
          </div>
        </div>

        <p className="ember-caption" style={{ textAlign: "center", marginTop: 20 }}>
          ← <Link to="/" style={{ color: "var(--ember-primary)", textDecoration: "none" }}>Back to Portfolio</Link>
        </p>
      </div>
    </div>
  );
}
