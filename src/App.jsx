import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Main from "./components/Main";
import Wheel from "./components/Wheel";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Header from "./sections/Header";
import Personal from "./sections/Personal";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import SplashCursor from "./ui/CustomCursor";
import TechParallax from "./ui/TechParallax";
import SmoothScroll from "./utils/SmoothScroll";
import useScrollAnimation from "./utils/useScrollAnimation";

function App() {
  const [loading, setLoading] = useState(true);
  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Main>
      <div className="relative bg-gray-100 dark:bg-gray-900">
        <SmoothScroll>
          <SplashCursor />

          <div
            className={
              loading
                ? "blur-sm brightness-50 pointer-events-none"
                : "blur-0 transition-all duration-500"
            }
          >
            <Wheel />

            <Header />
            <About />
            <TechParallax />
            <Skills />
            <Projects />
            <Experience />
            <Personal />
            <Contact />
            <Footer />
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
