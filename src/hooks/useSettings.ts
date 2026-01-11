// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - SETTINGS HOOK (ZUSTAND STORE)
// ═══════════════════════════════════════════════════════════════════════════════

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeConfig } from '@/types/theme.types';
import { MarqueeConfig } from '@/types/marquee.types';
import { DEFAULT_THEME } from '@/config/theme.config';
import { DEFAULT_MARQUEE_CONFIG } from '@/config/marquee.config';
import { DEFAULT_FEE_CONFIG } from '@/config/admin.config';

interface FeeConfig {
  bridgeFeePercent: number;
  swapFeePercent: number;
  minFeeUSD: number;
  maxFeeUSD: number;
}

interface SettingsState {
  theme: ThemeConfig;
  marqueeConfig: MarqueeConfig;
  feeConfig: FeeConfig;

  // Theme actions
  setTheme: (theme: Partial<ThemeConfig>) => void;
  setColors: (colors: Partial<ThemeConfig['colors']>) => void;
  setFonts: (fonts: Partial<ThemeConfig['fonts']>) => void;
  setImages: (images: Partial<ThemeConfig['images']>) => void;
  setBrand: (brand: Partial<ThemeConfig['brand']>) => void;
  resetTheme: () => void;

  // Marquee actions
  setMarqueeConfig: (config: Partial<MarqueeConfig>) => void;
  addMarqueeItem: (item: MarqueeConfig['items'][0]) => void;
  updateMarqueeItem: (id: string, updates: Partial<MarqueeConfig['items'][0]>) => void;
  removeMarqueeItem: (id: string) => void;
  reorderMarqueeItems: (items: MarqueeConfig['items']) => void;
  resetMarquee: () => void;

  // Fee actions
  setFeeConfig: (config: Partial<FeeConfig>) => void;
  resetFees: () => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: DEFAULT_THEME,
      marqueeConfig: DEFAULT_MARQUEE_CONFIG,
      feeConfig: DEFAULT_FEE_CONFIG,

      // Theme actions
      setTheme: (theme) => set((state) => ({
        theme: { ...state.theme, ...theme }
      })),

      setColors: (colors) => set((state) => ({
        theme: { ...state.theme, colors: { ...state.theme.colors, ...colors } }
      })),

      setFonts: (fonts) => set((state) => ({
        theme: { ...state.theme, fonts: { ...state.theme.fonts, ...fonts } }
      })),

      setImages: (images) => set((state) => ({
        theme: { ...state.theme, images: { ...state.theme.images, ...images } }
      })),

      setBrand: (brand) => set((state) => ({
        theme: { ...state.theme, brand: { ...state.theme.brand, ...brand } }
      })),

      resetTheme: () => set({ theme: DEFAULT_THEME }),

      // Marquee actions
      setMarqueeConfig: (config) => set((state) => ({
        marqueeConfig: { ...state.marqueeConfig, ...config }
      })),

      addMarqueeItem: (item) => set((state) => ({
        marqueeConfig: {
          ...state.marqueeConfig,
          items: [...state.marqueeConfig.items, item]
        }
      })),

      updateMarqueeItem: (id, updates) => set((state) => ({
        marqueeConfig: {
          ...state.marqueeConfig,
          items: state.marqueeConfig.items.map(item =>
            item.id === id ? { ...item, ...updates } : item
          )
        }
      })),

      removeMarqueeItem: (id) => set((state) => ({
        marqueeConfig: {
          ...state.marqueeConfig,
          items: state.marqueeConfig.items.filter(item => item.id !== id)
        }
      })),

      reorderMarqueeItems: (items) => set((state) => ({
        marqueeConfig: { ...state.marqueeConfig, items }
      })),

      resetMarquee: () => set({ marqueeConfig: DEFAULT_MARQUEE_CONFIG }),

      // Fee actions
      setFeeConfig: (config) => set((state) => ({
        feeConfig: { ...state.feeConfig, ...config }
      })),

      resetFees: () => set({ feeConfig: DEFAULT_FEE_CONFIG }),
    }),
    {
      name: 'bridgeit-settings',
    }
  )
);
