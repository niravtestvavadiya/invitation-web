import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Driven at runtime by CSS variables set per theme.
        bg: "var(--c-bg)",
        surface: "var(--c-surface)",
        ink: "var(--c-ink)",
        muted: "var(--c-muted)",
        accent: "var(--c-accent)",
        "accent-soft": "var(--c-accent-soft)",
        line: "var(--c-line)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        label: "var(--font-label)",
      },
    },
  },
  plugins: [],
};

export default config;
