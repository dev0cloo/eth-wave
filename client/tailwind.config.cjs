/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundSize: {
      200: "200%",
    },
    extend: {
      blur: {
        la: "128px",
      },
      backgroundImage: {
        btngrad:
          "linear-gradient(to right,#2b5876 0%,#9089FC 51%,#2b5876 100%)",
      },
    },
  },
  plugins: [],
};
