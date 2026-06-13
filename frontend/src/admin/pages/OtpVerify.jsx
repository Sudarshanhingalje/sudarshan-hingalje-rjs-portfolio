import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// ─── OTP Verification Page ───────────────────────────────────────────────────
// Step 2: Input the 6-digit OTP received via email to proceed to Reset Password.
// ─────────────────────────────────────────────────────────────────────────────

export default function OtpVerify() {
  const { verifyOtp, requestOtp } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);

  // Redirect if no email state
  useEffect(() => {
    if (!email) {
      navigate("/admin/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  // Countdown timer logic
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Focus helper
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  function handleChange(value, index) {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    // Take the last character typed
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next box
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0 && inputRefs.current[index - 1]) {
        // Clear previous input and focus it
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const data = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(data)) return;

    const digits = data.split("");
    setOtp(digits);
    inputRefs.current[5]?.focus();
  }

  async function handleVerify(e) {
    if (e) e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await verifyOtp(email, code);
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/reset-password", { state: { email, otp: code } });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please check and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (timer > 0) return;
    setError("");
    setTimer(60);
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
    try {
      await requestOtp(email);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP. Try again.");
    }
  }

  // Auto verify once 6 digits are fully filled
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleVerify();
    }
  }, [otp]);

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
            <span style={{ fontSize: 24 }}>🛡️</span>
          </div>
          <h1 className="ember-heading" style={{ marginBottom: 6 }}>Enter OTP</h1>
          <p className="ember-body" style={{ color: "var(--ember-text-secondary)" }}>
            Enter the security code sent to <strong>{email}</strong>
          </p>
        </div>

        <div className="ember-card" style={{ padding: "28px 28px 24px" }}>
          {success ? (
            <div style={{
              textAlign: "center", padding: "20px 0",
              color: "var(--ember-success)", fontSize: 15,
            }}>
              ✅ OTP Verified! Proceeding…
            </div>
          ) : (
            <form onSubmit={handleVerify}>
              {error && (
                <div style={{
                  background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.3)",
                  borderRadius: 8, padding: "10px 14px", marginBottom: 20,
                  color: "var(--ember-error)", fontSize: 14,
                }}>
                  ⚠️ {error}
                </div>
              )}

              <div style={{ display: "flex", gap: 10, justifyContent: "space-between", marginBottom: 24 }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    className="ember-input"
                    style={{
                      width: 48, height: 48, textAlign: "center", fontSize: 20,
                      fontWeight: "bold", padding: 0,
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onPaste={idx === 0 ? handlePaste : undefined}
                    disabled={loading}
                    maxLength={1}
                  />
                ))}
              </div>

              <button
                id="otp-submit"
                type="submit"
                disabled={loading || otp.some((d) => d === "")}
                className="ember-btn ember-btn-primary ember-btn-lg"
                style={{ width: "100%", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Verifying OTP…" : "Verify OTP"}
              </button>
            </form>
          )}

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span className="ember-caption" style={{ display: "block", marginBottom: 8 }}>
              {timer > 0 ? `Resend code in ${timer}s` : "Didn't receive the code?"}
            </span>
            <button
              id="otp-resend"
              type="button"
              disabled={timer > 0 || loading}
              className="ember-btn ember-btn-ghost ember-btn-sm"
              onClick={handleResend}
              style={{
                color: timer > 0 ? "var(--ember-neutral)" : "var(--ember-primary)",
                fontWeight: 600,
                opacity: timer > 0 ? 0.5 : 1,
              }}
            >
              Resend OTP
            </button>
          </div>
        </div>

        <p className="ember-caption" style={{ textAlign: "center", marginTop: 16 }}>
          ← <Link to="/admin/forgot-password" style={{ color: "var(--ember-primary)", textDecoration: "none" }}>Back to Email Form</Link>
        </p>
      </div>
    </div>
  );
}
