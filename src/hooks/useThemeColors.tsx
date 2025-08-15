import { useTheme } from '../contexts/ThemeContext';

export const useThemeColors = () => {
  const { theme } = useTheme();

  const getThemeClasses = () => {
    const themeMap = {
      olive: {
        primary: 'olive',
        secondary: 'sage',
        accent: 'amber',
        cream: 'cream',
        text: 'olive',
        bg: 'olive',
        border: 'olive'
      },
      burgundy: {
        primary: 'burgundy',
        secondary: 'cream',
        accent: 'amber',
        cream: 'cream',
        text: 'burgundy',
        bg: 'burgundy',
        border: 'burgundy'
      },
      navy: {
        primary: 'navy',
        secondary: 'blush',
        accent: 'rose',
        cream: 'blush',
        text: 'navy',
        bg: 'navy',
        border: 'navy'
      },
      emerald: {
        primary: 'emerald',
        secondary: 'champagne',
        accent: 'amber',
        cream: 'champagne',
        text: 'emerald',
        bg: 'emerald',
        border: 'emerald'
      },
      terraCotta: {
        primary: 'terraCotta',
        secondary: 'sage',
        accent: 'amber',
        cream: 'cream',
        text: 'terraCotta',
        bg: 'terraCotta',
        border: 'terraCotta'
      }
    };

    const themeKey = theme.name.toLowerCase().split(' ')[0] as keyof typeof themeMap;
    return themeMap[themeKey] || themeMap.olive;
  };

  const classes = getThemeClasses();

  return {
    // Classes de texto
    textPrimary: `text-${classes.text}-800`,
    textSecondary: `text-${classes.text}-600`,
    textAccent: `text-${classes.accent}-600`,
    
    // Classes de background
    bgPrimary: `bg-${classes.bg}-700`,
    bgSecondary: `bg-${classes.bg}-100`,
    bgAccent: `bg-${classes.accent}-100`,
    bgCream: `bg-${classes.cream}-50`,
    
    // Classes de borda
    borderPrimary: `border-${classes.border}-200`,
    borderSecondary: `border-${classes.border}-300`,
    
    // Classes de hover
    hoverPrimary: `hover:bg-${classes.bg}-600`,
    hoverSecondary: `hover:bg-${classes.bg}-200`,
    
    // Gradientes
    gradientPrimary: `bg-gradient-to-br from-${classes.primary}-500 to-${classes.secondary}-600`,
    gradientBackground: `bg-gradient-to-br from-${classes.cream}-50 via-${classes.cream}-100 to-${classes.primary}-50`,
    
    // Cores específicas do tema
    theme
  };
};
