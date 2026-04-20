import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0a0a0b",
          surface: "#141416",
          elevated: "#1c1c1f",
          subtle: "#0f0f10",
        },
        line: {
          DEFAULT: "#26262a",
          strong: "#333338",
        },
        fg: {
          DEFAULT: "#f5f5f7",
          muted: "#a1a1aa",
          dim: "#71717a",
          faint: "#52525b",
        },
        accent: {
          DEFAULT: "#00e57a",
          hover: "#00d16f",
          dim: "#003d1f",
          tint: "#0a1f12",
          ring: "#1a4a2e",
        },
        danger: {
          DEFAULT: "#f43f5e",
          dim: "#2a0a10",
        },
        warning: {
          DEFAULT: "#f59e0b",
          dim: "#2a1f05",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "SF Mono", "Menlo", "monospace"],
      },
      borderRadius: {
        DEFAULT: "6px",
        md: "6px",
        lg: "8px",
      },
      fontSize: {
        "display-xl": ["40px", { lineHeight: "1.12", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-lg": ["26px", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
};

export default config;
