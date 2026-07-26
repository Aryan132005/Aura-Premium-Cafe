/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          dark: "#120a07",
          card: "#1c100b",
          darker: "#0a0503",
          gold: "#c9a227",
          goldHover: "#e0b833",
          goldLight: "#f4e8c1",
          cream: "#faf7f2",
          creamMuted: "#f0e6d6",
          terracotta: "#9e472a",
          brownText: "#4a3b32"
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(18,10,7,0.75), rgba(18,10,7,0.95))',
        'gold-gradient': 'linear-gradient(135deg, #c9a227 0%, #e5c158 50%, #b38b19 100%)'
      }
    },
  },
  plugins: [],
}
