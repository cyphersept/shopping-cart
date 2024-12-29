import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: ['"Corben"', '"Sitka Text"', "Cambria", "serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        tahiti: {
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        heather: {
          "50": "#f5f5f9",
          "100": "#e7e7f2",
          "200": "#d5d5e8",
          "300": "#b8b9d8",
          "400": "#9596c5",
          "500": "#7f7cb5",
          "600": "#716aa6",
          "700": "#60578c",
          "800": "#58507d",
          "900": "#494365",
          "950": "#302c3f",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
