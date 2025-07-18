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

      {/* 🔹 Music Toggle (fixed at top-right corner) */}
      <div className="fixed top-4 right-4 z-50">
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
