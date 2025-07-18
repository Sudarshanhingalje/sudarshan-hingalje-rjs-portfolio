import { motion } from "framer-motion";
import avatar from "../assets/yoga.svg";

export default function TalkingAvatar({ isSpeaking }) {
  const bounce = isSpeaking ? "animate-bounce" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 7.5, duration: 1.2 }}
      className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 ${bounce}`}
    >
      <img
        src={avatar}
        alt="Avatar"
        className="w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px] xl:w-[260px] max-w-[80vw] h-auto object-contain"
      />
    </motion.div>
  );
}
