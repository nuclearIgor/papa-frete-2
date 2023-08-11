/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        papaYellow: '#FFC72C',
        papaBlue: '#11111F'
      }
    },
  },
  plugins: [require('flowbite/plugin'), require("daisyui")],
}

