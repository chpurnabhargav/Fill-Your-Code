/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], // Ensure Tailwind scans your files
  darkMode: "class", // Enables dark mode using the .dark class
  theme: {
    extend: {},
  },
  plugins: [],
};
