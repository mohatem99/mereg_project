export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        customBlue900: "#10197A",
        customBlue800: "#1A2793",
        customBlue700: "#2A3BB7",
        customBlue600: "#3D53DB",
        customBlue500: "#546FFF",
        customBlue400: "#9F84FD",
        customBlue300: "#98ABFF",
        customBlue200: "#BAC8FF",
        customBlue100: "#DCE4FF",
        customlight: "#EFF4FF",
        customGray: "#F5F5F7",
        darkest: "#10197A",
        whiteblue: "#DCE4FF",
        lightyellow: "#FEFB96",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"], // Add Montserrat font
      },
      borderRadius:{
        lg: '14px'
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
