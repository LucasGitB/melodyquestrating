/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        customColor: 'linear-gradient(to bottom right, violet, orange)',
        customColorInverse: 'linear-gradient(to bottom right, orange, violet)',
      },
    },
  },
}

