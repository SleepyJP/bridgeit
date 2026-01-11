// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - FEE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import { FEE_WALLETS, DEFAULT_FEE_CONFIG } from './admin.config';

export interface FeeConfig {
  bridgeFeePercent: number;
  swapFeePercent: number;
  minFeeUSD: number;
  maxFeeUSD: number;
}

// Calculate platform fee
export const calculatePlatformFee = (
  amountUSD: number,
  feeConfig: FeeConfig = DEFAULT_FEE_CONFIG,
  isSwap: boolean = false
): number => {
  const feePercent = isSwap ? feeConfig.swapFeePercent : feeConfig.bridgeFeePercent;
  const calculatedFee = (amountUSD * feePercent) / 100;

  // Apply min/max bounds
  if (calculatedFee < feeConfig.minFeeUSD) return feeConfig.minFeeUSD;
  if (calculatedFee > feeConfig.maxFeeUSD) return feeConfig.maxFeeUSD;

  return calculatedFee;
};

// Calculate fee in token amount
export const calculateTokenFee = (
  tokenAmount: bigint,
  feeConfig: FeeConfig = DEFAULT_FEE_CONFIG,
  isSwap: boolean = false
): bigint => {
  const feePercent = isSwap ? feeConfig.swapFeePercent : feeConfig.bridgeFeePercent;
  const feeBps = BigInt(Math.round(feePercent * 100)); // Convert to basis points
  return (tokenAmount * feeBps) / 10000n;
};

// Get integrator fee for LI.FI (in basis points)
export const getIntegratorFee = (feeConfig: FeeConfig = DEFAULT_FEE_CONFIG): number => {
  // LI.FI accepts fee in basis points (1 bp = 0.01%)
  // Our 0.5% = 50 basis points
  return Math.round(feeConfig.bridgeFeePercent * 100);
};

// Fee wallet getter
export const getPlatformFeeWallet = (): string => {
  return FEE_WALLETS.EVM;
};

export { FEE_WALLETS, DEFAULT_FEE_CONFIG };
