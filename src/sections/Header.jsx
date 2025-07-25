import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import avatar from "../assets/yoga.svg";
import DownloadButton from "../components/DownloadButton";
import Navbar from "../components/Navbar";
import TalkingBubble from "../components/TalkingBubble";

const speechText = `HELLO I'm Sudarshan. My codeword is Paradox. I'm a Full Stack Developer. Let's spin the Sudarshan Chakra to explore my journey through coding, learning, and life!`;

export default function Header() {
  const [showBubble, setShowBubble] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(speechText);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section
      id="header"
      data-speed="1"
      className="relative bg-grid-pattern min-h-screen w-full overflow-hidden transition-colors duration-500 bg-gray-50 text-black"
    >
      <Navbar />

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:block">
        {/* Left Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start pl-6 md:pl-12 lg:pl-16 xl:pl-24">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="mb-6 lg:mb-8"
          >
            <h1 className="text-5xl md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tight leading-none">
              <span className="text-gray-400">FULL STACK</span>
              <br />
              <span className="text-black">DEVELOPER</span>
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-80, 0, 0, -80] }}
            transition={{ duration: 8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wider text-gray-600 mb-6 lg:mb-8"
          >
            Sudarshan Hingalje
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.8 }}
            className="mb-6 lg:mb-8"
          >
            <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-purple-600">
              Sudarshan <br />
              <span className="text-yellow-500 font-black">Hingalje</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1.2 }}
          >
            <DownloadButton />
          </motion.div>
        </div>

        {/* Right Side Content */}
        <div className="absolute right-6 md:right-12 lg:right-16 xl:right-24 top-1/2 transform -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="text-right space-y-4"
          >
            <p className="text-sm font-light tracking-wider max-w-xs">
              I AM PASSIONATE ABOUT
              <br />
              CREATING WEBSITES THAT
              <br />
              STAND OUT FROM THE
              <br />
              CROWD.
            </p>

            <div className="space-y-2 pt-8">
              <div className="text-sm font-light tracking-wider">
                Full Stack Dev
              </div>
              <div className="text-sm font-light tracking-wider">
                FrontEnd Dev
              </div>
              <div className="text-sm font-light tracking-wider">
                BackEnd Dev
              </div>
              <div className="text-sm font-light tracking-wider">
                Software Testing
              </div>
              <div className="text-sm font-light tracking-wider">
                Project Management
              </div>
            </div>
          </motion.div>
        </div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1.2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => {
              setShowBubble(true);
              speakText();
            }}
            onMouseLeave={() => {
              setShowBubble(false);
              window.speechSynthesis.cancel();
            }}
          >
            <div className="relative mx-auto">
              <img
                src={avatar}
                alt="Avatar"
                className="w-[220px] md:w-[280px] lg:w-[300px] xl:w-[360px] rounded-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
              />
              {showBubble && (
                <div className="absolute -top-20 left-full ml-4">
                  <TalkingBubble message={speechText} />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden px-6 pt-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold tracking-tight text-gray-800 mb-4"
        >
          FULL STACK DEVELOPER
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-medium text-gray-600"
        >
          Sudarshan Hingalje
        </motion.p>

        <motion.img
          src={avatar}
          alt="Sudarshan Avatar"
          className="w-40 h-40 mt-6 mx-auto rounded-full grayscale hover:grayscale-0 transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={() => {
            setShowBubble(!showBubble);
            if (!showBubble) speakText();
            else window.speechSynthesis.cancel();
          }}
        />

        {showBubble && (
          <div className="mt-4 flex justify-center">
            <TalkingBubble message={speechText} />
          </div>
        )}

        <div className="mt-6">
          <DownloadButton />
        </div>
      </div>
    </section>
  );
}
