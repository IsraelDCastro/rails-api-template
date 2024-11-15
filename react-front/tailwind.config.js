/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4d9fe4",
          foreground: "#ffffff",
          50: "#f1f8fd",
          100: "#deeffb",
          200: "#c5e4f8",
          300: "#9dd4f3",
          400: "#6fbbeb",
          500: "#4d9fe4",
          600: "#3884d8",
          700: "#2f70c8",
          800: "#2c5aa1",
          900: "#284d80",
          950: "#1d304e"
        },
        secondary: {
          DEFAULT: "#04c8c3",
          foreground: "#ffffff",
          50: "#effefc",
          100: "#c7fff9",
          200: "#90fff3",
          300: "#51f7ec",
          400: "#1de4dd",
          500: "#04c8c3",
          600: "#00a8a8",
          700: "#057f80",
          800: "#0a6365",
          900: "#0d5354",
          950: "#002f33"
        },
        tertiary: {
          DEFAULT: "#a265d0",
          foreground: "#ffffff",
          50: "#faf6fd",
          100: "#f4ecfb",
          200: "#e7d8f6",
          300: "#d7baed",
          400: "#bf91e1",
          500: "#a265d0",
          600: "#8646b3",
          700: "#703794",
          800: "#5e2f79",
          900: "#502b64",
          950: "#301240"
        }
      }
    },
    fontFamily: {
      sans: ['"Inter"', "Lato", '"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      body: ['"PT Sans"', "Nunito", "Lato", '"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"]
    }
  },
  darkMode: "class",
  plugins: [nextui()]
};
