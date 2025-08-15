import React, { createContext, useContext, useState, useEffect } from 'react';

// Definição dos temas
export const themes = {
  olive: {
    name: 'Olive & Sage',
    primary: '#6B7C32',
    secondary: '#9CAF88',
    accent: '#D4AF37',
    cream: '#F5F5DC',
    warmGray: '#8B7355',
    ivory: '#FFFFF0',
    gradient: 'from-cream-50 via-cream-100 to-olive-50',
    primaryGradient: 'from-olive-500 to-sage-600',
    textPrimary: 'text-olive-800',
    textSecondary: 'text-olive-600',
    bgPrimary: 'bg-olive-700',
    bgSecondary: 'bg-olive-100',
    borderPrimary: 'border-olive-200',
    hoverPrimary: 'hover:bg-olive-600',
    icon: '🌿'
  },
  burgundy: {
    name: 'Burgundy & Cream',
    primary: '#8B2635',
    secondary: '#F5F5DC',
    accent: '#D4AF37',
    cream: '#F5F5DC',
    warmGray: '#8B7355',
    ivory: '#FFFFF0',
    gradient: 'from-cream-50 via-cream-100 to-burgundy-50',
    primaryGradient: 'from-burgundy-500 to-cream-600',
    textPrimary: 'text-burgundy-800',
    textSecondary: 'text-burgundy-600',
    bgPrimary: 'bg-burgundy-700',
    bgSecondary: 'bg-burgundy-100',
    borderPrimary: 'border-burgundy-200',
    hoverPrimary: 'hover:bg-burgundy-600',
    icon: '🍷'
  },
  navy: {
    name: 'Navy & Blush',
    primary: '#1B365D',
    secondary: '#F4C2C2',
    accent: '#B76E79',
    cream: '#F4C2C2',
    warmGray: '#36454F',
    ivory: '#F0EAD6',
    gradient: 'from-blush-50 via-cream-100 to-navy-50',
    primaryGradient: 'from-navy-500 to-blush-600',
    textPrimary: 'text-navy-800',
    textSecondary: 'text-navy-600',
    bgPrimary: 'bg-navy-700',
    bgSecondary: 'bg-navy-100',
    borderPrimary: 'border-navy-200',
    hoverPrimary: 'hover:bg-navy-600',
    icon: '🌊'
  },
  emerald: {
    name: 'Emerald & Champagne',
    primary: '#046307',
    secondary: '#F7E7CE',
    accent: '#D4AF37',
    cream: '#F7E7CE',
    warmGray: '#483C32',
    ivory: '#FDF5E6',
    gradient: 'from-champagne-50 via-cream-100 to-emerald-50',
    primaryGradient: 'from-emerald-500 to-champagne-600',
    textPrimary: 'text-emerald-800',
    textSecondary: 'text-emerald-600',
    bgPrimary: 'bg-emerald-700',
    bgSecondary: 'bg-emerald-100',
    borderPrimary: 'border-emerald-200',
    hoverPrimary: 'hover:bg-emerald-600',
    icon: '💎'
  },
  terraCotta: {
    name: 'Terra Cotta & Sage',
    primary: '#E2725B',
    secondary: '#9CAF88',
    accent: '#D2B48C',
    cream: '#FDF5E6',
    warmGray: '#8B7355',
    ivory: '#FDF5E6',
    gradient: 'from-cream-50 via-cream-100 to-terraCotta-50',
    primaryGradient: 'from-terraCotta-500 to-sage-600',
    textPrimary: 'text-terraCotta-800',
    textSecondary: 'text-terraCotta-600',
    bgPrimary: 'bg-terraCotta-700',
    bgSecondary: 'bg-terraCotta-100',
    borderPrimary: 'border-terraCotta-200',
    hoverPrimary: 'hover:bg-terraCotta-600',
    icon: '🏺'
  }
};

type ThemeKey = keyof typeof themes;

interface ThemeContextType {
  currentTheme: ThemeKey;
  theme: typeof themes.olive;
  setTheme: (theme: ThemeKey) => void;
  isThemeMenuOpen: boolean;
  toggleThemeMenu: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('olive');
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  // Carregar tema salvo no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('wedding-theme') as ThemeKey;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Salvar tema no localStorage
  useEffect(() => {
    localStorage.setItem('wedding-theme', currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: ThemeKey) => {
    setCurrentTheme(theme);
    setIsThemeMenuOpen(false);
  };

  const toggleThemeMenu = () => {
    setIsThemeMenuOpen(!isThemeMenuOpen);
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    setTheme,
    isThemeMenuOpen,
    toggleThemeMenu
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
