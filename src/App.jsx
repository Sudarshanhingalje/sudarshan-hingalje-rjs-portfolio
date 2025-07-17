import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Loader from "./components/Loader";
import Main from "./components/Main";
import Wheel from "./components/Wheel";
import SplashCursor from "./ui/CustomCursor";
import ErrorBoundary from "./utils/ErrorBoundary";
import SmoothScroll from "./utils/SmoothScroll";
import useScrollAnimation from "./utils/useScrollAnimation";

// ✅ Music
import suzume from "./assets/suzume.mp3";

const About = lazy(() => import("./sections/About"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));
const Header = lazy(() => import("./sections/Header"));
const Personal = lazy(() => import("./sections/Personal"));
const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const Experience = lazy(() => import("./sections/Experience"));
const TechParallax = lazy(() => import("./ui/TechParallax"));

function App() {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Play music on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Main>
      <div className="relative min-h-screen bg-[#121212] bg-[url('./assets/noise.png')] bg-repeat text-[#1c1c1c]">
        <ErrorBoundary>
          <SmoothScroll>
            <SplashCursor />
            <Wheel />

            {/* ✅ Hidden audio tag */}
            <audio ref={audioRef} src={suzume} loop preload="auto" />

            <div
              className={
                loading
                  ? "blur-sm brightness-50 pointer-events-none"
                  : "blur-0 transition-all duration-500"
              }
            >
              <Suspense fallback={<Loader />}>
                {/* ✅ Pass props to Header */}
                <Header isMusicPlaying={isPlaying} toggleMusic={toggleMusic} />
                <About />
                <TechParallax />
                <Skills />
                <Projects />
                <Experience />
                <Personal />
                <Contact />
                <Footer />
              </Suspense>
            </div>

            {loading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
                <Loader />
              </div>
            )}
          </SmoothScroll>
        </ErrorBoundary>
      </div>
    </Main>
  );
}

export default App;
