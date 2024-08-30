/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(63.88% 129.61% at 25.55% 31.91%, #20135C 0%, #140739 92.82%)',
        'btn-cus': 'linear-gradient(88.43deg, #2F3453 11.5%, #242845 76.7%)',
        'btn-cus-sign': 'linear-gradient(271.88deg, #3887FE 4.26%, #3BA0FF 51.37%, #5FB2FF 99.01%)',
        'aside-bg': 'linear-gradient(0.32deg, rgba(28, 35, 64, 0) -5.79%, #1C0F54 114.59%);',
        'bg1': '/images/bg-1.jpg',
        'bg2': '/images/bg-2.jpg'
      }
    },
  },
  plugins: [],
}

