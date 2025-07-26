import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import chakraImg from "../assets/wheel-fixed.svg"; // Replace with your chakra.svg

const greetings = [
  "Hello",
  "Namaste",
  "नमस्ते",
  "Bonjour",
  "Hola",
  "こんにちは",
  "வணக்கம்",
];

const Loader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [time, setTime] = useState("");

  // Greeting Rotation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= greetings.length) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            onComplete?.();
          }, 800);
          return prev;
        }
        return next;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#1f1f2c] via-[#2a2a3f] to-[#1a1a27] text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          {/* Glowing Chakra Spinner */}
          <motion.img
            src={chakraImg}
            alt="Chakra Loader"
            className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_30px_rgba(98,180,255,0.9)]"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          />

          {/* Neon Name */}
          <motion.h1
            key={index}
            className="mt-8 text-3xl md:text-5xl font-bold tracking-widest text-center text-[#fffce1]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {greetings[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
