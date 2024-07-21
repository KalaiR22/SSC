/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        green:'#007535',
        black:'#000000',
        brown:'#787054',
        white:'#FFFFFF',
        grey:'#B0B0B0',
        blue:'#313957',
        lightblue:'#D4D7E3',
        lightgrey:'#8897AD',
        lightwhite:'#F3F9FA',
      },
      fontFamily:{
        librebodoni:[ 'Libre Bodoni', 'serif']
      },
      fontWeight:{
        regular: 400,
        medium: 500,
        bold: 700,
      }
    },
  },
  plugins: [],
}

