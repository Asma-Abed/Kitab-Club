/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/*.html'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        colorPrimary: '#F98E54',
        colorSecondary: '#093D65',
        colorText: '#222',
      },
      spacing: {
        w: '500px',
        h: '333px',
      },
    },
  },
  plugins: [],
};
