# 🌉 BridgeIT

**Bridge Any Chain. Anytime. Anywhere.**

The ultimate multi-chain bridge aggregator powered by LI.FI. Bridge tokens across 100+ blockchains with the best rates, lowest fees, and maximum security.

## Features

- **100+ Chains** - Ethereum, Base, Arbitrum, PulseChain, Optimism, Polygon, and many more
- **30+ Bridge Aggregation** - LI.FI finds the optimal route every time
- **Admin Dashboard** - Full customization of theme, fees, and marquee banners
- **Wallet Gated Admin** - Only authorized wallets can access admin
- **Dynamic Messaging** - "BridgeIT to Sonic", "BridgeIT from Base", etc.
- **Ad Marquee Banner** - PulseX-style scrolling banner system

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Web3**: Wagmi v2 + RainbowKit
- **Bridge API**: LI.FI (FREE - no Thirdweb fees)
- **State**: Zustand
- **Animation**: Framer Motion

## Quick Start

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env.local

# Add your WalletConnect Project ID to .env.local

# Run dev server
npm run dev
```

## Admin Access

Only these wallets can access `/admin`:

- `0x2e5f89E225A02ceB083Ad27711A07B7C483E7716` (Primary)
- `0x49bBEFa1d94702C0e9a5EAdDEc7c3C5D3eb9086B`
- `0xa0d254a39Ea8645FFc79A9353c32f02504c5F3e7`
- `0x1c3e87796d0D242209C4Cf0354DAbBceb95F2317`

## Fee Structure

- **Bridge Fee**: 0.5%
- **Swap Fee**: 0.3%
- **Min Fee**: $0.50
- **Max Fee**: $500

All fees route to: `0x2e5f89E225A02ceB083Ad27711A07B7C483E7716`

## Deployment

```bash
# Build
npm run build

# Deploy to Vercel
vercel deploy --prod
```

## Built By

**AQUEMINI** for **THE pHuD FARM**

---

*BridgeIT to FREEDOM* 🚀
