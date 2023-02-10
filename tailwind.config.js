/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    darkTheme: "business",
    themes: ["corporate", "business"],
  },
  plugins: [require("daisyui")],
}
