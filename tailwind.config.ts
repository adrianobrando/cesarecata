import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        "primary-blue": "#174e70",
        "light-blue": "#d8eaf3",
        "dark-blue": "#102b42",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-fraunces)", "serif"],
      },
    },
  },
} satisfies Config;
