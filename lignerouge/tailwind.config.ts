import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0D1B2A',
        navy2: '#162233',
        rouge: '#C01D35',
        rouge2: '#A01728',
        bg: '#F2F1EE',
        bg2: '#ECEAE6',
        border: '#DEDBD4',
        border2: '#CCCAC3',
        text1: '#1A1A1A',
        text2: '#4A4A4A',
        text3: '#7A7A7A',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
