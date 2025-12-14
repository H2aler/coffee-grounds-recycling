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
        coffee: {
          50: "#faf7f2",
          100: "#f4ede0",
          200: "#e8d9c1",
          300: "#d9c09a",
          400: "#c9a372",
          500: "#b8875a",
          600: "#a9734d",
          700: "#8b5d41",
          800: "#714d3a",
          900: "#5d4032",
        },
        palette: {
          brown: "#654321",
          brownLight: "#654A21",
          brownDark: "#473417",
          blue: "#213265",
          blueDark: "#172347",
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;

