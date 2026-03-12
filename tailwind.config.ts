import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FEFDFB',
          100: '#FAF7F2',
          200: '#F3EDE4',
          300: '#EBE3D7',
          400: '#DDD2C1',
          500: '#C8BAA5',
        },
        warm: {
          600: '#9B8E7E',
          700: '#6B5E4F',
          800: '#4A3F33',
          900: '#2C2418',
          950: '#1A150D',
        },
        accent: {
          DEFAULT: '#C4723A',
          light: '#D98B55',
          dark: '#A85E2D',
          muted: 'rgba(196, 114, 58, 0.12)',
        },
        'skill-accent': '#FF6B35',
        border: 'rgba(44, 36, 24, 0.08)',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(44, 36, 24, 0.04), 0 8px 24px rgba(44, 36, 24, 0.06)',
        'card-hover': '0 4px 12px rgba(44, 36, 24, 0.08), 0 16px 40px rgba(44, 36, 24, 0.1)',
        'glow': '0 0 32px rgba(196, 114, 58, 0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config;
