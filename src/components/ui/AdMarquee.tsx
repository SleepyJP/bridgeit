// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - AD MARQUEE BANNER (STAINED GLASS THEME)
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { AdBannerItem } from '@/types/marquee.types';

interface AdMarqueeProps {
  position?: 'top' | 'bottom';
}

// Map colors to glass classes
const GLASS_CLASSES: Record<string, string> = {
  '#E53935': 'glass-ruby glow-ruby',
  '#FF8F00': 'glass-amber glow-amber',
  '#FFD54F': 'glass-gold glow-gold',
  '#00C853': 'glass-emerald glow-emerald',
  '#00BFA5': 'glass-teal glow-teal',
  '#00B0FF': 'glass-sapphire glow-sapphire',
  '#7C4DFF': 'glass-violet glow-violet',
  '#00FF88': 'glass-emerald glow-emerald',
  '#00FFFF': 'glass-teal glow-teal',
  '#FF00FF': 'glass-violet glow-violet',
};

export function AdMarquee({ position = 'top' }: AdMarqueeProps) {
  const { marqueeConfig } = useSettings();
  const [isPaused, setIsPaused] = useState(false);

  if (!marqueeConfig.enabled) return null;
  if (marqueeConfig.position !== position && marqueeConfig.position !== 'both') return null;

  // Filter active items by date
  const activeItems = marqueeConfig.items
    .filter(item => item.isActive)
    .filter(item => {
      const now = new Date();
      if (item.startDate && now < new Date(item.startDate)) return false;
      if (item.endDate && now > new Date(item.endDate)) return false;
      return true;
    })
    .sort((a, b) => b.priority - a.priority);

  if (activeItems.length === 0) return null;

  // Triple items for seamless loop
  const displayItems = [...activeItems, ...activeItems, ...activeItems];

  return (
    <div
      className="glass-panel relative overflow-hidden z-50"
      style={{
        height: marqueeConfig.height,
      }}
      onMouseEnter={() => marqueeConfig.pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Rainbow gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-rainbow"></div>

      <div
        className="flex items-center absolute whitespace-nowrap h-full animate-marquee"
        style={{
          gap: marqueeConfig.gap,
          animationDuration: `${displayItems.length * 4}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
          animationDirection: marqueeConfig.direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {displayItems.map((item, index) => (
          <AdCard key={`${item.id}-${index}`} item={item} />
        ))}
      </div>

      {/* Rainbow gradient bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-rainbow opacity-50"></div>
    </div>
  );
}

function AdCard({ item }: { item: AdBannerItem }) {
  // Get glass class based on accent color
  const glassClass = item.accentColor ? GLASS_CLASSES[item.accentColor] || 'glass-teal' : 'glass-teal';

  const content = (
    <div
      className={`
        flex items-center gap-3 px-5 py-2 rounded-lg transition-all duration-300
        hover:scale-105 cursor-pointer h-12 font-body
        ${item.gradientColors ? '' : glassClass}
      `}
      style={{
        background: item.gradientColors
          ? `linear-gradient(135deg, ${item.gradientColors[0]}, ${item.gradientColors[1]})`
          : undefined,
        color: item.textColor || '#FFFFFF',
      }}
    >
      {item.type === 'image' && item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.imageAlt || ''}
          className="h-8 w-auto object-contain"
        />
      )}

      {(item.type === 'text' || item.type === 'rich') && (
        <>
          {item.icon && (
            <img
              src={item.icon}
              alt=""
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20"
            />
          )}
          <div className="flex flex-col leading-tight">
            {item.title && (
              <span
                className="font-heading font-bold text-sm"
                style={{ color: item.accentColor || item.textColor }}
              >
                {item.title}
              </span>
            )}
            {item.subtitle && (
              <span className="text-xs opacity-80 font-body">{item.subtitle}</span>
            )}
          </div>
        </>
      )}
    </div>
  );

  return item.linkUrl ? (
    <a
      href={item.linkUrl}
      target={item.linkTarget || '_blank'}
      rel="noopener noreferrer"
      className="flex-shrink-0"
    >
      {content}
    </a>
  ) : (
    <div className="flex-shrink-0">{content}</div>
  );
}
