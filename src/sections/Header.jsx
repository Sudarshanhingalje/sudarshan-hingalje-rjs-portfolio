import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import SplitType from "split-type";
import avatar from "../assets/yoga.svg";
import Navbar from "../components/Navbar";
import { getResumeLink } from "../data/Resume/getResumeLink";
import useScrollAnimation from "../utils/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [resumeLink, setResumeLink] = useState(null);
  const textRef = useRef(null);

  useScrollAnimation(); // your custom hook

  useEffect(() => {
    const fetchResume = async () => {
      const link = await getResumeLink();
      setResumeLink(link);
    };

    fetchResume();
  }, []);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: "chars" });

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
    });

    return () => {
      split.revert(); // cleanup on unmount
    };
  }, []);

  return (
    <header
      id="header"
      className="h-screen w-full relative flex items-center justify-center px-4 md:px-8"
    >
      <Navbar />
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between w-full gap-8">
        {/* LEFT */}
        <div className="flex flex-col items-start justify-center gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-[7vw] font-extrabold leading-tight"
          >
            Full Stack{" "}
            <span ref={textRef} className="text-[#ffc857] inline-block">
              Developer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400"
          >
            I build modern and performant web applications using JavaScript,
            React.js, Node.js, and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex gap-4"
          >
            <a
              href="#contact"
              className="bg-[#ffc857] text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
            >
              Hire Me
            </a>
            {resumeLink && (
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[#ffc857] text-[#ffc857] px-6 py-3 rounded-full font-semibold hover:bg-[#ffc857] hover:text-black transition"
              >
                <FaDownload />
                Resume
              </a>
            )}
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative w-64 h-64 md:w-80 md:h-80"
        >
          <img
            src={avatar}
            alt="Avatar"
            className="absolute inset-0 w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
