/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        subtle: "0px 0.25px 1px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
