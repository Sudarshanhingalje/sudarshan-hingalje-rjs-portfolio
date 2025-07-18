import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const SpinHint = () => {
  const [showArrow, setShowArrow] = useState(false);

  const handleHover = () => {
    setShowArrow(true);
    setTimeout(() => {
      setShowArrow(false);
    }, 1000); // 1 second
  };

  return (
    <div className="relative flex items-center gap-2">
      <p
        onMouseEnter={handleHover}
        className="cursor-pointer text-white hover:text-yellow-400 transition"
      >
        Let's spin the Sudarshan Chakra!
      </p>

      {showArrow && (
        <motion.div
          className="absolute -right-10 top-1/2 transform -translate-y-1/2 text-yellow-300"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 10 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaArrowRight size={20} />
        </motion.div>
      )}
    </div>
  );
};

export default SpinHint;
