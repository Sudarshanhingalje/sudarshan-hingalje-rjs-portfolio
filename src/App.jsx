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
import VideoPopup from "./ui/VideoPopup";
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

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Handle loader completion
  const handleLoaderComplete = () => {
    window.scrollTo(0, 0);
    setLoading(false);
  };

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
                  {/* Conditionally load animated galaxy backgrounds */}
                  {isDarkMode && !isMobile && (
                    <Suspense fallback={<div />}>
                      <GalaxyBackground />
                      <StarsBackground />
                    </Suspense>
                  )}

                  <Suspense fallback={<div />}>
                    <Header />
                  </Suspense>

                  <VideoPopup />

                  <Suspense fallback={<div />}>
                    <About />
                  </Suspense>
                  <Suspense fallback={<div />}>
                    <Skills />
                  </Suspense>
                  <Suspense fallback={<div />}>
                    <Projects />
                  </Suspense>
                  <Suspense fallback={<div />}>
                    <Experience />
                  </Suspense>
                  <Suspense fallback={<div />}>
                    <Personal />
                  </Suspense>
                  <Suspense fallback={<div />}>
                    <GalleryMy />
                  </Suspense>
                  <Suspense fallback={<div />}>
                    <Contact />
                  </Suspense>
                  <Suspense fallback={<div />}>
                    <Footer />
                  </Suspense>
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
