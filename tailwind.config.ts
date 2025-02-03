import type { Config } from "tailwindcss";
import formsPlugin from "@tailwindcss/forms";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: "var(--roboto-text)",
        rubick: "var(--rubick-text)",
      },
      margin: {
        tomato: "120px",
      },
      borderRadius: {
        "sexy-name": "11.11px",
      },
    },
  },
  plugins: [formsPlugin],
} satisfies Config;
