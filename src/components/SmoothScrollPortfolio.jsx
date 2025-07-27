import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Award, Camera, Code, MonitorPlay, Users } from "lucide-react";

// Mock avatar image - replace with your actual avatar
const avatar =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";

const SmoothScrollPortfolio = () => {
  const headerRef = useRef(null);
  const aboutRef = useRef(null);
  const avatarRef = useRef(null);
  const aboutImageRef = useRef(null);
  const [showBubble, setShowBubble] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);

  const skills = [
    {
      icon: Code,
      name: "Full-Stack Development",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Camera,
      name: "Wildlife Photography",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      name: "Team Leadership",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      name: "Problem Solving",
      color: "from-orange-500 to-red-500",
    },
  ];

  const speechText = `HELLO I'm Sudarshan. My codeword is Paradox. I'm a Full Stack Developer. Let's spin the Sudarshan Chakra to explore my journey through coding, learning, and life!`;

  useEffect(() => {
    // Import GSAP dynamically (simulated for this demo)
    const initGSAP = async () => {
      // In your real project, you would import GSAP like this:
      // import { gsap } from 'gsap';
      // import { ScrollTrigger } from 'gsap/ScrollTrigger';
      // gsap.registerPlugin(ScrollTrigger);

      // For this demo, we'll simulate the effect with Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === aboutRef.current && entry.isIntersecting) {
              setIsVisible(true);
              // Trigger the avatar transition
              if (avatarRef.current && aboutImageRef.current) {
                avatarRef.current.style.transform =
                  "scale(0.8) translateX(-40vw) translateY(-20vh)";
                avatarRef.current.style.opacity = "0.3";
                aboutImageRef.current.style.opacity = "1";
                aboutImageRef.current.style.transform = "scale(1)";
              }
            } else if (
              entry.target === aboutRef.current &&
              !entry.isIntersecting
            ) {
              // Reset when scrolling back up
              if (avatarRef.current && aboutImageRef.current) {
                avatarRef.current.style.transform =
                  "scale(1) translateX(0) translateY(0)";
                avatarRef.current.style.opacity = "1";
                aboutImageRef.current.style.opacity = "0.8";
                aboutImageRef.current.style.transform = "scale(0.9)";
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      if (aboutRef.current) {
        observer.observe(aboutRef.current);
      }

      return () => observer.disconnect();
    };

    initGSAP();

    // Skills rotation
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % skills.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const speakText = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const TalkingBubble = ({ message }) => (
    <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg max-w-xs relative">
      <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45"></div>
      <p className="text-sm text-gray-800 dark:text-gray-200">
        {message.slice(0, 50)}...
      </p>
    </div>
  );

  const IntroPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-2xl w-full mx-4 relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold z-10"
          >
            ×
          </button>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              My Journey in 60 Seconds 🎬
            </h3>
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4">
              <MonitorPlay className="w-16 h-16 text-gray-400" />
              <span className="ml-4 text-gray-600">Video Introduction</span>
            </div>
            <p className="text-gray-600 text-center">
              Watch my story unfold - from mechanical engineering to full-stack
              development.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* HEADER SECTION */}
      <section
        ref={headerRef}
        className="relative bg-gray-50 min-h-screen w-full overflow-hidden"
      >
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Sudarshan</h1>
              <div className="hidden md:flex space-x-8">
                <a href="#header" className="text-gray-600 hover:text-gray-900">
                  Home
                </a>
                <a href="#about" className="text-gray-600 hover:text-gray-900">
                  About
                </a>
                <a
                  href="#projects"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Projects
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Header Content */}
        <div className="flex items-center justify-center min-h-screen pt-20">
          <div className="text-center space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-6xl md:text-8xl font-black text-gray-800"
            >
              FULL STACK
              <br />
              <span className="text-purple-600">DEVELOPER</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-2xl md:text-3xl font-light text-gray-600"
            >
              Sudarshan{" "}
              <span className="text-yellow-500 font-bold">Hingalje</span>
            </motion.h2>

            {/* AVATAR - This will transition to About section */}
            <motion.div
              ref={avatarRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1.2 }}
              className="relative mx-auto w-64 h-64 transition-all duration-[2000ms] ease-in-out z-20"
              style={{ willChange: "transform, opacity" }}
              onMouseEnter={() => {
                setShowBubble(true);
                speakText();
              }}
              onMouseLeave={() => {
                setShowBubble(false);
                window.speechSynthesis?.cancel();
              }}
            >
              <img
                src={avatar}
                alt="Sudarshan Avatar"
                className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-300 shadow-2xl"
              />

              {showBubble && (
                <div className="absolute -top-20 left-full ml-4">
                  <TalkingBubble message={speechText} />
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
                Download Resume
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        ref={aboutRef}
        className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Large Background Text */}
        <h2 className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[280px] font-black text-gray-100/40 pointer-events-none select-none z-0">
          ABOUT
        </h2>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-16 py-24">
          <div className="max-w-7xl w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Image Section */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative group">
                  {/* Glowing effects */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-700"></div>

                  {/* About Image - This receives the avatar transition */}
                  <div
                    ref={aboutImageRef}
                    className="relative w-80 h-80 transition-all duration-[2000ms] ease-in-out opacity-80 transform scale-90"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={avatar}
                        alt="Sudarshan Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Floating skill indicators */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-500">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="flex flex-col justify-center">
                <div className="mb-8">
                  <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Hello, I'm Sudarshan
                  </h1>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                    <span className="text-gray-600 font-medium">
                      Full-Stack Developer & Creative Soul
                    </span>
                  </div>
                </div>

                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    I'm a{" "}
                    <span className="font-semibold text-cyan-600">
                      detail-oriented and passionate full-stack developer
                    </span>{" "}
                    with a strong foundation in software development and a
                    creative edge. My journey from{" "}
                    <span className="font-semibold text-purple-600">
                      mechanical engineering to coding
                    </span>{" "}
                    has been fueled by curiosity, discipline, and a constant
                    drive to improve.
                  </p>

                  <p>
                    I take pride in{" "}
                    <span className="font-semibold text-blue-600">
                      managing my time effectively
                    </span>
                    —balancing deep learning sessions, project development, and
                    creative hobbies like{" "}
                    <span className="font-semibold text-green-600">
                      wildlife photography, editing, and football
                    </span>
                    . This balance keeps me sharp and constantly inspired.
                  </p>

                  <p>
                    Whether it's a new framework, a short film script, or a team
                    project—
                    <span className="font-semibold text-orange-600">
                      when I commit, I go all in
                    </span>
                    . I love transforming complex problems into clean, intuitive
                    user experiences where design and efficient code go hand in
                    hand.
                  </p>
                </div>

                {/* Inspirational Quote */}
                <div className="my-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border-l-4 border-cyan-500 shadow-lg">
                  <blockquote className="text-xl italic text-cyan-800 mb-3 font-medium">
                    "Discipline turns dreams into reality. Code is just the
                    tool."
                  </blockquote>
                  <p className="text-gray-600 font-medium">
                    ~ Sudarshan Hingalje
                  </p>
                </div>

                {/* Animated Skills */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    What I'm Passionate About
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${
                            activeSkill === index
                              ? `bg-gradient-to-r ${skill.color} text-white shadow-lg scale-105`
                              : "bg-gray-100 text-gray-600 hover:scale-105"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Introduction Button */}
        <button
          onClick={() => setPopupOpen(true)}
          className="fixed bottom-8 left-8 z-50 group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            <div className="relative bg-white p-4 rounded-full shadow-xl group-hover:scale-110 transition-all duration-300">
              <MonitorPlay className="w-7 h-7 text-pink-600" />
            </div>
          </div>
        </button>

        <IntroPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
      </section>
    </div>
  );
};

export default SmoothScrollPortfolio;
