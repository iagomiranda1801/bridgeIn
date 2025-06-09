/**
 * Theme configuration file for BridgeIn application
 * Contains centralized definitions for colors, spacing, typography and other UI constants
 */

export const theme = {
  /**
   * Color palette
   */
  colors: {
    // Primary colors
    primary: {
      main: '#3366FF',
      light: '#5C85FF',
      dark: '#2952CC',
      contrastText: '#FFFFFF',
    },
    // Secondary colors
    secondary: {
      main: '#00C853',
      light: '#33D475',
      dark: '#00A042',
      contrastText: '#FFFFFF',
    },
    // Neutral colors
    neutral: {
      white: '#FFFFFF',
      black: '#000000',
      gray50: '#F9FAFB',
      gray100: '#F3F4F6',
      gray200: '#E5E7EB',
      gray300: '#D1D5DB',
      gray400: '#9CA3AF',
      gray500: '#6B7280',
      gray600: '#4B5563',
      gray700: '#374151',
      gray800: '#1F2937',
      gray900: '#111827',
    },
    // Feedback colors
    feedback: {
      success: '#10B981',
      warning: '#FBBF24',
      error: '#EF4444',
      info: '#3B82F6',
    },
    // Background colors
    background: {
      default: '#FFFFFF',
      paper: '#F9FAFB',
      dark: '#111827',
    },
    // Text colors
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      disabled: '#9CA3AF',
      hint: '#6B7280',
      white: '#FFFFFF',
    },
    // Border colors
    border: {
      light: '#E5E7EB',
      main: '#D1D5DB',
      dark: '#9CA3AF',
    },
  },

  /**
   * Spacing system (in pixels)
   * Can be used for padding, margin, and general layout spacing
   */
  spacing: {
    none: '0',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  /**
   * Typography system
   * Font sizes in pixels, weights, and line heights
   */
  typography: {
    fontFamily: {
      primary: "'Inter', sans-serif",
      secondary: "'Roboto', sans-serif",
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
      xxxl: '30px',
      display1: '36px',
      display2: '48px',
      display3: '60px',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  /**
   * Border radius values
   */
  borderRadius: {
    none: '0',
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '24px',
    full: '9999px',
  },

  /**
   * Shadow definitions
   */
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },

  /**
   * Z-index values
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },

  /**
   * Transition definitions
   */
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
  },
};

/**
 * Helper functions to use the theme values
 */
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let value: any = theme.colors;
  
  for (const key of keys) {
    if (value[key] === undefined) {
      console.warn(`Theme color "${path}" not found`);
      return '';
    }
    value = value[key];
  }
  
  return value;
};

export const getSpacing = (size: keyof typeof theme.spacing): string => {
  return theme.spacing[size] || theme.spacing.md;
};

export const getFontSize = (size: keyof typeof theme.typography.fontSize): string => {
  return theme.typography.fontSize[size] || theme.typography.fontSize.md;
};

export const getBorderRadius = (size: keyof typeof theme.borderRadius): string => {
  return theme.borderRadius[size] || theme.borderRadius.md;
};

export default theme;
