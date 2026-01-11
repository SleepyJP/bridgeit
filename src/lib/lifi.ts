// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - LI.FI BRIDGE INTEGRATION (FREE - NO THIRDWEB FEES)
// ═══════════════════════════════════════════════════════════════════════════════

import axios from 'axios';
import { Quote, Route, Token, BridgeStatus, BridgeRequest } from '@/types/bridge.types';
import { getIntegratorFee, getPlatformFeeWallet } from '@/config/fees.config';

const LIFI_API = 'https://li.quest/v1';

// Integrator ID - register at li.fi for your own
const INTEGRATOR = 'bridgeit';

// Get supported chains
export async function getChains() {
  const response = await axios.get(`${LIFI_API}/chains`);
  return response.data.chains;
}

// Get tokens for a chain
export async function getTokens(chainId: number) {
  const response = await axios.get(`${LIFI_API}/tokens`, {
    params: { chains: chainId }
  });
  return response.data.tokens[chainId] || [];
}

// Get all connections (routes) between chains
export async function getConnections(params: {
  fromChain?: number;
  toChain?: number;
  fromToken?: string;
  toToken?: string;
}) {
  const response = await axios.get(`${LIFI_API}/connections`, { params });
  return response.data.connections;
}

// Get available routes for a transfer
export async function getRoutes(request: BridgeRequest): Promise<Route[]> {
  const feeWallet = getPlatformFeeWallet();
  const feeBps = getIntegratorFee();

  const response = await axios.post(`${LIFI_API}/advanced/routes`, {
    fromChainId: request.fromChainId,
    toChainId: request.toChainId,
    fromTokenAddress: request.fromToken,
    toTokenAddress: request.toToken,
    fromAmount: request.fromAmount,
    fromAddress: request.fromAddress,
    toAddress: request.toAddress,
    options: {
      slippage: request.slippage || 0.03, // 3% default
      integrator: INTEGRATOR,
      fee: feeBps / 10000, // Convert bps to decimal
      referrer: feeWallet,
      order: 'RECOMMENDED',
      allowSwitchChain: true,
      bridges: {
        allow: [], // Empty = allow all
      },
      exchanges: {
        allow: [], // Empty = allow all
      }
    }
  });

  return response.data.routes;
}

// Get quote for a specific route
export async function getQuote(request: BridgeRequest): Promise<Quote> {
  const feeWallet = getPlatformFeeWallet();
  const feeBps = getIntegratorFee();

  const response = await axios.get(`${LIFI_API}/quote`, {
    params: {
      fromChain: request.fromChainId,
      toChain: request.toChainId,
      fromToken: request.fromToken,
      toToken: request.toToken,
      fromAmount: request.fromAmount,
      fromAddress: request.fromAddress,
      toAddress: request.toAddress,
      slippage: request.slippage || 0.03,
      integrator: INTEGRATOR,
      fee: feeBps / 10000,
      referrer: feeWallet,
    }
  });

  return response.data;
}

// Get step transaction (for multi-step routes)
export async function getStepTransaction(step: any) {
  const response = await axios.post(`${LIFI_API}/advanced/stepTransaction`, { step });
  return response.data;
}

// Check transaction status
export async function getStatus(params: {
  txHash: string;
  bridge?: string;
  fromChain?: number;
  toChain?: number;
}): Promise<BridgeStatus> {
  const response = await axios.get(`${LIFI_API}/status`, { params });
  return {
    transactionHash: params.txHash,
    status: response.data.status,
    substatus: response.data.substatus,
    substatusMessage: response.data.substatusMessage,
    sendingChain: response.data.sending,
    receivingChain: response.data.receiving,
  };
}

// Get token price
export async function getTokenPrice(chainId: number, tokenAddress: string): Promise<number> {
  const response = await axios.get(`${LIFI_API}/token`, {
    params: { chain: chainId, token: tokenAddress }
  });
  return parseFloat(response.data.priceUSD || '0');
}

// Get gas price for chain
export async function getGasPrice(chainId: number) {
  const response = await axios.get(`${LIFI_API}/gas`, {
    params: { chainId }
  });
  return response.data;
}

// Check if token needs approval
export async function checkAllowance(params: {
  chainId: number;
  tokenAddress: string;
  ownerAddress: string;
  spenderAddress: string;
}): Promise<bigint> {
  // Native tokens don't need approval
  if (params.tokenAddress === '0x0000000000000000000000000000000000000000') {
    return BigInt(2) ** BigInt(256) - BigInt(1); // Max uint256
  }

  const response = await axios.get(`${LIFI_API}/token/allowance`, {
    params: {
      chain: params.chainId,
      token: params.tokenAddress,
      owner: params.ownerAddress,
      spender: params.spenderAddress,
    }
  });

  return BigInt(response.data.allowance || '0');
}

// Get approval transaction data
export async function getApprovalTx(params: {
  chainId: number;
  tokenAddress: string;
  spenderAddress: string;
  amount: string;
}) {
  const response = await axios.get(`${LIFI_API}/token/approve`, {
    params: {
      chain: params.chainId,
      token: params.tokenAddress,
      spender: params.spenderAddress,
      amount: params.amount,
    }
  });

  return response.data;
}

// Native token address constant
export const NATIVE_TOKEN = '0x0000000000000000000000000000000000000000';

// Common token addresses
export const COMMON_TOKENS: Record<number, Record<string, string>> = {
  1: { // Ethereum
    NATIVE: NATIVE_TOKEN,
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    DAI: '0x6B175474E89094C44Da98b954EesdfcdFD72257',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  369: { // PulseChain
    NATIVE: NATIVE_TOKEN,
    WPLS: '0xA1077a294dDE1B09bB078844df40758a5D0f9a27',
    DAI: '0xefD766cCb38EaF1dfd701853BFCe31359239F305',
    PLSX: '0x95B303987A60C71504D99Aa1b13B4DA07b0790ab',
  },
  8453: { // Base
    NATIVE: NATIVE_TOKEN,
    USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    WETH: '0x4200000000000000000000000000000000000006',
  },
  42161: { // Arbitrum
    NATIVE: NATIVE_TOKEN,
    USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    WETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  },
  10: { // Optimism
    NATIVE: NATIVE_TOKEN,
    USDC: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
    USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    WETH: '0x4200000000000000000000000000000000000006',
  },
  137: { // Polygon
    NATIVE: NATIVE_TOKEN,
    USDC: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    WETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  },
};
