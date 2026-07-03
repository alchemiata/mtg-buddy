/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 18px 50px rgba(0, 0, 0, 0.34)",
        soft: "0 14px 36px rgba(25, 19, 11, 0.16)",
      },
    },
  },
  plugins: [],
};
