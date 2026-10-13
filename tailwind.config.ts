import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: { DEFAULT: "#0B1E3F", 2: "#142a55", 3: "#1e3a70" },
        slate2: "#1E293B",
        amber2: { DEFAULT: "#D4A24C", light: "#E6BD6C", dark: "#A8802F" },
        mist: { DEFAULT: "#EEF2F8", 2: "#E4EAF3" },
        ink: "#0F172A",
        muted: "#64748B",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: { widest2: "0.25em" },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [],
};
export default config;
