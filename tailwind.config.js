/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        condensed: ['Oswald', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          navy: '#0f172a',
          navyLight: '#1e293b',
          navyLighter: '#334155',
          navyDark: '#0b1120',
          blue: '#0ea5e9',
          blueDark: '#0284c7',
          blueLight: '#38bdf8',
          gold: '#f59e0b',
          orange: '#ea580c',
          grey: '#94a3b8',
          greyDark: '#64748b',
          greyLight: '#cbd5e1',
          light: '#f8fafc',
          white: '#ffffff',
        }
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'spin-slower': 'spin 30s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 6s linear infinite',
        'tech-glow': 'tech-glow 3s infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { top: '0%', opacity: '0' },
          '10%': { opacity: '0.5' },
          '90%': { opacity: '0.5' },
          '100%': { top: '100%', opacity: '0' },
        },
        'tech-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(14, 165, 233, 0.1)', 
            borderColor: 'rgba(255, 255, 255, 0.05)' 
          },
          '50%': { 
            boxShadow: '0 0 15px rgba(14, 165, 233, 0.3)', 
            borderColor: 'rgba(14, 165, 233, 0.4)' 
          },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'tech-grid': `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid-50': '50px 50px',
        'grid-40': '40px 40px',
      },
    },
  },
  plugins: [],
}
