/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'phone': '300px',
      // => @media (min-width: 640px) { ... }

      'tablet': '768px',
      // => @media (min-width: 1024px) { ... }

      'laptop': '1440px',
      // => @media (min-width: 1280px) { ... }

      'desktop': '1920px',
      // => @media (min-width: 1920px) { ...
    },
    extend: {
      colors: {
        'navbar-bg-color': '#FFFFFF',
        'navbar-border-color': '#D9D9D9',
      },
      boxShadow: {
        'navbar-shadow': '0px 4px 12px 0px #0000001A',
        'device-cards': '0px 4px 16px 0px #0000001A',
        'pop-up': '0px 4px 8px 0px #00000040',
        'pop-up-button': '0px 2px 4px 0px #00000040',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        avenir: ['Avenir', 'sans-serif'],
      },
    },
    
  },
  plugins: [],
};