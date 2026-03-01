/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    // Penting: Nonaktifkan preflight agar tidak bentrok dengan Vuetify
    preflight: false,
  },
  plugins: [],
}