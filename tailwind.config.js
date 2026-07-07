/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          DEFAULT: "var(--il-brand)",
          strong: "var(--il-brand-strong)",
          soft: "var(--il-brand-soft)",
          foreground: "var(--il-brand-foreground)",
        },
        surface: {
          DEFAULT: "hsl(var(--il-background))",
          foreground: "hsl(var(--il-foreground))",
          muted: "hsl(var(--il-muted))",
          "muted-foreground": "hsl(var(--il-muted-foreground))",
          border: "hsl(var(--il-border))",
          card: "hsl(var(--il-card))",
        },
      },
    },
  },
  plugins: [],
};
