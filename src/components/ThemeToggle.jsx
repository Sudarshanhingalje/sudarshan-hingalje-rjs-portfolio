import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import useTheme from "../hooks/UseTheme";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useTheme();

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`relative flex flex-col items-center w-9 h-20 py-1 rounded-full transition-colors duration-300 ease-in-out ${
        isDarkMode ? "bg-neutral-800" : "bg-yellow-300"
      }`}
    >
      {/* Slider knob */}
      <span
        className={`absolute w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          isDarkMode ? "translate-y-11" : "translate-y-0"
        }`}
      />

      {/* Top icon */}
      <SunIcon className="w-5 h-5 text-yellow-500 z-10 mt-[2px]" />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom icon */}
      <MoonIcon className="w-5 h-5 text-gray-300 z-10 mb-[2px]" />
    </button>
  );
};

export default ThemeToggle;
