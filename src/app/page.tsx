// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - HOME PAGE
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SwapWidget } from '@/components/bridge/SwapWidget';
import { useSettings } from '@/hooks/useSettings';
import { Github, Twitter, MessageCircle, Shield, Zap, Globe } from 'lucide-react';

export default function HomePage() {
  const { theme } = useSettings();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          {theme.images.logo && (
            <img src={theme.images.logo} alt={theme.brand.name} className="h-10 w-auto" />
          )}
          <div>
            <h1 className="text-xl font-bold gradient-text">{theme.brand.name}</h1>
            <p className="text-xs text-[var(--color-text-muted)]">{theme.brand.tagline}</p>
          </div>
        </div>

        <ConnectButton
          chainStatus="icon"
          accountStatus="address"
          showBalance={false}
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Bridge Any Chain</span>
          </h2>
          <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
            The fastest, cheapest, and most secure way to move assets across 100+ blockchains.
            Powered by LI.FI aggregation.
          </p>
        </div>

        {/* Swap Widget */}
        <SwapWidget />

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
          <div className="p-6 bg-[var(--color-surface)] rounded-2xl border border-white/10 text-center card-hover">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center">
              <Globe className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">100+ Chains</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Bridge across Ethereum, Base, Arbitrum, PulseChain, and many more.
            </p>
          </div>

          <div className="p-6 bg-[var(--color-surface)] rounded-2xl border border-white/10 text-center card-hover">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[var(--color-secondary)]/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-[var(--color-secondary)]" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">Best Rates</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Aggregates 30+ bridges to find you the optimal route every time.
            </p>
          </div>

          <div className="p-6 bg-[var(--color-surface)] rounded-2xl border border-white/10 text-center card-hover">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[var(--color-accent)]/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">Battle-Tested</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Built on proven infrastructure with billions in volume processed.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} {theme.brand.name}. Built by THE pHuD FARM.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/SleepyJP/bridgeit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Github className="w-5 h-5 text-[var(--color-text-muted)]" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Twitter className="w-5 h-5 text-[var(--color-text-muted)]" />
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-[var(--color-text-muted)]" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
