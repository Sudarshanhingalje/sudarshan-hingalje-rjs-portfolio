import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";

import GalleryMy from "./components/GalleryMy";
import Main from "./components/Main";
import MusicToggleButton from "./components/MusicToggleButton";
import ThemeToggle from "./components/ThemeToggle";
import Wheel from "./components/Wheel";

import ScrollManager from "./hooks/ScrollManager";
import useTheme from "./hooks/UseTheme";
import FeaturedWork from "./ui/FeaturedWork";
// import VideoPopup from "./ui/VideoPopup";
import ErrorBoundary from "./utils/ErrorBoundary";
import SmoothScroll from "./utils/SmoothScroll";

// Lazy Loaded Sections
const Header = lazy(() => import("./sections/Header"));
const About = lazy(() => import("./sections/About"));
const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const Experience = lazy(() => import("./sections/Experience"));
const Personal = lazy(() => import("./sections/Personal"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));
const GalaxyBackground = lazy(() => import("./components/GalaxyBackground"));
const StarsBackground = lazy(() => import("./components/StarsBackground"));

function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode] = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // Fallback in case "load" event doesn't fire (especially on mobile)
    }, 4000);

    const handleLoad = () => {
      clearTimeout(timeout);
      setLoading(false);
    };

    window.addEventListener("load", handleLoad);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Main>
      <Toaster position="top-right" />

      {/* Fixed UI Toggles */}
      <div className="fixed top-3 right-20 z-50">
        <MusicToggleButton />
        <div className="fixed top-4 right-20 z-50 flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>

      <div className="relative min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <ErrorBoundary>
          <SmoothScroll>
            <Wheel />
            <ScrollManager>
              {/* Conditionally load animated galaxy backgrounds */}
              {isDarkMode && !loading && !isMobile && (
                <Suspense fallback={<Loader />}>
                  <GalaxyBackground />
                  <StarsBackground />
                </Suspense>
              )}

              {/* Main App Content */}
              <div
                className={
                  loading
                    ? "blur-sm brightness-50 pointer-events-none"
                    : "blur-0 transition-all duration-500"
                }
              >
                <Suspense fallback={<Loader />}>
                  <Header />
                </Suspense>

                {/* <VideoPopup /> */}

                <Suspense fallback={<Loader />}>
                  <About />
                </Suspense>

                <FeaturedWork />

                <Suspense fallback={<Loader />}>
                  <Skills />
                </Suspense>
                <Suspense fallback={<Loader />}>
                  <Projects />
                </Suspense>
                <Suspense fallback={<Loader />}>
                  <Experience />
                </Suspense>
                <Suspense fallback={<Loader />}>
                  <Personal />
                </Suspense>
                <Suspense fallback={<Loader />}>
                  <GalleryMy />
                </Suspense>
                <Suspense fallback={<Loader />}>
                  <Contact />
                </Suspense>
                <Suspense fallback={<Loader />}>
                  <Footer />
                </Suspense>
              </div>

              {/* Loading Overlay with fade-out animation */}
              {loading && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900 bg-opacity-90 animate-fadeOut">
                  <Loader />
                </div>
              )}
            </ScrollManager>
          </SmoothScroll>
        </ErrorBoundary>
      </div>
    </Main>
  );
}

export default App;
