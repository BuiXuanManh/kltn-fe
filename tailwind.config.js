/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        tblack: '#081C36',
        tblue: "#0C4DA2",
        tyellow: "#FCD34D",
        dark: "#181A1B"
      },
    },
  },
  plugins: [],
});
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: "class",
//   theme: {
//     extend: {
//       colors: {
//         tblack: '#081C36',
//         tblue: "#0C4DA2",
//         tyellow: "#FCD34D",
//         dark: "#181A1B"
//       },
//     },
//   },
//   plugins: [],
// }
