// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - BRIDGE HOOK
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useCallback } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import * as lifi from '@/lib/lifi';
import { Quote, Route, Token, BridgeStatus } from '@/types/bridge.types';

interface UseBridgeState {
  routes: Route[];
  selectedRoute: Route | null;
  quote: Quote | null;
  status: BridgeStatus | null;
  isLoadingRoutes: boolean;
  isLoadingQuote: boolean;
  isExecuting: boolean;
  error: string | null;
}

export function useBridge() {
  const { address, isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const [state, setState] = useState<UseBridgeState>({
    routes: [],
    selectedRoute: null,
    quote: null,
    status: null,
    isLoadingRoutes: false,
    isLoadingQuote: false,
    isExecuting: false,
    error: null,
  });

  // Fetch routes
  const fetchRoutes = useCallback(async (params: {
    fromChainId: number;
    toChainId: number;
    fromToken: string;
    toToken: string;
    fromAmount: string;
  }) => {
    if (!address) return;

    setState(prev => ({ ...prev, isLoadingRoutes: true, error: null }));

    try {
      const routes = await lifi.getRoutes({
        ...params,
        fromAddress: address,
        toAddress: address,
      });

      setState(prev => ({
        ...prev,
        routes,
        selectedRoute: routes[0] || null,
        isLoadingRoutes: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        routes: [],
        isLoadingRoutes: false,
        error: err instanceof Error ? err.message : 'Failed to fetch routes',
      }));
    }
  }, [address]);

  // Fetch quote
  const fetchQuote = useCallback(async (params: {
    fromChainId: number;
    toChainId: number;
    fromToken: string;
    toToken: string;
    fromAmount: string;
  }) => {
    if (!address) return;

    setState(prev => ({ ...prev, isLoadingQuote: true, error: null }));

    try {
      const quote = await lifi.getQuote({
        ...params,
        fromAddress: address,
        toAddress: address,
      });

      setState(prev => ({
        ...prev,
        quote,
        isLoadingQuote: false,
      }));

      return quote;
    } catch (err) {
      setState(prev => ({
        ...prev,
        quote: null,
        isLoadingQuote: false,
        error: err instanceof Error ? err.message : 'Failed to fetch quote',
      }));
      return null;
    }
  }, [address]);

  // Execute bridge
  const executeBridge = useCallback(async () => {
    if (!state.quote?.transactionRequest || !address) {
      setState(prev => ({ ...prev, error: 'No quote available' }));
      return null;
    }

    setState(prev => ({ ...prev, isExecuting: true, error: null }));

    try {
      const tx = state.quote.transactionRequest;

      // Check if approval is needed
      const allowance = await lifi.checkAllowance({
        chainId: tx.chainId,
        tokenAddress: state.quote.action.fromToken.address,
        ownerAddress: address,
        spenderAddress: state.quote.estimate.approvalAddress,
      });

      const fromAmount = BigInt(state.quote.action.fromAmount);

      // Approve if needed
      if (allowance < fromAmount && state.quote.action.fromToken.address !== lifi.NATIVE_TOKEN) {
        const approvalTx = await lifi.getApprovalTx({
          chainId: tx.chainId,
          tokenAddress: state.quote.action.fromToken.address,
          spenderAddress: state.quote.estimate.approvalAddress,
          amount: state.quote.action.fromAmount,
        });

        await sendTransactionAsync({
          to: approvalTx.to as `0x${string}`,
          data: approvalTx.data as `0x${string}`,
        });
      }

      // Execute bridge transaction
      const hash = await sendTransactionAsync({
        to: tx.to as `0x${string}`,
        data: tx.data as `0x${string}`,
        value: BigInt(tx.value || '0'),
        gas: BigInt(tx.gasLimit),
      });

      setState(prev => ({
        ...prev,
        isExecuting: false,
        status: {
          transactionHash: hash,
          status: 'pending',
        },
      }));

      return hash;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isExecuting: false,
        error: err instanceof Error ? err.message : 'Transaction failed',
      }));
      return null;
    }
  }, [state.quote, address, sendTransactionAsync]);

  // Check status
  const checkStatus = useCallback(async (txHash: string, fromChainId?: number, toChainId?: number) => {
    try {
      const status = await lifi.getStatus({
        txHash,
        fromChain: fromChainId,
        toChain: toChainId,
      });

      setState(prev => ({ ...prev, status }));
      return status;
    } catch (err) {
      return null;
    }
  }, []);

  // Select route
  const selectRoute = useCallback((route: Route) => {
    setState(prev => ({ ...prev, selectedRoute: route }));
  }, []);

  // Clear state
  const reset = useCallback(() => {
    setState({
      routes: [],
      selectedRoute: null,
      quote: null,
      status: null,
      isLoadingRoutes: false,
      isLoadingQuote: false,
      isExecuting: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    isConnected,
    address,
    fetchRoutes,
    fetchQuote,
    executeBridge,
    checkStatus,
    selectRoute,
    reset,
  };
}
