import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";
import Loader from "./components/Loader";

import Main from "./components/Main";
import AdminApp from "./admin/AdminApp";
import CircleMenu from "./components/CircleMenu";
import MusicToggleButton from "./components/MusicToggleButton";
import ThemeToggle from "./components/ThemeToggle";
import Wheel from "./components/Wheel";

import CertificateWall from "./components/CertificateWall";
import ScrollManager from "./hooks/ScrollManager";
import useTheme from "./hooks/UseTheme";
import ErrorBoundary from "./utils/ErrorBoundary";
import SmoothScroll from "./utils/SmoothScroll";
import VideoPopup from "./videoads/VideoPopup";

// Statically Imported Sections for smooth rendering and reliable GSAP triggers
import Header from "./sections/Header";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Personal from "./sections/Personal";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import GalaxyBackground from "./components/GalaxyBackground";
import StarsBackground from "./components/StarsBackground";

function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode] = useTheme();
  const location = useLocation();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Reset first-visit state on every page refresh
  useEffect(() => {
    localStorage.removeItem("portfolio_first_visit");
  }, []);

  // Admin routes should never show the portfolio loader
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Track visitor views to backend
  useEffect(() => {
    if (isAdminRoute) return;

    const trackVisit = async () => {
      try {
        let clientIp = "";
        let country = "Unknown";
        let city = "Unknown";

        try {
          // Primary check using ipapi.co (free, HTTPS, wildcard CORS)
          const geoRes = await fetch("https://ipapi.co/json/");
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            clientIp = geoData.ip || "";
            country = geoData.country_name || "Unknown";
            city = geoData.city || "Unknown";
          }
        } catch (e) {
          console.warn("Client-side geolocation details fetch failed, falling back to ipify:", e);
          try {
            // Fallback: just fetch public IP via ipify
            const ipRes = await fetch("https://api.ipify.org?format=json");
            if (ipRes.ok) {
              const ipData = await ipRes.json();
              clientIp = ipData.ip || "";
            }
          } catch (ipErr) {
            console.warn("Ipify fallback failed:", ipErr);
          }
        }

        const userAgent = navigator.userAgent;
        let browser = "Chrome";
        let os = "Windows";
        let device = "Desktop";

        // Simple Browser Detection
        if (userAgent.indexOf("Firefox") > -1) browser = "Firefox";
        else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) browser = "Safari";
        else if (userAgent.indexOf("Edge") > -1) browser = "Edge";
        else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) browser = "Opera";

        // Simple OS Detection
        if (userAgent.indexOf("Mac") > -1) os = "macOS";
        else if (userAgent.indexOf("Linux") > -1) os = "Linux";
        else if (userAgent.indexOf("Android") > -1) os = "Android";
        else if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) os = "iOS";

        // Simple Device Detection
        if (/Mobi|Android|iPhone/i.test(userAgent)) {
          device = "Mobile";
        } else if (/Tablet|iPad/i.test(userAgent)) {
          device = "Tablet";
        }

        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
        await fetch(`${apiUrl}/analytics/track`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            browser,
            device,
            os,
            views: 1,
            duration: 0,
            ip: clientIp,
            country,
            city,
          }),
        });
      } catch (err) {
        console.warn("Analytics tracking failed:", err);
      }
    };

    trackVisit();
  }, [isAdminRoute]);

  const handleLoaderComplete = () => {
    window.scrollTo(0, 0);
    setLoading(false);
  };

  // ─── Admin Sub-App (no loader, no portfolio chrome) ─────────────────────────
  if (isAdminRoute) {
    return (
      <>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </>
    );
  }

  // ─── Main Portfolio ──────────────────────────────────────────────────────────
  return (
    <Main>
      <Toaster position="top-right" />

      {loading ? (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900 bg-opacity-90">
          <Loader onComplete={handleLoaderComplete} />
        </div>
      ) : (
        <>
          {/* Fixed UI Toggles */}
          <div className="fixed top-3 right-20 z-50">
            <MusicToggleButton />
            <div className="fixed top-4 right-20 z-50 flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>

          <div
            className="relative min-h-screen
            bg-gradient-to-br from-slate-50 via-blue-200 to-indigo-200 text-slate-800
            dark:bg-gradient-to-br dark:from-[#0b0c15] dark:via-[#11121c] dark:to-[#181927] dark:text-white
            transition-colors duration-300"
          >
            <ErrorBoundary>
              <SmoothScroll>
                <Wheel />
                <ScrollManager>
                  {isDarkMode && !isMobile && (
                    <>
                      <GalaxyBackground />
                      <StarsBackground />
                    </>
                  )}

                  <Header />

                  {/* Right-Side Floating Circle Menu */}
                  <CircleMenu />

                  <VideoPopup />

                  <About />
                  <Skills />
                  <Projects />
                  <Experience />
                  <Personal />
                  <CertificateWall />
                  <Contact />
                  <Footer />
                </ScrollManager>
              </SmoothScroll>
            </ErrorBoundary>
          </div>
        </>
      )}
    </Main>
  );
}

export default App;
