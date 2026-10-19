import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        brand: {
          navy: "#0F2F57",
          "navy-dark": "#091B33",
          slate: "#1E293B",
          cyan: "#00B4D8",
          "cyan-light": "#38BDF8",
          "cyan-subtle": "#F0F9FF",
          blue: "#0284C7",
          "blue-light": "#38BDF8",
          "blue-subtle": "#F0F9FF",
          emerald: "#059669",
          "emerald-light": "#10B981",
          bp: "#00A34A",
          "bp-light": "#78BE20",
          amber: "#D97706",
          accent: "#00B4D8",
        },
        border: "hsl(var(--border, 214 32% 91%))",
        input: "hsl(var(--input, 214 32% 91%))",
        ring: "hsl(var(--ring, 221 83% 53%))",
        background: "hsl(var(--background, 0 0% 100%))",
        foreground: "hsl(var(--foreground, 222 47% 11%))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)",
        "card-hover": "0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.06)",
        bp: "0 4px 20px -2px rgba(16, 185, 129, 0.15)",
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        shine: {
          "0%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 100%" },
          to: { "background-position": "0% 0%" },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shine: "shine var(--duration, 14s) infinite linear",
        "border-beam": "border-beam calc(var(--duration, 6)*1s) infinite linear",
      },
    },
  },
  plugins: [],
};

export default config;
