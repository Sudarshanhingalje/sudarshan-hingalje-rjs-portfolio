import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";

import Main from "./components/Main";
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
                  {isDarkMode && !isMobile && (
                    <>
                      <GalaxyBackground />
                      <StarsBackground />
                    </>
                  )}

                  <Header />

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
