// components/Main.jsx
import { motion } from "framer-motion";

const Main = ({ children }) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {children}
    </motion.main>
  );
};

export default Main;
