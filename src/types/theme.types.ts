// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - THEME TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  success: string;
  warning: string;
  error: string;
  gradient: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
  mono: string;
}

export interface ThemeBorderRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeImages {
  logo: string;
  favicon: string;
  backgroundImage: string;
  heroImage: string;
  customImages: string[];
}

export interface ThemeBrand {
  name: string;
  tagline: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  fonts: ThemeFonts;
  borderRadius: ThemeBorderRadius;
  images: ThemeImages;
  brand: ThemeBrand;
}
