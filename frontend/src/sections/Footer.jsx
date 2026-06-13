// src/sections/Footer.jsx
import { FaEnvelope, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import bgImage from "../assets/brand2.svg";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="flex flex-col items-center pb-10 
      text-slate-800
      dark:bg-gradient-to-t dark:from-[#0b0c15] dark:text-white
      transition-colors duration-500"
    >
      <p className="text-xs dark:text-gray-400 text-slate-500 py-4">
        Made with ❤️ React Js+Vite
      </p>

      <div className="dark:text-white text-slate-800 font-medium">
        Sudarshan Hingalje © 2025
      </div>

      <div className="my-4">
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="focus:outline-none group"
        >
          <img
            src={bgImage}
            alt="Logo"
            className="h-20 md:h-20 w-full object-contain cursor-pointer 
            hover:scale-110 transition-transform duration-300
            dark:brightness-100 brightness-75 hover:brightness-100"
          />
        </button>
      </div>

      <ul className="flex items-center justify-center gap-6 text-xl">
        <li>
          <a
            href="https://www.linkedin.com/in/sudarshanhingalje"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-gray-300 text-slate-600 
            dark:hover:text-blue-400 hover:text-blue-600 
            hover:scale-125 transition-all duration-300"
          >
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/sudarshanhingalje"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-gray-300 text-slate-600 
            dark:hover:text-cyan-400 hover:text-blue-500 
            hover:scale-125 transition-all duration-300"
          >
            <FaTwitter />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/sudarshanhingalje"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-gray-300 text-slate-600 
            dark:hover:text-pink-400 hover:text-pink-600 
            hover:scale-125 transition-all duration-300"
          >
            <FaInstagram />
          </a>
        </li>
        <li>
          <a
            href="mailto:sudarshanhingalje1@gmail.com"
            className="dark:text-gray-300 text-slate-600 
            dark:hover:text-green-400 hover:text-green-600 
            hover:scale-125 transition-all duration-300"
          >
            <FaEnvelope />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
