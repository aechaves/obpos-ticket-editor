const defaultTheme = require( 'tailwindcss/defaultTheme' )

module.exports = {
  mode: "jit",
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      screens: {
        'print': { 'raw': 'print' },
        // => @media print { ... }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
