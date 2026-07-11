import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces (dark premium)
        ink: "#0B0D10", // page base
        panel: "#0E1115", // cards / panels
        raised: "#14181E", // inputs / raised
        elev: "#1B2026", // gradient hi surface
        // Brand accent (olive-lime)
        accent: {
          DEFAULT: "#6EA921",
          hover: "#5C8E1C",
        },
        // Text
        cream: "#F4F1EA",
        muted: "#A7A9AC",
        dim: "#6E7178",
        // Status / utility
        info: "#5B9DD9",
        warn: "#D89B2B",
        ok: "#2E7D5B",
        danger: "#C1121F",
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        mono: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      maxWidth: {
        site: "1440px",
      },
      keyframes: {
        fade: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        fade: "fade 0.5s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
