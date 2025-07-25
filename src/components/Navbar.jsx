import { motion } from "framer-motion";
import bgImage from "../assets/brand.svg";

export default function Navbar() {
  return (
    <div>
      <motion.nav className="fixed top-0 left-0 w-full z-50 sm:px-6 md:px-10 ">
        <button
          onClick={() => window.location.reload()}
          className="focus:outline-none"
        >
          <img
            src={bgImage}
            alt="Logo"
            className="h-20 sm:h-25 md:h-35 lg:h-30 w-auto object-contain cursor-pointer z-50"
          />
        </button>
      </motion.nav>
    </div>
  );
}
