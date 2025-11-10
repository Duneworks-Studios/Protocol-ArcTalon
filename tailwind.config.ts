import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          background: "#0A0E1A",
          panel: "#131824",
          text: "#E6E8F0",
          accent: "#8B7FFF",
          glow: "#A89FFF",
          indigo: "#6F4E37",
          secondary: "#BFA6A0",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "flicker": "flicker 0.15s infinite",
        "scan": "scan 8s linear infinite",
        "typing": "typing 0.5s steps(20) infinite alternate",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 8px #8B7FFF)" },
          "50%": { opacity: "0.8", filter: "drop-shadow(0 0 16px #8B7FFF)" },
        },
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.95" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "typing": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

