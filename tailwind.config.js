/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "sos-green": "#6cee2b",
        "sos-ink": "#0a0a0a",
      },
      borderWidth: {
        3: "3px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
}

