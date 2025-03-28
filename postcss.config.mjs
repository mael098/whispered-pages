/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},  // Correct plugin for Tailwind CSS with PostCSS
    autoprefixer: {},            // Ensures vendor prefixes for CSS
  },
};

export default config;
