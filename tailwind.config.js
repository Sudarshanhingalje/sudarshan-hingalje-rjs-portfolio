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
