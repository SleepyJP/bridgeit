// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - MARQUEE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import { MarqueeConfig, AdBannerItem } from '@/types/marquee.types';

// Default ad items - BridgeIT self-promo only
// Add your projects via Admin Dashboard when ready
export const DEFAULT_AD_ITEMS: AdBannerItem[] = [
  {
    id: 'bridgeit-hero',
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
    id: 'bridgeit-chains',
    type: 'text',
    title: '100+ Chains Supported',
    subtitle: 'PulseChain • Base • Arbitrum • Ethereum & more',
    backgroundColor: 'rgba(255,0,255,0.15)',
    textColor: '#FFFFFF',
    accentColor: '#FF00FF',
    borderColor: 'rgba(255,0,255,0.4)',
    glowEffect: true,
    isActive: true,
    priority: 90,
  },
  {
    id: 'bridgeit-freedom',
    type: 'text',
    title: 'BridgeIT to FREEDOM',
    subtitle: 'No Thirdweb fees • Your keys, your crypto',
    backgroundColor: 'rgba(0,255,136,0.15)',
    textColor: '#FFFFFF',
    accentColor: '#00FF88',
    borderColor: 'rgba(0,255,136,0.4)',
    glowEffect: true,
    isActive: true,
    priority: 80,
  },
  {
    id: 'phud-farm',
    type: 'text',
    title: 'THE pHuD FARM',
    subtitle: 'Built by AQUEMINI',
    backgroundColor: 'rgba(0,255,255,0.15)',
    textColor: '#FFFFFF',
    accentColor: '#00FFFF',
    borderColor: 'rgba(0,255,255,0.4)',
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
