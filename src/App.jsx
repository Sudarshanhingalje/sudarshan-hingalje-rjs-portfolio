import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Header from "./sections/Header";
import Personal from "./sections/Personal";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import SplashCursor from "./ui/CustomCursor";
import TechParallax from "./ui/TechParallax";
import SmoothScroll from "./utils/SmoothScroll";

function App() {
  return (
    <div className=" bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <SmoothScroll>
        <SplashCursor />

        <Header />
        <About />

        <TechParallax />
        <Skills />
        <Projects />
        <Experience />
        <Personal />
        <Contact />
      </SmoothScroll>
    </div>
  );
}
export default App;
