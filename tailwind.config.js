/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50:  '#fff5f5',
          100: '#ffe3e3',
          200: '#ffd0d0',
          300: '#ffb3b3',
          400: '#f87171',
          500: '#b91c1c', // Deep Red (WCAG compliant)
          600: '#991b1b', // Rich Warm Red
          700: '#7f1d1d', // Dark Red
          800: '#5c1212',
          900: '#450a0a',
          950: '#2d0606',
        },
        amber: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#eab308', // Rich Warm Yellow
          600: '#d97706', // Golden Yellow
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        cream: '#fdfbf7',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
      },
      /* Custom keyframes */
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        borderPulse: {
          '0%, 100%': { borderColor: 'rgba(185,28,28,0.3)' },
          '50%':       { borderColor: 'rgba(185,28,28,0.8)' },
        },
        gradientShift: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        shimmer:        'shimmer 2.5s linear infinite',
        floatUp:        'floatUp 3s ease-in-out infinite',
        fadeInUp:       'fadeInUp 0.5s ease-out forwards',
        scaleIn:        'scaleIn 0.3s ease-out forwards',
        borderPulse:    'borderPulse 2s ease-in-out infinite',
        gradientShift:  'gradientShift 4s ease infinite',
      },
      /* Extended box shadows */
      boxShadow: {
        'orange-sm':  '0 2px 8px rgba(185,28,28,0.2)',
        'orange-md':  '0 8px 25px rgba(185,28,28,0.3)',
        'orange-lg':  '0 16px 50px rgba(185,28,28,0.4)',
        'glow-sm':    '0 0 15px rgba(234,179,8,0.3)',
        'glow-md':    '0 0 30px rgba(234,179,8,0.4)',
      },
      /* Extended transition durations */
      transitionDuration: {
        '350': '350ms',
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}
