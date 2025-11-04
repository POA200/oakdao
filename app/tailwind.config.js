// app/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Where Tailwind looks for classes (crucial for purging unused CSS)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Ensure all your component and page files are covered
  ],
  
  // 2. Standard settings for Shadcn UI dark mode support
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Your custom colors and keyframes go here
    },
  },
  
  // 3. Register the required plugins
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"), // <-- This is what enables the 'prose' class!
  ],
};