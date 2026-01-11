// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - HOME PAGE (STAINED GLASS THEME)
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SwapWidget } from '@/components/bridge/SwapWidget';
import { useSettings } from '@/hooks/useSettings';
import { Github, Twitter, MessageCircle, Shield, Zap, Globe } from 'lucide-react';

export default function HomePage() {
  const { theme } = useSettings();

  return (
    <div className="min-h-screen flex flex-col mosaic-overlay">
      {/* Header with rainbow border */}
      <header className="glass-panel flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          {theme.images.logo && (
            <img
              src={theme.images.logo}
              alt={theme.brand.name}
              className="h-10 w-auto animate-float"
            />
          )}
          <div>
            <h1 className="text-xl font-heading font-bold gradient-text">{theme.brand.name}</h1>
            <p className="text-xs text-text-muted font-body">{theme.brand.tagline}</p>
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
        {/* Hero Section with stained glass effect */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-shadow-glass">
            <span className="gradient-text animate-rainbow-shimmer">Bridge Any Chain</span>
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto font-body">
            The fastest, cheapest, and most secure way to move assets across{' '}
            <span className="text-glass-amber font-semibold">100+ blockchains</span>.
            Powered by LI.FI aggregation.
          </p>

          {/* Decorative lead line */}
          <div className="lead-line max-w-md mx-auto mt-6"></div>
        </div>

        {/* Swap Widget */}
        <SwapWidget />

        {/* Features - Stained Glass Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
          {/* Teal Glass Panel */}
          <div className="card-glass glass-teal rounded-xl text-center light-ray">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-glass-teal/30 flex items-center justify-center glow-teal">
              <Globe className="w-6 h-6 text-glass-teal" />
            </div>
            <h3 className="text-lg font-heading font-bold text-text mb-2">100+ Chains</h3>
            <p className="text-sm text-text-muted font-body">
              Bridge across Ethereum, Base, Arbitrum, PulseChain, and many more.
            </p>
          </div>

          {/* Amber Glass Panel */}
          <div className="card-glass glass-amber rounded-xl text-center light-ray">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-glass-amber/30 flex items-center justify-center glow-amber">
              <Zap className="w-6 h-6 text-glass-amber" />
            </div>
            <h3 className="text-lg font-heading font-bold text-text mb-2">Best Rates</h3>
            <p className="text-sm text-text-muted font-body">
              Aggregates 30+ bridges to find you the optimal route every time.
            </p>
          </div>

          {/* Sapphire Glass Panel */}
          <div className="card-glass glass-sapphire rounded-xl text-center light-ray">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-glass-sapphire/30 flex items-center justify-center glow-sapphire">
              <Shield className="w-6 h-6 text-glass-sapphire" />
            </div>
            <h3 className="text-lg font-heading font-bold text-text mb-2">Battle-Tested</h3>
            <p className="text-sm text-text-muted font-body">
              Built on proven infrastructure with billions in volume processed.
            </p>
          </div>
        </div>

        {/* Rainbow glow accent */}
        <div className="mt-12 w-full max-w-4xl">
          <div className="h-1 bg-gradient-rainbow rounded-full glow-rainbow"></div>
        </div>
      </main>

      {/* Footer with glass effect */}
      <footer className="glass-panel px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-text-muted font-body">
            &copy; {new Date().getFullYear()}{' '}
            <span className="gradient-text font-semibold">{theme.brand.name}</span>.
            Built by <span className="text-glass-violet">THE pHuD FARM</span>.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/SleepyJP/bridgeit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass-teal rounded-lg transition-all hover:glow-teal"
            >
              <Github className="w-5 h-5 text-glass-teal" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass-sapphire rounded-lg transition-all hover:glow-sapphire"
            >
              <Twitter className="w-5 h-5 text-glass-sapphire" />
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass-violet rounded-lg transition-all hover:glow-violet"
            >
              <MessageCircle className="w-5 h-5 text-glass-violet" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
