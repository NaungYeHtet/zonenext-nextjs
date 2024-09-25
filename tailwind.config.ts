import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    darkMode: "false",
    extend: {
      fontFamily: {
        noto_sans: ["var(--font-noto_sans)"],
        poppins: ["var(--font-poppins)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          "50": "#f5f7fa",
          "100": "#eaeef4",
          "200": "#d0dae7",
          "300": "#a7bad2",
          "400": "#7896b8",
          "500": "#5779a0",
          "600": "#436086",
          "700": "#344966",
          "800": "#31435b",
          "900": "#2c394e",
          "950": "#1e2633",
        },

        secondary: {
          "50": "#f2f6fc",
          "100": "#e1eaf8",
          "200": "#cadbf3",
          "300": "#b4cded",
          "400": "#7ca5de",
          "500": "#5d86d4",
          "600": "#496cc7",
          "700": "#3f5ab6",
          "800": "#384b95",
          "900": "#324176",
          "950": "#222a49",
        },
      },
    },
  },
  plugins: [],
};
export default config;
