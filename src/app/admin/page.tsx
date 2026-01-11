// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - ADMIN DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  Palette, DollarSign, Megaphone, Link2, Settings,
  LayoutDashboard, ArrowLeft
} from 'lucide-react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { ThemeEditor } from '@/components/admin/ThemeEditor';
import { FeeManager } from '@/components/admin/FeeManager';
import { MarqueeEditor } from '@/components/admin/MarqueeEditor';
import { useSettings } from '@/hooks/useSettings';
import { cn } from '@/lib/utils';

type Tab = 'theme' | 'fees' | 'marquee' | 'chains';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('theme');
  const { theme } = useSettings();

  const tabs: { id: Tab; label: string; icon: typeof Palette }[] = [
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'fees', label: 'Fees', icon: DollarSign },
    { id: 'marquee', label: 'Marquee', icon: Megaphone },
    { id: 'chains', label: 'Chains', icon: Link2 },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[var(--color-surface)]">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--color-text-muted)]" />
            </a>
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-[var(--color-primary)]" />
              <div>
                <h1 className="text-xl font-bold text-[var(--color-text)]">Admin Dashboard</h1>
                <p className="text-xs text-[var(--color-text-muted)]">{theme.brand.name} Configuration</p>
              </div>
            </div>
          </div>

          <ConnectButton
            chainStatus="icon"
            accountStatus="address"
            showBalance={false}
          />
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 min-h-[calc(100vh-73px)] border-r border-white/10 bg-[var(--color-surface)]/50 p-4">
            <nav className="space-y-2">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                    activeTab === id
                      ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/50'
                      : 'text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text)]'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-black/20 rounded-xl">
              <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Brand</span>
                  <span className="text-[var(--color-text)]">{theme.brand.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Theme</span>
                  <span className="text-[var(--color-primary)]">Custom</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-4xl">
              {/* Tab Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
                  {tabs.find(t => t.id === activeTab)?.label} Settings
                </h2>
                <p className="text-[var(--color-text-muted)]">
                  {activeTab === 'theme' && 'Customize colors, fonts, logos, and branding.'}
                  {activeTab === 'fees' && 'Configure bridge and swap fee rates.'}
                  {activeTab === 'marquee' && 'Manage scrolling ad banner items.'}
                  {activeTab === 'chains' && 'Enable or disable supported chains.'}
                </p>
              </div>

              {/* Tab Content */}
              {activeTab === 'theme' && <ThemeEditor />}
              {activeTab === 'fees' && <FeeManager />}
              {activeTab === 'marquee' && <MarqueeEditor />}
              {activeTab === 'chains' && (
                <div className="bg-[var(--color-surface)] rounded-2xl p-6 border border-white/10">
                  <p className="text-[var(--color-text-muted)]">
                    Chain management coming soon. Currently all 40+ chains are enabled by default.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
