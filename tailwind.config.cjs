/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Poppins",
        work: "Mukta",
      },
      fontSize: {
        "1sm": "14px",
        sm: "15px",
        md: "16px",
        lg: "20px",
        xl: "28px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
