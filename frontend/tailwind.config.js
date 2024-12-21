import { nextui } from "@nextui-org/theme";  // Note: import from @nextui-org/theme, not react


/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{jsx, js}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000000',
        white: '#ffffff',
        customGray: '#333',
        lightPurple: "#f5f3ff", // Custom light purple color
        gray100: "#f3f4f6",
        // Your custom color
        // Add more colors as needed
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}   