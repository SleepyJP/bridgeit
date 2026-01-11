// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - MARQUEE TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface AdBannerItem {
  id: string;
  type: 'image' | 'text' | 'rich';
  imageUrl?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  gradientColors?: [string, string];
  borderColor?: string;
  glowEffect?: boolean;
  linkUrl?: string;
  linkTarget?: '_blank' | '_self';
  isActive: boolean;
  priority: number;
  startDate?: string;
  endDate?: string;
}

export interface MarqueeConfig {
  enabled: boolean;
  position: 'top' | 'bottom' | 'both';
  speed: number;
  pauseOnHover: boolean;
  direction: 'left' | 'right';
  gap: number;
  height: number;
  backgroundColor: string;
  borderTop?: string;
  borderBottom?: string;
  items: AdBannerItem[];
}
