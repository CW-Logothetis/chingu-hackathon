console.log(process.env.NODE_ENV)
const purge = process.env.NODE_ENV === 'production' ? true : false;

const { lightBlue } = require('tailwindcss/colors');
const colors = require('tailwindcss/colors')

module.exports = {
  purge: { enabled: purge, content:['./build/**/*.html'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: colors,
    
    extend: {
      backgroundImage: {
        'star-bgImg-kai-pilger-unsplash': "url('../img/star-bgImg-kai-pilger-unsplash.jpeg')",
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))', 
        'gradient-radial-at-t': 'radial-gradient(ellipse at top, var(--tw-gradient-stops))', 
        'gradient-radial-at-b': 'radial-gradient(ellipse at bottom, var(--tw-gradient-stops))', 
        'gradient-radial-at-l': 'radial-gradient(ellipse at left, var(--tw-gradient-stops))', 
        'gradient-radial-at-r': 'radial-gradient(ellipse at right, var(--tw-gradient-stops))', 
        'gradient-radial-at-tl': 'radial-gradient(ellipse at top left, var(--tw-gradient-stops))', 
        'gradient-radial-at-tr': 'radial-gradient(ellipse at top right, var(--tw-gradient-stops))', 
        'gradient-radial-at-bl': 'radial-gradient(ellipse at bottom left, var(--tw-gradient-stops))', 
        'gradient-radial-at-br': 'radial-gradient(ellipse at bottom right, var(--tw-gradient-stops))', 
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  } 

