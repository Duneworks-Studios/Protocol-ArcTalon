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
        // Dune-inspired palette
        dune: {
          sand: {
            dark: "#1C0E09",
            DEFAULT: "#2A1E13",
            light: "#3D2E21",
          },
          bronze: {
            dark: "#4A3422",
            DEFAULT: "#6B4A2F",
            light: "#8B6239",
          },
          amber: {
            DEFAULT: "#E9A03F",
            bright: "#F4B860",
            glow: "#FFC870",
          },
          crimson: {
            DEFAULT: "#A84B3E",
            dark: "#8B3A2F",
          },
          blue: {
            deep: "#243447",
            DEFAULT: "#2F4A68",
          },
          text: {
            DEFAULT: "#EDE3C9",
            dim: "#C4B5A0",
            bright: "#FFF5E1",
          },
        },
        // Legacy cyber palette (for theme toggle)
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
        "pulse-amber": "pulse-amber 2s ease-in-out infinite",
        "flicker": "flicker 0.15s infinite",
        "scan": "scan 8s linear infinite",
        "typing": "typing 0.5s steps(20) infinite alternate",
        "dust-float": "dust-float 20s linear infinite",
        "heatwave": "heatwave 8s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 8px #8B7FFF)" },
          "50%": { opacity: "0.8", filter: "drop-shadow(0 0 16px #8B7FFF)" },
        },
        "pulse-amber": {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 8px #E9A03F)" },
          "50%": { opacity: "0.8", filter: "drop-shadow(0 0 16px #E9A03F)" },
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
        "dust-float": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0.3" },
          "50%": { transform: "translateY(-100vh) translateX(50px)", opacity: "0.6" },
          "100%": { transform: "translateY(-200vh) translateX(0)", opacity: "0" },
        },
        "heatwave": {
          "0%, 100%": { transform: "scaleY(1) translateY(0)" },
          "50%": { transform: "scaleY(1.02) translateY(-2px)" },
        },
      },
      backgroundImage: {
        "dune-gradient": "linear-gradient(135deg, #1C0E09 0%, #2A1E13 50%, #3D2E21 100%)",
        "bronze-gradient": "linear-gradient(135deg, #4A3422 0%, #6B4A2F 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

