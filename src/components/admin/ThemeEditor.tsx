// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - THEME EDITOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Palette, Type, Image, RotateCcw, Save } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { Button } from '@/components/ui/Button';
import { ThemeConfig } from '@/types/theme.types';

export function ThemeEditor() {
  const { theme, setColors, setFonts, setImages, setBrand, resetTheme } = useSettings();
  const [activeColorKey, setActiveColorKey] = useState<keyof ThemeConfig['colors'] | null>(null);
  const [saved, setSaved] = useState(false);

  const colorOptions: { key: keyof ThemeConfig['colors']; label: string }[] = [
    { key: 'primary', label: 'Primary' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'accent', label: 'Accent' },
    { key: 'background', label: 'Background' },
    { key: 'surface', label: 'Surface' },
    { key: 'text', label: 'Text' },
    { key: 'textMuted', label: 'Muted Text' },
    { key: 'success', label: 'Success' },
    { key: 'warning', label: 'Warning' },
    { key: 'error', label: 'Error' },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Brand Section */}
      <section className="bg-[var(--color-surface)] rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Type className="w-5 h-5 text-[var(--color-primary)]" />
          <h3 className="text-lg font-bold text-[var(--color-text)]">Brand</h3>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-2">
              Brand Name
            </label>
            <input
              type="text"
              value={theme.brand.name}
              onChange={(e) => setBrand({ name: e.target.value })}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]/50"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={theme.brand.tagline}
              onChange={(e) => setBrand({ tagline: e.target.value })}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]/50"
            />
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="bg-[var(--color-surface)] rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-5 h-5 text-[var(--color-primary)]" />
          <h3 className="text-lg font-bold text-[var(--color-text)]">Colors</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          {colorOptions.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveColorKey(activeColorKey === key ? null : key)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                activeColorKey === key
                  ? 'bg-white/10 ring-2 ring-[var(--color-primary)]'
                  : 'hover:bg-white/5'
              }`}
            >
              <div
                className="w-10 h-10 rounded-lg border-2 border-white/20"
                style={{ backgroundColor: theme.colors[key] }}
              />
              <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
            </button>
          ))}
        </div>

        {activeColorKey && (
          <div className="flex flex-col items-center gap-4 p-4 bg-black/20 rounded-xl">
            <HexColorPicker
              color={theme.colors[activeColorKey]}
              onChange={(color) => setColors({ [activeColorKey]: color })}
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={theme.colors[activeColorKey]}
                onChange={(e) => setColors({ [activeColorKey]: e.target.value })}
                className="px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-[var(--color-text)] font-mono text-sm w-28 focus:outline-none"
              />
            </div>
          </div>
        )}
      </section>

      {/* Images Section */}
      <section className="bg-[var(--color-surface)] rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Image className="w-5 h-5 text-[var(--color-primary)]" />
          <h3 className="text-lg font-bold text-[var(--color-text)]">Images</h3>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-2">
              Logo URL
            </label>
            <input
              type="text"
              value={theme.images.logo}
              onChange={(e) => setImages({ logo: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]/50"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-2">
              Background Image URL
            </label>
            <input
              type="text"
              value={theme.images.backgroundImage}
              onChange={(e) => setImages({ backgroundImage: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]/50"
            />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={resetTheme} className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </Button>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
