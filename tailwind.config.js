/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs éco-responsables optimisées pour la lisibilité
        'eco-green': '#2E7D32',
        'eco-beige': '#FAFAFA', // Plus neutre et contrasté
        'eco-gray': '#1F2937', // Plus foncé pour une meilleure lisibilité (gray-800)
        'eco-orange': '#EA580C', // Plus foncé et contrasté
        'eco-blue': '#2563EB', // Plus foncé pour améliorer la lisibilité
        'eco-light-green': '#16A34A', // Plus foncé pour les textes
        'eco-dark-green': '#1B5E20',
        
        // Couleurs supplémentaires pour la lisibilité
        'readable': {
          'text': '#111827', // gray-900
          'text-light': '#374151', // gray-700
          'text-muted': '#4B5563', // gray-600
          'bg-light': '#F9FAFB', // gray-50
          'bg-white': '#FFFFFF',
          'border': '#D1D5DB', // gray-300
          'border-strong': '#9CA3AF', // gray-400
        },
        
        // États de contraste amélioré
        'contrast': {
          'high': '#000000',
          'medium': '#374151',
          'low': '#6B7280',
          'bg-high': '#FFFFFF',
          'bg-medium': '#F3F4F6',
          'bg-low': '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Nunito', 'sans-serif'],
      },
      fontSize: {
        // Tailles optimisées pour la lisibilité
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.5' }],
        '3xl': ['1.875rem', { lineHeight: '1.4' }],
        '4xl': ['2.25rem', { lineHeight: '1.3' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'pulse-soft': 'pulseSoft 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      boxShadow: {
        'readable': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'readable-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
} 