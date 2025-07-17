import { motion } from "framer-motion";
import { FcMusic } from "react-icons/fc";
import bgImage from "../assets/brand2.svg";

export default function Navbar() {
  return (
    <div>
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 5, ease: "easeOut" }}
        className="w-full fixed top-0 left-0 flex items-center justify-between px-4 md:px-8 py-3 z-30 bg-transparent"
      >
        {/* Your name on the left */}
        <div className="text-white text-lg md:text-xl font-bold tracking-wide font-cinzel underline">
          <em>
            Sudarshan Hingalje &nbsp;
            <FcMusic />
          </em>
        </div>

        {/* Logo on the right */}
        <button
          onClick={() => window.location.reload()}
          className="focus:outline-none"
        >
          <img
            src={bgImage}
            alt="Logo"
            className="h-20 md:h-20  w-full object-contain cursor-pointer"
          />
        </button>
      </motion.nav>
    </div>
  );
}
