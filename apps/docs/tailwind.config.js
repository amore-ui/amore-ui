/** @type {import('tailwindcss').Config} */
import componentsConfig from '../../packages/components/tailwind.config.ts';

export default {
  content: [
    './.vitepress/**/*.{js,ts,vue,md}', // Scans VitePress specific files
    './**/*.md', // Scans all markdown files in the docs
    '../../packages/components/src/**/*.{vue,js,ts,jsx,tsx}', // Added path to component sources
  ],
  // Use the theme, darkMode setting, and plugins from the components package's Tailwind config
  theme: componentsConfig.theme,
  darkMode: componentsConfig.darkMode || 'class', // Default to 'class' if not in componentsConfig
  plugins: componentsConfig.plugins || [],
};
