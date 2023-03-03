/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        jaburu: {
          100: '#806996',
          200: '#434984',
          300: '#40354B',
          400: '#2E2636',
        },
        white: '#FBFCFF',
        disabled: '#999999',
      },
    },
  },
  plugins: [],
}
