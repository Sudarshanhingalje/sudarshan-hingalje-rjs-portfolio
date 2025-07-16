import { FaEnvelope, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import bgImage from "../assets/brand2.png";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center pb-10 bg-[#0b0b0b] text-[#b0b2c3]">
      <p className="text-xs text-gray-400 py-4"> Made with ❤️React Js+vite</p>
      Sudarshan Hingalje © 2025
      <div className="my-4">
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
            });
          }}
          className="focus:outline-none"
        >
          <img
            src={bgImage}
            alt="Logo"
            className="h-20 md:h-20  w-full object-contain cursor-pointer"
          />
        </button>
      </div>
      <ul className="flex items-center justify-center gap-6 text-xl">
        <li>
          <a
            href="https://www.linkedin.com/in/sudarshanhingalje"
            target="_blank"
            className="hover:text-white"
          >
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/sudarshanhingalje"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500"
          >
            <FaTwitter />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/sudarshanhingalje"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaInstagram />
          </a>
        </li>
        <li>
          <a
            href="mailto:sudarshanhingalje1@gmail.com"
            className="hover:text-white"
          >
            <FaEnvelope />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
