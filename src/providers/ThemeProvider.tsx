// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - THEME PROVIDER
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { ReactNode, useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { generateCSSVariables } from '@/config/theme.config';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useSettings();

  useEffect(() => {
    // Inject CSS variables
    const style = document.createElement('style');
    style.id = 'bridgeit-theme';
    style.textContent = generateCSSVariables(theme);

    const existing = document.getElementById('bridgeit-theme');
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, [theme]);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.fonts.body,
        backgroundImage: theme.images.backgroundImage
          ? `url(${theme.images.backgroundImage})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {children}
    </div>
  );
}
