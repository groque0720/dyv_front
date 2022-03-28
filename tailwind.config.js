module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-login': "url('/src/assets/auth/bg-login.jpg')",
      },
      fontFamily: {
        pacifico: 'Pacifico, cursive',
        segoe: 'Segoe UI, cursive'
      }
    },
  },
  plugins: [],
}