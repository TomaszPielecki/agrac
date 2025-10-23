/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/assets/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'warm-beige': '#F5F5DC',
        'warm-brown': '#8B7355',
        'pastel-orange': '#E6B17A',
        'golden': '#D4A574',
        'soft-white': '#FEFEFE',
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 6px -1px rgba(139, 115, 85, 0.1), 0 2px 4px -1px rgba(139, 115, 85, 0.06)',
        'warm-lg': '0 10px 15px -3px rgba(139, 115, 85, 0.1), 0 4px 6px -2px rgba(139, 115, 85, 0.05)',
      },
    },
  },
  plugins: [],
}
