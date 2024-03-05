/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      black: {
        50: "#000000",
      },
      neon: {
        50: "#D0FD3E",
      },
    },
  },
  plugins: [],
};
