import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
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
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 4000); // Stop after 4s
  };

  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Main>
      <Toaster position="top-right" reverseOrder={false} />
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
                <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
                  <TalkingAvatar
                    text="Hello there! I’m your smart assistant speaking to you!"
                    isSpeaking={isSpeaking}
                  />
                  <button
                    onClick={handleSpeak}
                    className="mt-10 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition"
                  >
                    Talk
                  </button>
                </div>
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
