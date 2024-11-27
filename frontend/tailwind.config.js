/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{jsx, js}"
  ],
  theme: {
    
    extend: {colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
      customGray: '#333',
       // Your custom color
      // Add more colors as needed
    },},
  },
  plugins: [],
}   