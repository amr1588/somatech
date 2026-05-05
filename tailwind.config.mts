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
          "brand-blue": "#171D5B",
          "brand-orange": "#DC5224",
          "brand-gold": "#EEA820",
        },
        fontFamily: {
          cairo: ["var(--font-cairo)"],
        },
      },
  },
  plugins: [],
};
export default config;
