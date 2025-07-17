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

          {/* ✅ Wheel is now outside blurred content, so always visible */}
          <Wheel />

          <div
            className={
              loading
                ? "blur-sm brightness-50 pointer-events-none"
                : "blur-0 transition-all duration-500"
            }
          >
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
