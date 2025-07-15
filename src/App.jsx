import About from "./sections/About";
import Header from "./sections/Header";
import SplashCursor from "./ui/CustomCursor";
import TechParallax from "./ui/TechParallax";
import SmoothScroll from "./utils/SmoothScroll";

function App() {
  return (
    <div>
      <SmoothScroll>
        <SplashCursor />

        <Header />
        <About />

        <TechParallax />
      </SmoothScroll>
    </div>
  );
}
export default App;
