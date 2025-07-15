import Navbar from "./components/Navbar";
import About from "./sections/About";
import Header from "./sections/Header";
import TechMarquee from "./ui/TechMarquee";
import TechMarqueeEmpty from "./ui/TechMarqueeEmpty.jsx";
import SmoothScroll from "./utils/SmoothScroll";
function App() {
  return (
    <div>
      <SmoothScroll>
        <Navbar />
        <Header />
        <About />
        <TechMarqueeEmpty />
        <TechMarquee />
      </SmoothScroll>
    </div>
  );
}

export default App;
