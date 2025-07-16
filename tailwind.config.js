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
        dark: "#121212",
      },
      boxShadow: {
        xl: "0 0 20px rgba(255, 255, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
