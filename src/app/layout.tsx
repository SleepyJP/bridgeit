// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - ROOT LAYOUT
// ═══════════════════════════════════════════════════════════════════════════════

import type { Metadata } from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import { Web3Provider } from '@/providers/Web3Provider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AdMarquee } from '@/components/ui/AdMarquee';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'BridgeIT - Bridge Any Chain. Anytime. Anywhere.',
  description: 'The ultimate multi-chain bridge aggregator. Bridge tokens across 100+ chains with the best rates.',
  icons: {
    icon: '/assets/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <Web3Provider>
          <ThemeProvider>
            {/* Top Ad Marquee Banner */}
            <AdMarquee position="top" />

            {/* Main Content */}
            <main className="min-h-screen">
              {children}
            </main>

            {/* Bottom Ad Marquee Banner */}
            <AdMarquee position="bottom" />
          </ThemeProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
