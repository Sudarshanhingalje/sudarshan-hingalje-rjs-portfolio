import { motion } from "framer-motion";
import bgImage from "../assets/brand.svg";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <div>
      <motion.nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-10 py-3 flex  justify-between bg-transparent">
        <button
          onClick={() => window.location.reload()}
          className="focus:outline-none"
        >
          <img
            src={bgImage}
            alt="Logo"
            className="h-10 sm:h-12 md:h-16 w-auto object-contain cursor-pointer z-50 md:z-0 md:ml-4 md:mr-4 "
          />
        </button>
      </motion.nav>
      <div className="fixed top-4 right-20 z-50 flex items-center gap-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
