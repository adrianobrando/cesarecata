import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        "primary-blue": "#1e3a8a",
        "light-blue": "#dbeafe",
        "dark-blue": "#0f172a",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-fraunces)", "serif"],
      },
    },
  },
} satisfies Config;
