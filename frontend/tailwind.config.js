import { mtConfig } from "@material-tailwind/react";
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
    './node_modules/react-big-calendar/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        light: '#F8F4F9', 
        dark: '#3A3A3A',
        text: '#5C5C5C',
        primary: {
          DEFAULT: '#E5A1C5', 
          hover: '#D081AB', 
        },
        secondary: {
          DEFAULT: '#A0D8B3', 
          hover: '#89B999',
        },
      }
    },
  },
  plugins: [ mtConfig ],
}

