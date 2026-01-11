// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - ADMIN CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

// ADMIN WALLETS - Only these can modify settings
export const ADMIN_WALLETS = [
  "0xa0d254a39Ea8645FFc79A9353c32f02504c5F3e7", // Primary Treasury
  "0x49bBEFa1d94702C0e9a5EAdDEc7c3C5D3eb9086B", // Backup Treasury
  "0x61D8adC8A10AE0E06B52fE78f0d0264eEdE74799", // Deployment Wallet
  "0x2e5f89E225A02ceB083Ad27711A07B7C483E7716", // Legacy Admin
] as const;

// Admin check function
export const isAdmin = (address: string): boolean => {
  return ADMIN_WALLETS.map(a => a.toLowerCase()).includes(address.toLowerCase());
};

// FEE WALLETS - Where all bridge fees go (HARDCODED FOR SECURITY)
export const FEE_WALLETS = {
  EVM: "0xa0d254a39Ea8645FFc79A9353c32f02504c5F3e7", // PRIMARY TREASURY - All EVM fees here
  SOLANA: "2VoPPkUxL3iwic7kUzrgnvnKFr1Z8Zop15UArVKtdA4L",
  BITCOIN: "bc1qf364x4j523duwhfajwm5kmd2pvtn0gxnt9tg29",
  SUI: "0x0773108e2bf7080977a87fcc26c37191386bedbed5b12d6b01a13dfe0d43856c",
  ICP: "iyupi-26e6a-z56ra-6a5tz-yyj6i-kvxe4-joccp-pgapo-vpcvb-zxtmq-oae",
  STELLAR: "cGAQWJ2PUNQ77NX3EWGYFK5CTEKYPZUC2ODTZSMXCIPDKFAYBV4MIR4GJ",
  XRP: "rMXpjFseuurgR5DRTQEuUeene7bExzBzab"
} as const;

// BACKUP EVM TREASURIES (Fallback order)
export const BACKUP_EVM_TREASURIES = [
  "0x49bBEFa1d94702C0e9a5EAdDEc7c3C5D3eb9086B", // Backup Treasury
  "0x61D8adC8A10AE0E06B52fE78f0d0264eEdE74799", // Deployment Wallet
  "0x2e5f89E225A02ceB083Ad27711A07B7C483E7716", // Legacy
] as const;

// FEE STRUCTURE (Admin-changeable)
export const DEFAULT_FEE_CONFIG = {
  bridgeFeePercent: 0.5,
  swapFeePercent: 0.3,
  minFeeUSD: 0.50,
  maxFeeUSD: 500.00,
};

export type AdminWallet = typeof ADMIN_WALLETS[number];
export type FeeWalletKey = keyof typeof FEE_WALLETS;
