// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - MARQUEE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import { MarqueeConfig, AdBannerItem } from '@/types/marquee.types';

// Default ad items
export const DEFAULT_AD_ITEMS: AdBannerItem[] = [
  {
    id: 'welcome-1',
    type: 'rich',
    title: 'BridgeIT',
    subtitle: 'Bridge Any Chain. Anytime. Anywhere.',
    icon: '/assets/logo.svg',
    gradientColors: ['#00FF88', '#00FFFF'],
    textColor: '#000000',
    accentColor: '#00FF88',
    glowEffect: true,
    isActive: true,
    priority: 100,
  },
  {
    id: 'chains-1',
    type: 'text',
    title: '100+ Chains',
    subtitle: 'Ethereum, Base, Arbitrum, PulseChain & more',
    backgroundColor: 'rgba(255,0,255,0.2)',
    textColor: '#FFFFFF',
    accentColor: '#FF00FF',
    borderColor: 'rgba(255,0,255,0.5)',
    glowEffect: true,
    isActive: true,
    priority: 90,
  },
  {
    id: 'fees-1',
    type: 'text',
    title: 'Low Fees',
    subtitle: 'Only 0.5% bridge fee',
    backgroundColor: 'rgba(0,255,255,0.2)',
    textColor: '#FFFFFF',
    accentColor: '#00FFFF',
    borderColor: 'rgba(0,255,255,0.5)',
    glowEffect: true,
    isActive: true,
    priority: 80,
  },
  {
    id: 'secure-1',
    type: 'text',
    title: 'Battle-Tested',
    subtitle: '30+ bridge aggregators',
    backgroundColor: 'rgba(0,255,136,0.2)',
    textColor: '#FFFFFF',
    accentColor: '#00FF88',
    borderColor: 'rgba(0,255,136,0.5)',
    glowEffect: true,
    isActive: true,
    priority: 70,
  },
];

export const DEFAULT_MARQUEE_CONFIG: MarqueeConfig = {
  enabled: true,
  position: 'top',
  speed: 50,
  pauseOnHover: true,
  direction: 'left',
  gap: 40,
  height: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  borderBottom: '1px solid rgba(0,255,136,0.3)',
  items: DEFAULT_AD_ITEMS,
};
