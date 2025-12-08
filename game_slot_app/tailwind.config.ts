import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        dimlight: {
          "0%, 18%, 20%, 50.1%, 60%, 65.1%, 80%, 90.1%, 92%": {
            color: "#0e3742",
            boxShadow: "none",
          },
          "18.1%, 20.1%, 30%, 50%, 60.1%, 65%, 80.1%, 90%, 92.1%, 100%": {
            color: "#fff",
            textShadow: "0 0 10px #03bcf4",
          },
        },
      },
      fontFamily: {
        quantico: ["Quantico", "san-serif"],
      },
      animation: {
        dimlight: "dimlight 5s infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".box-reflect": {
          "-webkit-box-reflect":
            "below 1px linear-gradient(transparent, #0004)",
        },
      });
    }),
  ],
};

export default config;
