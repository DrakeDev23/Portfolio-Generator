/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./templates/**/*.html', './static/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#4169E1',
          dark: '#2F52C4',
          blue: '#1E6FD0',
          line: '#2F6FE4',
          soft: '#EFF8FF',
          ink: '#0F172A',
        },
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%,100%': { transform: 'scale(1)', opacity: '.25' },
          '50%': { transform: 'scale(1.08)', opacity: '.4' },
        },
        ringPulse: {
          '0%,100%': { boxShadow: '0 0 0 4px rgba(47,111,228,.2)' },
          '50%': { boxShadow: '0 0 0 10px rgba(47,111,228,.08)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        ringPulse: 'ringPulse 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
