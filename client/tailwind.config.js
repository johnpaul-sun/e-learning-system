/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: { min: '600px', max: '1200px' },
        mobile: { min: '300px', max: '599px' }
      },
      colors: {
        success: "#0EDE6E",
        failed: "#DC2626",
        els: {
          dark: "#101528",
          light: "#4497EE",
          10: "#0081F9",
          30: "#303030",
          60: "#F6F6F6",
        }, 
      },
},
  },
  plugins: [],
}
