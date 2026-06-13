import axios from "axios";

// ─── Axios Base Instance ─────────────────────────────────────────────────────
// All admin API calls go through this. Cookie-based JWT is sent automatically.
// ─────────────────────────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  withCredentials: true, // send HttpOnly JWT cookie with every request
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor: redirect to login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("admin_info");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;
