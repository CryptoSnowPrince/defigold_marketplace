/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        teko: 'Teko',
        sfui: 'SF UI Display',
      },
      colors: {
        'base-text': `var(--base-text)`,
        primary: `var(--primary)`,
        gold: `var(--gold)`,
        'dark-box': `var(--dark-box)`,
        'light-text': `var(--light-text)`,
        'dark-text': `var(--dark-text)`,
        'hint-text': `var(--hint-text)`,
      }
    },
  },
  plugins: [],
}
