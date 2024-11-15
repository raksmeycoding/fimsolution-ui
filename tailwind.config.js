/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily: {
            satoshi: ["Satoshi", "sans-serif"],
        },
        extend: {},
    },
    plugins: [],
}