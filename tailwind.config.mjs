/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        // Fun & Creative Fonts
        'winky': ['Winky Rough', 'cursive'],
        'kalam': ['Kalam', 'cursive'],
        'caveat': ['Caveat', 'cursive'],
        'architects': ['Architects Daughter', 'cursive'],
        'indie': ['Indie Flower', 'cursive'],
        'marker': ['Permanent Marker', 'cursive'],
        // Modern & Clean Fonts
        'fredoka': ['Fredoka', 'sans-serif'],
        'comfortaa': ['Comfortaa', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        // Rough & Distressed Fonts (similar to Winky Rough)
        'creepster': ['Creepster', 'cursive'],
        'griffy': ['Griffy', 'cursive'],
        'nosifer': ['Nosifer', 'cursive'],
        'butcherman': ['Butcherman', 'cursive'],
        'eater': ['Eater', 'cursive'],
      },
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
        popover: '#ffffff',
        'popover-foreground': '#000000',
      },
      keyframes: {
        'animate-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'animate-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'slide-in-from-top': {
          '0%': { transform: 'translateY(-2px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          '0%': { transform: 'translateY(2px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          '0%': { transform: 'translateX(-2px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          '0%': { transform: 'translateX(2px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'zoom-out': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.95)' },
        },
      },
      animation: {
        'in': 'animate-in 0.2s ease-out',
        'out': 'animate-out 0.2s ease-in',
        'slide-in-from-top': 'slide-in-from-top 0.2s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.2s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.2s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.2s ease-out',
        'zoom-in': 'zoom-in 0.2s ease-out',
        'zoom-out': 'zoom-out 0.2s ease-in',
      },
    },
  },
  plugins: [],
  safelist: [
    'animate-in',
    'fade-in-0',
    'zoom-in-95',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
  ],
}
