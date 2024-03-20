/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors: {
        tblack: '#081C36',
        tblue:"#0C4DA2",
      },
    },
  },
  plugins: [],
}
