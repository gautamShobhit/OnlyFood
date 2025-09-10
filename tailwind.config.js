/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ important for toggling manually
  content: [
    "./App.js", // root-level main JS
    "./src/**/*.{js,jsx,ts,tsx}", // all components
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          600: "#4B5563",
          800: "#1F2937",
        },
        white: "#FFFFFF",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
