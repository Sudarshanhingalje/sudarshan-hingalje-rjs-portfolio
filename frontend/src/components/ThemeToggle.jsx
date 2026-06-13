import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import useTheme from "../hooks/UseTheme";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useTheme();

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`relative flex items-center w-16 h-9 px-1 rounded-full transition-colors duration-300 ease-in-out ${
        isDarkMode ? "bg-neutral-800" : "bg-yellow-300"
      }`}
    >
      <span
        className={`absolute w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          isDarkMode ? "translate-x-7" : "translate-x-0"
        }`}
      />

      <SunIcon className="w-5 h-5 text-yellow-500 z-10 ml-[2px]" />
      <MoonIcon className="w-5 h-5 text-gray-300 z-10 ml-auto mr-[2px]" />
    </button>
  );
};

export default ThemeToggle;
