// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verde: {
          50: '#f4f6f5',    // verde bem claro (off white com toque de verde)
          100: '#e6ecea',   // off white puxando para verde
          200: '#cfdad5',   // verde bem suave
          300: '#b7c7be',   // verde claro
          400: '#a0b5a8',   // verde médio claro
          500: '#889c93',   // verde principal
          600: '#6d7d76',   // verde escuro
          700: '#56645f',   // verde mais escuro
          800: '#3f4b47',   // verde quase cinza
          900: '#28322f'    // verde bem escuro
        },
        offwhite: {
          DEFAULT: '#f8f9f7', // off white principal
          light: '#fcfcfa',   // mais claro
          dark: '#eceeea'     // mais escuro
        },
        gray: {
          50:  '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Open Sans"', 'sans-serif']
      }
    },
  },
  plugins: [],
}