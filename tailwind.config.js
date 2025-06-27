/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          "carolina-blue": "#56A0D3", // kode hex Carolina Blue
          "glass-blue": "#1e3a8a",
          "glass-blue-light": "#60a5fa",
          "glass-blue-dark": "#1e40af",
          "glass-white": "rgba(255,255,255,0.15)",
        },
        boxShadow: {
          glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        },
        backdropBlur: {
          glass: '8px',
        },
      },
    },
    plugins: [],
  }
  