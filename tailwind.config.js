const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './app/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: colors.blue,
      secondary: colors.indigo,
      danger: colors.red,
      white: colors.white,
      gray: colors.gray,
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
