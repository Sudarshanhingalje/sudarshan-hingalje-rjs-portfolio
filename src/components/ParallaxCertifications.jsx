// src/components/ParallaxCertifications.jsx
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaAward,
  FaCalendarAlt,
  FaCertificate,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { certificationData } from "../data/certificates/TechNamesScrolling";

export default function ParallaxCertifications() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  // Auto-advance slides
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certificationData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovering]);

  // Mouse parallax effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.02;
      const deltaY = (e.clientY - centerY) * 0.02;

      const cards = container.querySelectorAll(".cert-card");
      cards.forEach((card, index) => {
        const depth = (index + 1) * 0.5;
        card.style.transform = `translate(${deltaX * depth}px, ${
          deltaY * depth
        }px) rotateX(${deltaY * 0.1}deg) rotateY(${deltaX * 0.1}deg)`;
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % certificationData.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + certificationData.length) % certificationData.length
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 px-6 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated Background */}
      <motion.div style={{ rotate }} className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 mb-4 text-sm font-semibold text-cyan-400 border border-cyan-400 px-6 py-2 rounded-full bg-cyan-400/10 backdrop-blur-sm">
          <FaCertificate size={14} />
          Professional Certifications
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-['Orbitron']">
          Achievements
        </h2>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-['Rajdhani']">
          Certified expertise in cutting-edge technologies and development
          practices
        </p>
      </motion.div>

      {/* Main Certification Display */}
      <div className="max-w-7xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="cert-card grid lg:grid-cols-2 gap-12 items-center mb-16"
            style={{ perspective: "1000px" }}
          >
            {/* Certificate Image */}
            <motion.div style={{ y, scale }} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-3xl border border-gray-700/50 backdrop-blur-lg">
                <motion.img
                  src={certificationData[activeIndex].image}
                  alt={certificationData[activeIndex].title}
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full"
                >
                  <FaAward className="text-white text-xl" />
                </motion.div>
              </div>
            </motion.div>

            {/* Certificate Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Orbitron']">
                  {certificationData[activeIndex].title}
                </h3>
                <p className="text-xl text-purple-300 font-semibold font-['Rajdhani']">
                  {certificationData[activeIndex].issuer}
                </p>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {certificationData[activeIndex].description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-3">
                {certificationData[activeIndex].skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 px-4 py-2 rounded-full text-cyan-300 text-sm font-medium backdrop-blur-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-400" />
                  <span>{certificationData[activeIndex].date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCertificate className="text-cyan-400" />
                  <span>ID: {certificationData[activeIndex].credentialId}</span>
                </div>
              </div>

              {/* Action button */}
              <motion.a
                href={certificationData[activeIndex].verifyLink}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
              >
                Verify Certificate
                <FaExternalLinkAlt size={14} />
              </motion.a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-8">
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-gray-800/50 border border-gray-700 rounded-full text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
          >
            <FaChevronLeft size={20} />
          </motion.button>

          {/* Indicators */}
          <div className="flex gap-3">
            {certificationData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "bg-gradient-to-r from-cyan-400 to-purple-400 scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-gray-800/50 border border-gray-700 rounded-full text-white hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
          >
            <FaChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
