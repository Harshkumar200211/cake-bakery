/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          400: '#B5C18E',
        },
        yellow: {
          100: '#F7DCB9',
          300: '#DEAC80',
          500: '#B99470',
        },
      },
    },
  },
  plugins: [],
};
