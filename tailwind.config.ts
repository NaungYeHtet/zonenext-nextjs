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
          "50": "#eef9ff",
          "100": "#daf0ff",
          "200": "#bde6ff",
          "300": "#8fd7ff",
          "400": "#5abfff",
          "500": "#33a1fd",
          "600": "#1e83f2",
          "700": "#166cdf",
          "800": "#1957b4",
          "900": "#1a4b8e",
          "950": "#152f56",
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
