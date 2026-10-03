/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: { 50: "#eef3f9", 100: "#d9e3f0", 200: "#b3c6e0", 700: "#14325c", 800: "#0b2545", 900: "#071a33", 950: "#041022" },
        gold: { 300: "#e4cd79", 400: "#d7b94a", 500: "#c9a227", 600: "#a98618", 700: "#85690f" },
      },
      fontFamily: {
        serif: ["Charter", "'Iowan Old Style'", "'Palatino Linotype'", "Palatino", "Georgia", "serif"],
        sans: ["system-ui", "-apple-system", "'Segoe UI'", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
