import { motion } from "framer-motion";
import bgImage from "../assets/brand.svg";

export default function Navbar() {
  return (
    <div>
      <motion.nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-10 py-3 flex  justify-between bg-transparent">
        <div className="text-white text-base sm:text-lg md:text-xl font-bold tracking-wide font-cinzel underline"></div>

        {/* Logo on the right */}
        <button
          onClick={() => window.location.reload()}
          className="focus:outline-none"
        >
          <img
            src={bgImage}
            alt="Logo"
            className="h-10 sm:h-12 md:h-16 w-auto object-contain cursor-pointer"
          />
        </button>
      </motion.nav>
    </div>
  );
}
