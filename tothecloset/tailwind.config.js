/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  
  ],
  theme: {
    extend: {
        fontFamily: {
          lato: ['Lato', 'sans-serif']
        },
        
        colors: {
          white: "#fff",
          black: "#000",
          dimgray: "#696767",
          gainsboro: "#d9d9d9",
          gray: "#1c1b1b",
          grey: "#B1B1B1",
          darkgrey: "#787575"
        },

        spacing: {
          'length': '40rem', // Adjust the length of HR line
        },

    },
  },

  daisyui: {
    themes: ['light'],
 },

 corePlugins: {
  aspectRatio: false,
},

  plugins: [
    require("daisyui"),
    require('@tailwindcss/aspect-ratio'),
  ],
}
