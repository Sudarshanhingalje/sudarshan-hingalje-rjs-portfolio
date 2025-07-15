import { motion } from "framer-motion";
import bgImage from "../assets/brand.png";

export default function Navbar() {
  return (
    <div>
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 4, ease: "easeOut" }}
        className="w-full fixed top-0 left-0 flex items-center justify-between px-4 md:px-8 py-3 z-30 bg-transparent"
      >
        {/* Your name on the left */}
        <div className="text-white text-lg md:text-xl font-bold tracking-wide">
          Sudarshan Hingalje
        </div>

        {/* Logo on the right */}
        <button
          onClick={() => window.location.reload()}
          className="focus:outline-none"
        >
          <img
            src={bgImage}
            alt="Logo"
            className="h-10 md:h-14 w-auto object-contain"
          />
        </button>
      </motion.nav>
    </div>
  );
}
