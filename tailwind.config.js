// tailwind.config.js
const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "300px",
      sm: "480px",
      mobile: "600px",
      tablet: "640px",
      md: "768px",
      lg: "960px",
      laptop: "1024px",
      desktop: "1280px",
      "2xl": "1440px",
      "3xl": "1600px",
    },
    extend: {
      fontFamily: {
        yekan: ["yekan", "sans"],
      },
      colors: {
        "main-gray": "#EEE",
        "ghost-white": "#FCFCFA",
        "rich-black": "#1C1C1C",
        "persian-green": "#00A693",
      },
      boxShadow: {
        footer: "rgba(0, 0, 0, 0.15) 0px 5px 10px 0px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
