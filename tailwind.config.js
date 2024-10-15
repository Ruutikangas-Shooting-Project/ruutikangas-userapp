/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,css}"  
    // Include all JS, JSX, and CSS files in the src folder and its subfolders
  ],
  theme: {
    backgroundImage: {
      'header-image': "url('/images/header-bg-800x350.jpg')",
    },
    extend: {},
  },
  plugins: [],
}

