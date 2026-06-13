import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// ─── Forgot Password Page ────────────────────────────────────────────────────
// Step 1: Enter email → backend sends OTP via Gmail SMTP.
// ─────────────────────────────────────────────────────────────────────────────

export default function ForgotPassword() {
  const { requestOtp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("sudarshanhigalje1@gmail.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) { setError("Please enter your email."); return; }
    setError(""); setLoading(true);
    try {
      await requestOtp(email);
      setSent(true);
      setTimeout(() => navigate("/admin/verify-otp", { state: { email } }), 1800);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
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
      <div style={{ width: "100%", maxWidth: 420, padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%", margin: "0 auto 14px",
            background: "linear-gradient(135deg, var(--ember-accent), #D97706)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 24 }}>🔑</span>
          </div>
          <h1 className="ember-heading" style={{ marginBottom: 6 }}>Forgot Password</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>
            We'll send a 6-digit OTP to your email.
          </p>
        </div>

        <div className="ember-card" style={{ padding: "28px 28px 24px" }}>
          {sent ? (
            <div style={{
              textAlign: "center", padding: "20px 0",
              color: "var(--ember-success)", fontSize: 15,
            }}>
              ✅ OTP sent! Redirecting…
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
              <div style={{ marginBottom: 20 }}>
                <label className="ember-label" htmlFor="fp-email">Email Address</label>
                <input
                  id="fp-email"
                  className="ember-input"
                  type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your admin email"
                />
              </div>
              <button
                id="fp-submit"
                type="submit"
                disabled={loading}
                className="ember-btn ember-btn-primary ember-btn-lg"
                style={{ width: "100%", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Sending OTP…" : "Send OTP"}
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
