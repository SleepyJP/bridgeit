// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - STAINED GLASS THEME CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import { ThemeConfig } from '@/types/theme.types';

// Stained Glass Color Palette - Based on rainbow mosaic pattern
export const STAINED_GLASS_COLORS = {
  ruby: "#E53935",        // Deep red
  amber: "#FF8F00",       // Warm orange
  gold: "#FFD54F",        // Golden yellow
  emerald: "#00C853",     // Vibrant green
  teal: "#00BFA5",        // Rich teal
  sapphire: "#00B0FF",    // Sky blue
  violet: "#7C4DFF",      // Purple accent
  leadLine: "#1A1A1A",    // Dark lead lines between glass
} as const;

export const DEFAULT_THEME: ThemeConfig = {
  colors: {
    // Stained Glass Primary Colors
    primary: "#00BFA5",      // Teal - main accent
    secondary: "#FF8F00",    // Amber - warm contrast
    accent: "#00B0FF",       // Sapphire blue

    // Background - Dark to let glass colors pop
    background: "#0D0D12",   // Deep dark with slight blue
    surface: "#1A1A24",      // Dark surface with warmth

    // Text
    text: "#FFFFFF",
    textMuted: "#B0B0C0",

    // Status colors from stained glass
    success: "#00C853",      // Emerald green
    warning: "#FFD54F",      // Gold
    error: "#E53935",        // Ruby red

    // Multi-color rainbow gradient like the stained glass
    gradient: "linear-gradient(135deg, #E53935 0%, #FF8F00 20%, #FFD54F 40%, #00C853 60%, #00BFA5 80%, #00B0FF 100%)"
  },
  fonts: {
    heading: "'Cinzel', 'Playfair Display', serif",  // Elegant, classic fonts
    body: "'Lato', 'Open Sans', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace"
  },
  borderRadius: {
    sm: "4px",    // Sharper edges for glass-like feel
    md: "8px",
    lg: "12px",
    xl: "16px"
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

// CSS Variables generator with stained glass extensions
export const generateCSSVariables = (theme: ThemeConfig): string => {
  return `
    :root {
      /* Core Colors */
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

      /* Stained Glass Palette */
      --glass-ruby: #E53935;
      --glass-amber: #FF8F00;
      --glass-gold: #FFD54F;
      --glass-emerald: #00C853;
      --glass-teal: #00BFA5;
      --glass-sapphire: #00B0FF;
      --glass-violet: #7C4DFF;
      --glass-lead: #1A1A1A;

      /* Fonts */
      --font-heading: ${theme.fonts.heading};
      --font-body: ${theme.fonts.body};
      --font-mono: ${theme.fonts.mono};

      /* Border Radius */
      --radius-sm: ${theme.borderRadius.sm};
      --radius-md: ${theme.borderRadius.md};
      --radius-lg: ${theme.borderRadius.lg};
      --radius-xl: ${theme.borderRadius.xl};
    }
  `;
};
