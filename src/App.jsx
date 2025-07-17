import { motion } from "framer-motion"; // ✅ Add this import
import { lazy, Suspense, useEffect, useState } from "react";
import Loader from "./components/Loader";
import Main from "./components/Main";
import Wheel from "./components/Wheel";
import SplashCursor from "./ui/CustomCursor";
import ErrorBoundary from "./utils/ErrorBoundary";
import SmoothScroll from "./utils/SmoothScroll";
import useScrollAnimation from "./utils/useScrollAnimation";

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
      <div className="relative min-h-screen bg-[#161b2f] bg-[url('/stars.svg')] bg-repeat text-white overflow-hidden">
        {/* ✅ Animated Floating Background Blobs */}
        <motion.div
          className="absolute top-[-15%] left-[-10%] w-[350px] h-[350px] bg-pink-500 rounded-full opacity-30 blur-3xl z-0"
          animate={{ x: [0, 100, 0], y: [0, 100, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-15%] right-[-10%] w-[300px] h-[300px] bg-blue-500 rounded-full opacity-25 blur-3xl z-0"
          animate={{ x: [0, -100, 0], y: [0, -100, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ✅ Main UI Content */}
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
