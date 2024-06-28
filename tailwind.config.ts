/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'bg-image': "url('/images/Mobilebg.webp')",
        'bg-image-lg': "url('/images/laptopbg.webp')"
      })
    }
  },
  plugins: []
}

