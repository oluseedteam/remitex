/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primary1: '#0328EE',
        primary2: '#0328EE',
        primary4: '#97A7FD',
        primary3: '#010D50',
        dark: "#353535",
        white: '#FFFFFF',
        gray1: '#454545',
        gray4: '#BDBDBD',
        error: "#EB5757",
        
      },


      fontFamily: {
        dm: ['DM', 'sans-serif'],
        
      },

    },
  },
  plugins: [],
}

