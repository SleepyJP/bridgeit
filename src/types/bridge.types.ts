// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - BRIDGE TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface Token {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  logoURI?: string;
  priceUSD?: string;
}

export interface Route {
  id: string;
  fromChainId: number;
  toChainId: number;
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  toAmountMin: string;
  gasCostUSD?: string;
  steps: RouteStep[];
  tags?: string[];
}

export interface RouteStep {
  id: string;
  type: 'swap' | 'bridge' | 'cross';
  tool: string;
  toolDetails?: {
    key: string;
    name: string;
    logoURI?: string;
  };
  action: {
    fromChainId: number;
    fromAmount: string;
    fromToken: Token;
    toChainId: number;
    toToken: Token;
    slippage: number;
  };
  estimate: {
    fromAmount: string;
    toAmount: string;
    toAmountMin: string;
    approvalAddress: string;
    executionDuration: number;
    feeCosts?: FeeCost[];
    gasCosts?: GasCost[];
  };
}

export interface FeeCost {
  name: string;
  percentage: string;
  token: Token;
  amount: string;
  amountUSD: string;
}

export interface GasCost {
  type: string;
  price: string;
  estimate: string;
  limit: string;
  amount: string;
  amountUSD: string;
  token: Token;
}

export interface Quote {
  id: string;
  type: 'lifi';
  tool: string;
  action: {
    fromChainId: number;
    fromAmount: string;
    fromToken: Token;
    toChainId: number;
    toToken: Token;
    slippage: number;
  };
  estimate: {
    fromAmount: string;
    toAmount: string;
    toAmountMin: string;
    approvalAddress: string;
    executionDuration: number;
    feeCosts?: FeeCost[];
    gasCosts?: GasCost[];
  };
  transactionRequest?: {
    to: string;
    data: string;
    value: string;
    gasLimit: string;
    gasPrice?: string;
    chainId: number;
  };
}

export interface BridgeStatus {
  transactionHash: string;
  status: 'pending' | 'done' | 'failed' | 'not_found';
  substatus?: string;
  substatusMessage?: string;
  sendingChain?: {
    chainId: number;
    txHash: string;
    amount: string;
    token: Token;
  };
  receivingChain?: {
    chainId: number;
    txHash?: string;
    amount?: string;
    token?: Token;
  };
}

export interface BridgeRequest {
  fromChainId: number;
  toChainId: number;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  fromAddress: string;
  toAddress: string;
  slippage?: number;
}
