// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - THEME CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import { ThemeConfig } from '@/types/theme.types';

export const DEFAULT_THEME: ThemeConfig = {
  colors: {
    primary: "#00FF88",
    secondary: "#FF00FF",
    accent: "#00FFFF",
    background: "#0A0A0F",
    surface: "#1A1A2E",
    text: "#FFFFFF",
    textMuted: "#8888AA",
    success: "#00FF88",
    warning: "#FFD700",
    error: "#FF4444",
    gradient: "linear-gradient(135deg, #00FF88 0%, #00FFFF 50%, #FF00FF 100%)"
  },
  fonts: {
    heading: "'Orbitron', 'Space Grotesk', sans-serif",
    body: "'Exo 2', 'Inter', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace"
  },
  borderRadius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px"
  },
  images: {
    logo: "/assets/logo.svg",
    favicon: "/assets/favicon.ico",
    backgroundImage: "",
    heroImage: "",
    customImages: []
  },
  brand: {
    name: "BridgeIT",
    tagline: "Bridge Any Chain. Anytime. Anywhere."
  }
};

// CSS Variables generator
export const generateCSSVariables = (theme: ThemeConfig): string => {
  return `
    :root {
      --color-primary: ${theme.colors.primary};
      --color-secondary: ${theme.colors.secondary};
      --color-accent: ${theme.colors.accent};
      --color-background: ${theme.colors.background};
      --color-surface: ${theme.colors.surface};
      --color-text: ${theme.colors.text};
      --color-text-muted: ${theme.colors.textMuted};
      --color-success: ${theme.colors.success};
      --color-warning: ${theme.colors.warning};
      --color-error: ${theme.colors.error};
      --gradient: ${theme.colors.gradient};
      --font-heading: ${theme.fonts.heading};
      --font-body: ${theme.fonts.body};
      --font-mono: ${theme.fonts.mono};
      --radius-sm: ${theme.borderRadius.sm};
      --radius-md: ${theme.borderRadius.md};
      --radius-lg: ${theme.borderRadius.lg};
      --radius-xl: ${theme.borderRadius.xl};
    }
  `;
};
