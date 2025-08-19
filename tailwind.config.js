/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4E4456',
          'accent-primary': '#A2D0C8',
          'accent-secondary': '#81D8D0',
          background: '#F7F7F9',
          card: '#FFFFFF',
          'text-primary': '#4E4456',
          'text-muted': '#9E9AA7',
          border: '#E0E0E0',
          gain: '#65D6AD',
          loss: '#FF8B8B',
          destructive: '#E53E3E'
        },
        dark: {
          primary: '#4E4456',
          'accent-primary': '#A2D0C8',
          'accent-secondary': '#81D8D0',
          background: '#1A181F',
          card: '#2C2834',
          'text-primary': '#FFFFFF',
          'text-muted': '#9E9AA7',
          border: 'rgba(255, 255, 255, 0.1)'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 30px rgba(0, 0, 0, 0.08)'
      }
    },
  },
  plugins: [],
}

