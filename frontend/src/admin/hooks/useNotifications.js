import { useState, useEffect, useRef, useCallback } from "react";
import api from "./useApi";

// ─── Notification Storage Keys ────────────────────────────────────────────────
const DISMISSED_KEY = "admin_dismissed_notifs"; // permanently dismissed IDs
const SOUND_PATH    = "/assets/notificationsound.mp3";
const POLL_INTERVAL = 30_000; // 30 seconds

// ─── useNotifications Hook ───────────────────────────────────────────────────
// Fetches notifications from the backend (contacts + security events),
// plays a sound on new unseen notifications, and allows permanent dismissal
// via localStorage so dismissed items never reappear.
// ─────────────────────────────────────────────────────────────────────────────

export default function useNotifications() {
  const [allNotifs,    setAllNotifs]    = useState([]);
  const [dismissed,    setDismissed]    = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(DISMISSED_KEY) || "[]"));
    } catch {
      return new Set();
    }
  });

  const audioRef       = useRef(null);
  const prevIdsRef     = useRef(null); // null means first load (don't play sound)

  // Lazy-init Audio object once
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(SOUND_PATH);
      audioRef.current.volume = 0.6;
    }
    return audioRef.current;
  }, []);

  // ── Fetch notifications from backend ──────────────────────────────────────
  const fetchNotifications = useCallback(async () => {
    try {
      const [contactsRes, securityRes] = await Promise.allSettled([
        api.get("/contacts"),
        api.get("/security/audit"),
      ]);

      const built = [];

      // ── Contact messages → notifications ────────────────────────────────
      if (contactsRes.status === "fulfilled") {
        // Backend returns { success, data: [...] }
        const raw = contactsRes.value?.data;
        const contacts = Array.isArray(raw?.data) ? raw.data
          : Array.isArray(raw) ? raw
          : [];
        contacts.slice(0, 10).forEach((c) => {
          built.push({
            id:    `contact-${c.id}`,
            type:  "info",
            icon:  "✉️",
            title: `New Message from ${c.name || "Visitor"}`,
            desc:  c.subject || c.message?.slice(0, 60) || "Contact form submission.",
            time:  c.createdAt || "",
          });
        });
      }

      // ── Security audit logs → notifications ──────────────────────────────
      if (securityRes.status === "fulfilled") {
        // Backend returns { success, data: { attempts: [...], sessions, lockout } }
        const raw = securityRes.value?.data;
        const logs = Array.isArray(raw?.data?.attempts) ? raw.data.attempts
          : Array.isArray(raw?.attempts) ? raw.attempts
          : [];
        logs.slice(0, 10).forEach((l) => {
          // LoginAttempt fields: id, ipHash, username, success, failureReason, createdAt
          const isFailure = l.success === false;
          built.push({
            id:    `security-${l.id}`,
            type:  isFailure ? "warning" : "success",
            icon:  isFailure ? "⚠️" : "🔒",
            title: isFailure ? "Failed Login Attempt" : "Admin Login Successful",
            desc:  `User: ${l.username || "unknown"} — ${l.failureReason || (isFailure ? "Invalid credentials" : "Authenticated")}`,
            time:  l.createdAt || "",
          });
        });
      }

      // Sort newest first (ISO strings sort lexicographically)
      built.sort((a, b) => (b.time > a.time ? 1 : -1));

      // ── Sound: play if there are new IDs since last poll ─────────────────
      if (prevIdsRef.current !== null) {
        const prevIds = prevIdsRef.current;
        const newIds  = built
          .map((n) => n.id)
          .filter((id) => !prevIds.has(id) && !dismissed.has(id));
        if (newIds.length > 0) {
          getAudio().play().catch(() => {}); // autoplay policy may block — silent fail
        }
      }

      prevIdsRef.current = new Set(built.map((n) => n.id));
      setAllNotifs(built);
    } catch {
      // silently fail — don't break the UI
    }
  }, [dismissed, getAudio]);

  // ── Initial load + polling ─────────────────────────────────────────────────
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // ── Dismiss one notification permanently ──────────────────────────────────
  const dismiss = useCallback((id) => {
    setDismissed((prev) => {
      const next = new Set(prev);
      next.add(id);
      try {
        localStorage.setItem(DISMISSED_KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  // ── Dismiss ALL visible notifications ─────────────────────────────────────
  const dismissAll = useCallback(() => {
    setDismissed((prev) => {
      const next = new Set(prev);
      allNotifs.forEach((n) => next.add(n.id));
      try {
        localStorage.setItem(DISMISSED_KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, [allNotifs]);

  // Only unseen (not dismissed) notifications
  const unseen = allNotifs.filter((n) => !dismissed.has(n.id));

  return { unseen, dismiss, dismissAll, refetch: fetchNotifications };
}
