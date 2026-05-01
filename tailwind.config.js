/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding your Deccan AI primary colors for easier use
        dark: "#0a0c10",
        accent: "#2563eb",
      },
    },
  },
  plugins: [],
}