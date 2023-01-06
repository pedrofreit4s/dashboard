/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        black: "#000000",
        white: "#fff",

        "simulation-bg": "#F0F0F0",
        "simulation-bg-contrast": "#E2E2E2",
        "simulation-title": "#000000",
        "simulation-text": "#999999",
        "simulation-label": "#403302",
        "simulation-input-border": "#D9D9D9",
        "simulation-input-color": "#908C8C",
        "simulation-input-placeholder": "#908C8C",
      },

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

        "simulation-sm": 12.5,
        "simulation-md": 15,
        "simulation-lg": 16,
        "simulation-xl": 26,
      },
      boxShadow: {
        "simulation-input": "0px 2px 6px rgba(0, 0, 0, 0.04)",
        "simulation-md": "0px 1px 14px rgba(0, 0, 0, 0.03)",
        "simulation-lg": "0px 2px 20px rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
