// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        arrowRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(32px)" },
        },
      },
      animation: {
        arrowRight: "arrowRight 1s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};