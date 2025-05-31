/**
 * @file Theme configuration for the component library
 * Contains theme variables for light and dark modes
 */
import { boxShadow, colors } from './tokens';

// Theme type definitions
export interface ActionStateColors {
  default: string;
  hover: string;
  active: string;
}

export interface ActionColors {
  primary: ActionStateColors;
  secondary: ActionStateColors;
  success: ActionStateColors;
  warning: ActionStateColors;
  danger: ActionStateColors;
  neutral: ActionStateColors;
}

export interface BackgroundColors {
  primary: string;
  secondary: string;
  tertiary: string;
  hover?: string;
}

export interface TextColors {
  primary: string;
  secondary: string;
  tertiary: string;
  inverted: string;
}

export interface BorderColors {
  primary: string;
  secondary: string;
  focus: string;
}

export interface ElevationLevels {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}

export interface Theme {
  background: BackgroundColors;
  text: TextColors;
  border: BorderColors;
  action: ActionColors;
  elevation: ElevationLevels;
}

export const lightTheme: Theme = {
  background: {
    primary: colors.neutral[50],
    secondary: colors.neutral[100],
    tertiary: colors.neutral[200],
  },
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[700],
    tertiary: colors.neutral[500],
    inverted: colors.neutral[50],
  },
  border: {
    primary: colors.neutral[300],
    secondary: colors.neutral[200],
    focus: colors.primary[500],
  },
  action: {
    primary: {
      default: colors.primary[600],
      hover: colors.primary[700],
      active: colors.primary[800],
    },
    secondary: {
      default: colors.secondary[600],
      hover: colors.secondary[700],
      active: colors.secondary[800],
    },
    success: {
      default: colors.success[600],
      hover: colors.success[700],
      active: colors.success[800],
    },
    warning: {
      default: colors.warning[500],
      hover: colors.warning[600],
      active: colors.warning[700],
    },
    danger: {
      default: colors.danger[600],
      hover: colors.danger[700],
      active: colors.danger[800],
    },
    neutral: {
      default: colors.neutral[600],
      hover: colors.neutral[700],
      active: colors.neutral[800],
    },
  },
  elevation: {
    0: 'none',
    1: boxShadow.sm,
    2: boxShadow.md,
    3: boxShadow.lg,
    4: boxShadow.xl,
    5: boxShadow['2xl'],
  },
};

export const darkTheme: Theme = {
  background: {
    primary: colors.neutral[900],
    secondary: colors.neutral[800],
    tertiary: colors.neutral[700],
    hover: colors.neutral[850],
  },
  text: {
    primary: colors.neutral[50],
    secondary: colors.neutral[300],
    tertiary: colors.neutral[400],
    inverted: colors.neutral[900],
  },
  border: {
    primary: colors.neutral[600],
    secondary: colors.neutral[700],
    focus: colors.primary[400],
  },
  action: {
    primary: {
      default: colors.primary[500],
      hover: colors.primary[400],
      active: colors.primary[300],
    },
    secondary: {
      default: colors.secondary[500],
      hover: colors.secondary[400],
      active: colors.secondary[300],
    },
    success: {
      default: colors.success[500],
      hover: colors.success[400],
      active: colors.success[300],
    },
    warning: {
      default: colors.warning[500],
      hover: colors.warning[400],
      active: colors.warning[300],
    },
    danger: {
      default: colors.danger[500],
      hover: colors.danger[400],
      active: colors.danger[300],
    },
    neutral: {
      default: colors.neutral[400],
      hover: colors.neutral[300],
      active: colors.neutral[200],
    },
  },
  elevation: {
    0: 'none',
    1: boxShadow.sm,
    2: boxShadow.md,
    3: boxShadow.lg,
    4: boxShadow.xl,
    5: boxShadow['2xl'],
  },
};

// Helper function to set theme
export function setTheme(theme: 'light' | 'dark' = 'light'): void {
  const root = document.documentElement;
  const themeValues = theme === 'dark' ? darkTheme : lightTheme;

  // Apply theme values as CSS variables
  Object.entries(themeValues).forEach(([category, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--${category}-${key}-${subKey}`, subValue);
        });
      } else {
        root.style.setProperty(`--${category}-${key}`, value);
      }
    });
  });

  // Set theme attribute on document
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

// Initialize theme based on user preference
export function initTheme(): void {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDark ? 'dark' : 'light');
  }
}
