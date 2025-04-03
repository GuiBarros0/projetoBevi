/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('./src/Assets/login.jpg')",
      },
    },
  },
  plugins: [],
};
