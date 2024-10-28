/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#2E282A',
        'primary-text': '#D9CAB3',
        'accent-red': '#EF3E36',
        'accent-teal': '#0FB8BD',
        'accent-pink': '#D295BF',
      },
    },
  },
  plugins: [],
}
