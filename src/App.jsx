import { lazy, Suspense, useEffect, useState } from "react";
import Loader from "./components/Loader";
import Main from "./components/Main";
import Wheel from "./components/Wheel";
import SplashCursor from "./ui/CustomCursor";
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
      <div className="relative min-h-screen bg-[#121212] bg-[url('./assets/noise.png')] bg-repeat text-[#1c1c1c]">
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
      </div>
    </Main>
  );
}

export default App;
