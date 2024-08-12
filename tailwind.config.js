/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // השתמש ב'class' כדי להשתמש במצב כהה מבוסס כיתות
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // נתיבים לקבצים המכילים את הכיתות
    './public/index.html', // קובץ ה-HTML הראשי
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
