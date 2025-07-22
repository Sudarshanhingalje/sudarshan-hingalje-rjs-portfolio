/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // <-- move this here!
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['"Cinzel"', "serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        script: ['"Great Vibes"', "cursive"],
        elegant: ['"Playfair Display"', "serif"],
        jello: ["GT-Flexa", "sans-serif"],
      },
      fontSize: {
        "18vw": "18vw",
      },
      backdropBlur: {
        xs: "2px",
      },
      perspective: {
        1000: "1000px",
      },
      colors: {
        neutral: {
          900: "#1a1a1a",
          800: "#2a2a2a",
          700: "#3a3a3a",
        },
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        shooting: {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(-100vw)", opacity: 0 },
        },
      },
      animation: {
        twinkle: "twinkle 20s ease-in-out infinite",
        shooting: "shooting 2s linear forwards",
      },
    },
  },
  plugins: [],
  safelist: ["bg-grid-pattern"],
};
