module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#f36805", // Just Eat button color
                brand: "#ff8000", // Just Eat background orange
            },
            fontFamily: {
                jetsans: ["JetSansDigital", "sans-serif"],
            },
        },
    },
    plugins: [],
}
