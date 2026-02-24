import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brandNavy: '#0B1437',
        brandGold: '#C9A84C',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 16px 40px -20px rgba(11, 20, 55, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
