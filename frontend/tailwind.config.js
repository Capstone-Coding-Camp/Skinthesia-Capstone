/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skpink: '#E16463',
        pink : '#EB9695',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],               
        serif: ['Playfair Display', 'serif'],  
        corinthia: ['Corinthia', 'cursive'],    
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        twinkle: {
          "0%, 100%": { opacity: 0.3 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
