/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta principal: Verde oliva, Off-white e Cinza
        olive: {
          50: '#f8f9f6',    // off-white com toque de oliva
          100: '#f0f2eb',   // off-white mais evidente
          200: '#e1e6d6',   // verde oliva muito suave
          300: '#c9d2b8',   // verde oliva claro
          400: '#a8b693',   // verde oliva médio
          500: '#8a9b73',   // verde oliva principal
          600: '#6d7d5a',   // verde oliva escuro
          700: '#556248',   // verde oliva mais escuro
          800: '#424d37',   // verde oliva profundo
          900: '#2f3527'    // verde oliva muito escuro
        },
        sage: {
          50: '#f6f7f5',    // off-white com toque sage
          100: '#ebeee8',   // sage muito claro
          200: '#d4dace',   // sage claro
          300: '#b8c5ab',   // sage médio claro
          400: '#9aab88',   // sage médio
          500: '#7d916a',   // sage principal
          600: '#647454',   // sage escuro
          700: '#4f5a42',   // sage mais escuro
          800: '#3d4432',   // sage profundo
          900: '#2a2f23'    // sage muito escuro
        },
        cream: {
          50: '#fdfcfa',    // creme mais claro
          100: '#faf8f4',   // creme claro
          200: '#f5f2ec',   // creme suave
          300: '#ede8df',   // creme médio
          400: '#e0d9cc',   // creme escuro
          500: '#d1c7b6',   // creme principal
          600: '#b8a994',   // creme acinzentado
          700: '#968674',   // creme escuro
          800: '#6b635a',   // marrom suave
          900: '#4a4440'    // marrom escuro
        },
        stone: {
          50: '#fafaf9',    // cinza quase branco
          100: '#f5f5f4',   // cinza muito claro
          200: '#e7e5e4',   // cinza claro
          300: '#d6d3d1',   // cinza suave
          400: '#a8a29e',   // cinza médio
          500: '#78716c',   // cinza principal
          600: '#57534e',   // cinza escuro
          700: '#44403c',   // cinza mais escuro
          800: '#292524',   // cinza profundo
          900: '#1c1917'    // cinza muito escuro
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Times New Roman"', 'serif'],
        sans: ['"Source Sans Pro"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
        elegant: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        classic: ['"Crimson Text"', '"Times New Roman"', 'serif'],
        formal: ['"Libre Baskerville"', '"Georgia"', 'serif'],
        forum: ['"Forum"', 'cursive']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'sway': 'sway 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'pulse-love': 'pulseLove 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.5s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' }
        },
        heartbeat: {
          '0%, 50%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '75%': { transform: 'scale(1.05)' }
        },
        pulseLove: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.2)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}