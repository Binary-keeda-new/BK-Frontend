export type Theme = 'dark' | 'light';

/* ===================== */
/* 📊 Stat Card */
/* ===================== */

export interface StatCardProps {
  label: string;
  value: string | number;

  // ✅ better than boolean
  delta?: number;
  deltaLabel?: string;
}

/* ===================== */
/* 🎯 Action Card */
/* ===================== */

export interface ActionCardProps {
  title: string;
  description: string;
  onPrimary: () => void;
  onSecondary: () => void;

  showDocIcon?: boolean;
  variant?: 'default' | 'bank' | 'code';

  // ✅ REQUIRED for Tailwind layout control
  className?: string;
}

/* ===================== */
/* 🧱 Layout */
/* ===================== */

export interface TopbarProps {
  onMobileMenuOpen: () => void;
}

/* ===================== */
/* 🎨 Theme */
/* ===================== */

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}