/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#080818',
        card: '#1a1a2e',
        accent: '#c084fc',
        amber: { cat: '#f59e0b' },
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        twinkle: 'twinkle var(--twinkle-dur, 3s) ease-in-out infinite',
        blink: 'blink 4s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        sway: 'sway 3s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        cursor: 'cursor 1s step-end infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
        blink: {
          '0%, 88%, 100%': { transform: 'scaleY(1)' },
          '92%': { transform: 'scaleY(0.05)' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px #f59e0b) drop-shadow(0 0 8px #f59e0b80)' },
          '50%': { filter: 'drop-shadow(0 0 10px #f59e0b) drop-shadow(0 0 20px #f59e0b) drop-shadow(0 0 30px #f59e0b60)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-10deg)', transformOrigin: '145px 200px' },
          '50%': { transform: 'rotate(10deg)', transformOrigin: '145px 200px' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        cursor: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
