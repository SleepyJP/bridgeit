// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - AD MARQUEE BANNER (PULSEX STYLE)
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { AdBannerItem } from '@/types/marquee.types';

interface AdMarqueeProps {
  position?: 'top' | 'bottom';
}

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
      className="relative overflow-hidden z-50"
      style={{
        height: marqueeConfig.height,
        backgroundColor: marqueeConfig.backgroundColor,
        borderBottom: position === 'top' ? marqueeConfig.borderBottom : undefined,
        borderTop: position === 'bottom' ? marqueeConfig.borderTop : undefined,
      }}
      onMouseEnter={() => marqueeConfig.pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
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

      <style jsx global>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee-scroll linear infinite;
        }
      `}</style>
    </div>
  );
}

function AdCard({ item }: { item: AdBannerItem }) {
  const content = (
    <div
      className="flex items-center gap-3 px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer h-12"
      style={{
        background: item.gradientColors
          ? `linear-gradient(135deg, ${item.gradientColors[0]}, ${item.gradientColors[1]})`
          : item.backgroundColor || 'rgba(255,255,255,0.1)',
        color: item.textColor || '#FFFFFF',
        border: item.borderColor ? `1px solid ${item.borderColor}` : 'none',
        boxShadow: item.glowEffect
          ? `0 0 25px ${item.accentColor || '#00FF88'}50, 0 0 50px ${item.accentColor || '#00FF88'}25`
          : 'none',
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
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <div className="flex flex-col leading-tight">
            {item.title && (
              <span
                className="font-bold text-sm"
                style={{ color: item.accentColor || item.textColor }}
              >
                {item.title}
              </span>
            )}
            {item.subtitle && (
              <span className="text-xs opacity-80">{item.subtitle}</span>
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
