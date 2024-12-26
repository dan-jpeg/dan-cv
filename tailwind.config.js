/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0A00AB'
      },
      animation: {
        'scroll': 'scroll 30s linear infinite',
      },
      fontFamily: {
        newsreader: ['Newsreader', 'serif'],
        'alte-haas': ['Alte Haas Grotesk', 'sans-serif'],
        'neue-haas-display': ['"neue-haas-grotesk-display"', 'sans-serif'],
        'neue-haas-text': ['"neue-haas-grotesk-text"', 'sans-serif'],
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - 1rem))' }, // Added offset to ensure no gap
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const fonts = {
        '.font-ultra-thin-italic': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 100,
          fontStyle: 'italic',
        },
        '.font-thin': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 200,
        },
        '.font-thin-italic': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 200,
          fontStyle: 'italic',
        },
        '.font-extra-light': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 300,
        },
        '.font-extra-light-italic': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 300,
          fontStyle: 'italic',
        },
        '.font-light': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 400,
        },
        '.font-light-italic': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 400,
          fontStyle: 'italic',
        },
        '.font-roman': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 500,
        },
        '.font-italic': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 500,
          fontStyle: 'italic',
        },
        '.font-medium': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 600,
        },
        '.font-medium-italic': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 600,
          fontStyle: 'italic',
        },
        '.font-bold': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 700,
        },
        '.font-bold-italic': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 700,
          fontStyle: 'italic',
        },
        '.font-black': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 900,
        },
        '.font-black-italic': {
          fontFamily: '"neue-haas-grotesk-display", sans-serif',
          fontWeight: 900,
          fontStyle: 'italic',
        },
        '.font-text-roman': {
          fontFamily: '"neue-haas-grotesk-text", sans-serif',
          fontWeight: 400,
        },
        '.font-text-italic': {
          fontFamily: '"neue-haas-grotesk-text", sans-serif',
          fontWeight: 400,
          fontStyle: 'italic',
        },
        '.font-text-medium': {
          fontFamily: '"neue-haas-grotesk-text", sans-serif',
          fontWeight: 500,
        },
        '.font-text-medium-italic': {
          fontFamily: '"neue-haas-grotesk-text", sans-serif',
          fontWeight: 500,
          fontStyle: 'italic',
        },
        '.font-text-bold': {
          fontFamily: '"neue-haas-grotesk-text", sans-serif',
          fontWeight: 700,
        },
        '.font-text-bold-italic': {
          fontFamily: '"neue-haas-grotesk-text", sans-serif',
          fontWeight: 700,
          fontStyle: 'italic',
        },
      };
      addUtilities(fonts);
    },
  ],
};