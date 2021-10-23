module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  // mode: 'jit',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '4rem',
        lg: '7rem',
        xl: '10rem',
      },
    },
    extend: {
      colors: {
        primary: '#16ABF8'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
