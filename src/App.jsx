import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

// Hooks
import useTheme from "./hooks/UseTheme"; // ✅ Import the custom hook useTheme";

// Core Components
import GalleryMy from "./components/GalleryMy";
import JelloText from "./components/JelloText";
import Main from "./components/Main";
import MusicToggleButton from "./components/MusicToggleButton";
import StarsBackground from "./components/StarsBackground";
import ThemeToggle from "./components/ThemeToggle";
import Wheel from "./components/Wheel";
import CustomCursor from "./ui/CustomCursor";
import FeaturedWork from "./ui/FeaturedWork";

// Utilities
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

function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useTheme(); // ✅ Use the custom hook

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Main>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Dark/Light Mode Toggle Button */}
      <div className="fixed top-4 left-4 z-50">
        <ThemeToggle />
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-white text-black dark:bg-neutral-800 dark:text-white px-4 py-2 rounded-full shadow-md transition-all duration-300"
        >
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Music Toggle Button */}
      <div className="fixed top-4 right-4 mt-4 ml-auto mr-4 z-50">
        <MusicToggleButton />
      </div>

      {/* Page Content */}
      <div className="relative min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <ErrorBoundary>
          <StarsBackground />
          <SmoothScroll>
            <CustomCursor />
            <Wheel />

            <div
              className={
                loading
                  ? "blur-sm brightness-50 pointer-events-none"
                  : "blur-0 transition-all duration-500"
              }
            >
              <Suspense fallback={<JelloText />}>
                <Header />
                <About />
                <FeaturedWork />
                <Skills />
                <Projects />
                <Experience />
                <Personal />
                <GalleryMy />
                <Contact />
                <Footer />
              </Suspense>
            </div>

            {loading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
                <JelloText />
              </div>
            )}
          </SmoothScroll>
        </ErrorBoundary>
      </div>
    </Main>
  );
}

export default App;
