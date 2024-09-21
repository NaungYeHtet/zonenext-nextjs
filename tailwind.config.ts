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
          "50": "#fdf5f3",
          "100": "#fbe9e5",
          "200": "#f9dbd4",
          "300": "#f3bbae",
          "400": "#e99480",
          "500": "#dd7056",
          "600": "#c8553a",
          "700": "#a8442d",
          "800": "#8b3c29",
          "900": "#743628",
          "950": "#3f1910",
        },
        gray: {
          "50": "#f7f4ef",
          "100": "#ebe5d6",
          "200": "#d8cbb0",
          "300": "#c1aa83",
          "400": "#af8f60",
          "500": "#a07d52",
          "600": "#896545",
          "700": "#6f4e39",
          "800": "#5e4335",
          "900": "#412e27",
          "950": "#2e1f1a",
        },
        secondary: {
          "50": "#fef8ec",
          "100": "#fbedca",
          "200": "#f8da8f",
          "300": "#f4c155",
          "400": "#f1aa2e",
          "500": "#ea8816",
          "600": "#cf6510",
          "700": "#ac4611",
          "800": "#8c3614",
          "900": "#5d2510",
          "950": "#421606",
        },
      },
    },
  },
  plugins: [],
};
export default config;
