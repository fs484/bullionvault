import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#B8960B',
          light: '#E6C555'
        },
        black: {
          DEFAULT: '#000000',
          light: '#121212'
        }
      }
    },
  },
  plugins: [],
};

export default config;
