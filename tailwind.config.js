/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      flex: {
        "pokecard-21": "1 0 21%"
      }
    },
  },
  plugins: [],
}

