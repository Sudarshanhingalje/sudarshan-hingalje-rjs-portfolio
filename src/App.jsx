import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import Main from "./components/Main";
import MusicToggleButton from "./components/MusicToggleButton";
import Wheel from "./components/Wheel";
import SplashCursor from "./ui/CustomCursor";
import ErrorBoundary from "./utils/ErrorBoundary";
import SmoothScroll from "./utils/SmoothScroll";
import useScrollAnimation from "./utils/useScrollAnimation";
import AvatarSpeaker from "./components/AvatarSpeaker";

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
  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Main>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="fixed top-4 right-4 mt-4 ml-auto mr-4 z-50">
        <MusicToggleButton />
      </div>
      <div className="relative min-h-screen bg-[#161b2f] bg-[url('/stars.svg')] bg-repeat text-white">
        <ErrorBoundary>
          <SmoothScroll>
            <SplashCursor />

            <Wheel />
            <div
              className={
                loading
                  ? "blur-sm brightness-50 pointer-events-none"
                  : "blur-0 transition-all duration-500"
              }
            >
              <Suspense fallback={<Loader />}>
                <Header />
                <AvatarSpeaker />
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
