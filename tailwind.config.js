/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta tomada del material impreso del centro.
        navy: {
          DEFAULT: '#17283F',
          950: '#0C1624',
          900: '#101D2F',
          800: '#17283F',
          700: '#24395A',
          600: '#3A5173',
        },
        sage: {
          DEFAULT: '#83B99A',
          50: '#F0F6F2',
          100: '#DDEBE3',
          200: '#C0DCCB',
          300: '#A2CCB3',
          400: '#83B99A',
          600: '#4A8565',
          700: '#37684E',
        },
        salmon: {
          DEFAULT: '#E99573',
          50: '#FDF4EF',
          100: '#FAE4DA',
          200: '#F4C8B5',
          400: '#E99573',
          600: '#BF603B',
          700: '#994626',
        },
        cream: '#F8F7F3',
        mist: '#E8E7E3',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'Cambria', 'serif'],
        sans: [
          '"Manrope Variable"',
          'Manrope',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(23,40,63,.04), 0 12px 32px -12px rgba(23,40,63,.14)',
        lift: '0 2px 4px rgba(23,40,63,.05), 0 28px 56px -20px rgba(23,40,63,.26)',
      },
      keyframes: {
        'page-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        curtain: {
          from: { transform: 'scaleY(1)' },
          to: { transform: 'scaleY(0)' },
        },
        'drift-a': {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(-3%, 5%, 0)' },
        },
        'drift-b': {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(4%, -4%, 0)' },
        },
        'cue': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      animation: {
        'page-in': 'page-in .6s cubic-bezier(.22,1,.36,1) backwards',
        curtain: 'curtain .7s cubic-bezier(.76,0,.24,1) forwards',
        'drift-a': 'drift-a 16s ease-in-out infinite',
        'drift-b': 'drift-b 20s ease-in-out infinite',
        cue: 'cue 2.4s cubic-bezier(.76,0,.24,1) infinite',
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(.22,1,.36,1)',
      },
    },
  },
  plugins: [],
};
