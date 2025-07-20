/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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

      darkMode: "class",
    },
  },
  plugins: [],
  safelist: ["bg-grid-pattern"],
};
