/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-orange": "#D84727",
        "primary-orange-bright": "#F1DDC9",
        secondary: "#F1F1F1",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
