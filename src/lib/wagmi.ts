// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - WAGMI CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import { http, createConfig } from 'wagmi';
import {
  mainnet,
  base,
  arbitrum,
  optimism,
  polygon,
  bsc,
  avalanche,
  fantom,
  gnosis,
  zkSync,
  linea,
  scroll,
  mantle,
  blast,
  mode,
  zora,
  polygonZkEvm,
  celo,
  moonbeam,
  moonriver,
  cronos,
  aurora,
  fuse,
  boba,
  metis,
  arbitrumNova,
  canto,
  kava,
  harmonyOne,
  telos,
  evmos,
  rootstock,
  coreDao,
  opBNB,
  manta,
  taiko,
  fraxtal,
  worldchain,
} from 'wagmi/chains';
import { defineChain } from 'viem';

// Custom chain: PulseChain
export const pulsechain = defineChain({
  id: 369,
  name: 'PulseChain',
  nativeCurrency: { name: 'Pulse', symbol: 'PLS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.pulsechain.com'] },
  },
  blockExplorers: {
    default: { name: 'PulseScan', url: 'https://scan.pulsechain.com' },
  },
});

// Custom chain: X Layer
export const xLayer = defineChain({
  id: 196,
  name: 'X Layer',
  nativeCurrency: { name: 'OKB', symbol: 'OKB', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.xlayer.tech'] },
  },
  blockExplorers: {
    default: { name: 'OKLink', url: 'https://www.oklink.com/x-layer' },
  },
});

// All supported chains
export const supportedChains = [
  mainnet,
  pulsechain,
  base,
  arbitrum,
  optimism,
  polygon,
  bsc,
  avalanche,
  fantom,
  gnosis,
  zkSync,
  linea,
  scroll,
  mantle,
  blast,
  mode,
  zora,
  xLayer,
  polygonZkEvm,
  celo,
  moonbeam,
  moonriver,
  cronos,
  aurora,
  fuse,
  boba,
  metis,
  arbitrumNova,
  canto,
  kava,
  harmonyOne,
  telos,
  evmos,
  rootstock,
  coreDao,
  opBNB,
  manta,
  taiko,
  fraxtal,
  worldchain,
] as const;

// Wagmi config
export const wagmiConfig = createConfig({
  chains: supportedChains,
  transports: {
    [mainnet.id]: http(),
    [pulsechain.id]: http('https://rpc.pulsechain.com'),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [avalanche.id]: http(),
    [fantom.id]: http(),
    [gnosis.id]: http(),
    [zkSync.id]: http(),
    [linea.id]: http(),
    [scroll.id]: http(),
    [mantle.id]: http(),
    [blast.id]: http(),
    [mode.id]: http(),
    [zora.id]: http(),
    [xLayer.id]: http('https://rpc.xlayer.tech'),
    [polygonZkEvm.id]: http(),
    [celo.id]: http(),
    [moonbeam.id]: http(),
    [moonriver.id]: http(),
    [cronos.id]: http(),
    [aurora.id]: http(),
    [fuse.id]: http(),
    [boba.id]: http(),
    [metis.id]: http(),
    [arbitrumNova.id]: http(),
    [canto.id]: http(),
    [kava.id]: http(),
    [harmonyOne.id]: http(),
    [telos.id]: http(),
    [evmos.id]: http(),
    [rootstock.id]: http(),
    [coreDao.id]: http(),
    [opBNB.id]: http(),
    [manta.id]: http(),
    [taiko.id]: http(),
    [fraxtal.id]: http(),
    [worldchain.id]: http(),
  },
});

// Get chain by ID
export function getChainById(chainId: number) {
  return supportedChains.find(chain => chain.id === chainId);
}

// Chain logo URLs
export const chainLogos: Record<number, string> = {
  1: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg',
  369: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/pulse.svg',
  8453: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/base.svg',
  42161: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/arbitrum.svg',
  10: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/optimism.svg',
  137: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/polygon.svg',
  56: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/bsc.svg',
  43114: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/avalanche.svg',
  250: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/fantom.svg',
  100: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/gnosis.svg',
};
