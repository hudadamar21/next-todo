module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    container: {
      cener: true,
      padding: '9rem'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
