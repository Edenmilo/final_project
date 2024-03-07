/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      phone: { max: "500px" },
    },
    extend: {},
    colors: {
      black: {
        50: "#000000",
      },
      white: {
        50: "#ffffff",
      },
      gray: {
        50: "#333",
      },
      neon: {
        50: "#D0FD3E",
      },
      red: {
        50: "#ef4444",
      },
    },
  },
  plugins: [],
};
