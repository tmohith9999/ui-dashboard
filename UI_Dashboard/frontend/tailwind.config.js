/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#dbecff',
          200: '#b3d7ff',
          300: '#81beff',
          400: '#4ca2ff',
          500: '#1f87ff',
          600: '#0b6be6',
          700: '#0955b4',
          800: '#0a448a',
          900: '#0b3b70',
        }
      }
    },
  },
  plugins: [],
}


