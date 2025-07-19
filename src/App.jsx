import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import JelloText from "./components/JelloText";
import Main from "./components/Main";
import MusicToggleButton from "./components/MusicToggleButton";
import StarsBackground from "./components/StarsBackground";
import Wheel from "./components/Wheel";
import CustomCursor from "./ui/CustomCursor";
import FeaturedWork from "./ui/FeaturedWork";
import ErrorBoundary from "./utils/ErrorBoundary";
import SmoothScroll from "./utils/SmoothScroll";

const About = lazy(() => import("./sections/About"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));
const Header = lazy(() => import("./sections/Header"));
const Personal = lazy(() => import("./sections/Personal"));
const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const Experience = lazy(() => import("./sections/Experience"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Main>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="fixed top-4 right-4 mt-4 ml-auto mr-4 z-50">
          <MusicToggleButton />
        </div>
        <div className="relative min-h-screen bg-black bg-opacity-80 bg-repeat text-white">
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
    </div>
  );
}

export default App;
