// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - CHAIN CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import { FEE_WALLETS } from './admin.config';

export interface ChainConfig {
  chainId: number;
  name: string;
  symbol: string;
  logoURI?: string;
  rpcUrls?: string[];
  blockExplorer?: string;
  isEnabled: boolean;
}

// EVM CHAINS - 100+ supported via LI.FI
export const EVM_CHAINS: ChainConfig[] = [
  { chainId: 1, name: "Ethereum", symbol: "ETH", isEnabled: true },
  { chainId: 369, name: "PulseChain", symbol: "PLS", rpcUrls: ["https://rpc.pulsechain.com"], isEnabled: true },
  { chainId: 8453, name: "Base", symbol: "ETH", isEnabled: true },
  { chainId: 42161, name: "Arbitrum One", symbol: "ETH", isEnabled: true },
  { chainId: 10, name: "Optimism", symbol: "ETH", isEnabled: true },
  { chainId: 137, name: "Polygon", symbol: "MATIC", isEnabled: true },
  { chainId: 56, name: "BSC", symbol: "BNB", isEnabled: true },
  { chainId: 43114, name: "Avalanche", symbol: "AVAX", isEnabled: true },
  { chainId: 250, name: "Fantom", symbol: "FTM", isEnabled: true },
  { chainId: 100, name: "Gnosis", symbol: "xDAI", isEnabled: true },
  { chainId: 324, name: "zkSync Era", symbol: "ETH", isEnabled: true },
  { chainId: 59144, name: "Linea", symbol: "ETH", isEnabled: true },
  { chainId: 534352, name: "Scroll", symbol: "ETH", isEnabled: true },
  { chainId: 5000, name: "Mantle", symbol: "MNT", isEnabled: true },
  { chainId: 81457, name: "Blast", symbol: "ETH", isEnabled: true },
  { chainId: 34443, name: "Mode", symbol: "ETH", isEnabled: true },
  { chainId: 7777777, name: "Zora", symbol: "ETH", isEnabled: true },
  { chainId: 196, name: "X Layer", symbol: "OKB", rpcUrls: ["https://rpc.xlayer.tech"], isEnabled: true },
  { chainId: 1101, name: "Polygon zkEVM", symbol: "ETH", isEnabled: true },
  { chainId: 42220, name: "Celo", symbol: "CELO", isEnabled: true },
  { chainId: 1284, name: "Moonbeam", symbol: "GLMR", isEnabled: true },
  { chainId: 1285, name: "Moonriver", symbol: "MOVR", isEnabled: true },
  { chainId: 25, name: "Cronos", symbol: "CRO", isEnabled: true },
  { chainId: 1313161554, name: "Aurora", symbol: "ETH", isEnabled: true },
  { chainId: 122, name: "Fuse", symbol: "FUSE", isEnabled: true },
  { chainId: 288, name: "Boba", symbol: "ETH", isEnabled: true },
  { chainId: 1088, name: "Metis", symbol: "METIS", isEnabled: true },
  { chainId: 42170, name: "Arbitrum Nova", symbol: "ETH", isEnabled: true },
  { chainId: 7700, name: "Canto", symbol: "CANTO", isEnabled: true },
  { chainId: 2222, name: "Kava EVM", symbol: "KAVA", isEnabled: true },
  { chainId: 1666600000, name: "Harmony", symbol: "ONE", isEnabled: true },
  { chainId: 40, name: "Telos EVM", symbol: "TLOS", isEnabled: true },
  { chainId: 9001, name: "Evmos", symbol: "EVMOS", isEnabled: true },
  { chainId: 32659, name: "Fusion", symbol: "FSN", isEnabled: true },
  { chainId: 30, name: "Rootstock", symbol: "RBTC", isEnabled: true },
  { chainId: 1116, name: "Core DAO", symbol: "CORE", isEnabled: true },
  { chainId: 204, name: "opBNB", symbol: "BNB", isEnabled: true },
  { chainId: 169, name: "Manta Pacific", symbol: "ETH", isEnabled: true },
  { chainId: 167000, name: "Taiko", symbol: "ETH", isEnabled: true },
  { chainId: 252, name: "Fraxtal", symbol: "frxETH", isEnabled: true },
  { chainId: 480, name: "World Chain", symbol: "ETH", isEnabled: true },
];

// X Layer specific config
export const X_LAYER_CONFIG = {
  chainId: 196,
  name: "X Layer Mainnet",
  nativeCurrency: { name: "OKB", symbol: "OKB", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.xlayer.tech"] } },
  blockExplorers: { default: { name: "OKLink", url: "https://www.oklink.com/x-layer" } },
};

// ICP Chain Fusion config
export const ICP_CONFIG = {
  chainId: "ICP",
  name: "Internet Computer",
  symbol: "ICP",
  chainKeyTokens: {
    ckETH: "ss2fx-dyaaa-aaaar-qacoq-cai",
    ckUSDC: "xevnm-gaaaa-aaaar-qafnq-cai",
    ckUSDT: "cngnf-vqaaa-aaaar-qag4q-cai"
  },
  ckethMinter: "sv3dd-oaaaa-aaaar-qacoa-cai",
  evmRpcCanister: "7hfb6-caaaa-aaaar-qadga-cai"
};

// Get fee wallet by chain type
export const getFeeWallet = (chainId: number | string): string => {
  if (chainId === "ICP") return FEE_WALLETS.ICP;
  return FEE_WALLETS.EVM;
};

// Get chain by ID
export const getChainById = (chainId: number): ChainConfig | undefined => {
  return EVM_CHAINS.find(c => c.chainId === chainId);
};

// Get enabled chains
export const getEnabledChains = (): ChainConfig[] => {
  return EVM_CHAINS.filter(c => c.isEnabled);
};
