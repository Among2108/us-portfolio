import { ArrowLeft } from "lucide-react";

// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        
        arrowRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(32px)" },
        },
        arrowLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-32px)" },
        },
        rainbow: {
        "0%": { backgroundPosition: "0% 50%" },
        "100%": { backgroundPosition: "200% 50%" },
      },
      },
      animation: {
        arrowRight: "arrowRight 1s ease-in-out infinite alternate",
        arrowLeft: "arrowLeft 1s ease-in-out infinite alternate",
              rainbow: "rainbow 4s linear infinite",
      },
    },
  },
  plugins: [],
};
