const IntroPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-[50] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-2xl w-full mx-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl font-bold z-10"
        >
          ×
        </button>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            My Journey in 60 Seconds 🎬
          </h3>

          <div className="aspect-video rounded-xl overflow-hidden bg-black mb-4 shadow-xl">
            <video
              src="/assets/projectvideo.mp4"
              controls
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-center">
            Watch my story unfold — from mechanical engineering to full-stack
            development, capturing moments through photography, and building
            dreams through code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroPopup;
