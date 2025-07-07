/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f1ff',
          100: '#e9e5ff',
          200: '#d5cfff',
          300: '#b7a9ff',
          400: '#9478ff',
          500: '#7341ff',
          600: '#631bff',
          700: '#611bf8',
          800: '#4607d0',
          900: '#3c08aa',
          950: '#220174',
        },
      },
    },
  },
  plugins: [],
}
