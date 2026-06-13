import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// ─── Reset Password Page ──────────────────────────────────────────────────────
// Step 3: Enter new password and confirm it. Displays password strength checklist.
// ─────────────────────────────────────────────────────────────────────────────

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Redirect if no email or otp state
  useEffect(() => {
    if (!email || !otp) {
      navigate("/admin/forgot-password", { replace: true });
    }
  }, [email, otp, navigate]);

  // Password strength checks
  const criteria = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isStrong = Object.values(criteria).every(Boolean);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isStrong) {
      setError("Please ensure password meets all security criteria.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await resetPassword(email, otp, password);
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/login", { replace: true });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "var(--ember-bg)",
      backgroundImage: "radial-gradient(ellipse at 30% 20%, rgba(194,65,12,0.06) 0%, transparent 60%)",
    }}>
      <div style={{ width: "100%", maxWidth: 440, padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%", margin: "0 auto 14px",
            background: "linear-gradient(135deg, var(--ember-accent), #D97706)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 24 }}>🔒</span>
          </div>
          <h1 className="ember-heading" style={{ marginBottom: 6 }}>Reset Password</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>
            Create a secure, strong new password for your admin account.
          </p>
        </div>

        <div className="ember-card" style={{ padding: "28px 28px 24px" }}>
          {success ? (
            <div style={{
              textAlign: "center", padding: "20px 0",
              color: "var(--ember-success)", fontSize: 15,
            }}>
              ✅ Password reset successfully! Redirecting to login…
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{
                  background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.3)",
                  borderRadius: 8, padding: "10px 14px", marginBottom: 16,
                  color: "var(--ember-error)", fontSize: 14,
                }}>
                  ⚠️ {error}
                </div>
              )}

              <div style={{ marginBottom: 18 }}>
                <label className="ember-label" htmlFor="new-password">New Password</label>
                <input
                  id="new-password"
                  className="ember-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="ember-label" htmlFor="confirm-password">Confirm Password</label>
                <input
                  id="confirm-password"
                  className="ember-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  disabled={loading}
                />
              </div>

              {/* Password strength checklist */}
              <div style={{
                background: "var(--ember-bg)", border: "1px solid var(--ember-border)",
                borderRadius: 8, padding: "14px 16px", marginBottom: 24,
              }}>
                <span className="ember-overline" style={{ display: "block", marginBottom: 8 }}>Password Security Checklist</span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                  <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: criteria.length ? "var(--ember-success)" : "var(--ember-text-secondary)" }}>
                    <span>{criteria.length ? "●" : "○"}</span> At least 8 characters long
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: criteria.hasUpper ? "var(--ember-success)" : "var(--ember-text-secondary)" }}>
                    <span>{criteria.hasUpper ? "●" : "○"}</span> At least one uppercase letter (A-Z)
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: criteria.hasLower ? "var(--ember-success)" : "var(--ember-text-secondary)" }}>
                    <span>{criteria.hasLower ? "●" : "○"}</span> At least one lowercase letter (a-z)
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: criteria.hasNumber ? "var(--ember-success)" : "var(--ember-text-secondary)" }}>
                    <span>{criteria.hasNumber ? "●" : "○"}</span> At least one number (0-9)
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: criteria.hasSpecial ? "var(--ember-success)" : "var(--ember-text-secondary)" }}>
                    <span>{criteria.hasSpecial ? "●" : "○"}</span> At least one special character (!@#$)
                  </li>
                </ul>
              </div>

              <button
                id="reset-password-submit"
                type="submit"
                disabled={loading || !isStrong || password !== confirmPassword}
                className="ember-btn ember-btn-primary ember-btn-lg"
                style={{ width: "100%", opacity: (loading || !isStrong || password !== confirmPassword) ? 0.7 : 1 }}
              >
                {loading ? "Resetting Password…" : "Reset Password"}
              </button>
            </form>
          )}
        </div>

        <p className="ember-caption" style={{ textAlign: "center", marginTop: 16 }}>
          ← <Link to="/admin/login" style={{ color: "var(--ember-primary)", textDecoration: "none" }}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
