// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - SWAP WIDGET (STAINED GLASS THEME)
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, Zap, Clock, Shield, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useAccount, useSwitchChain } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { ChainSelector } from './ChainSelector';
import { TokenSelector } from './TokenSelector';
import { TransactionStatus } from './TransactionStatus';
import { Button } from '@/components/ui/Button';
import { useBridge } from '@/hooks/useBridge';
import { useSettings } from '@/hooks/useSettings';
import { Token } from '@/types/bridge.types';
import { formatNumber, formatUSD, debounce } from '@/lib/utils';
import { getChainById } from '@/lib/wagmi';

export function SwapWidget() {
  const { address, isConnected, chainId: currentChainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { theme } = useSettings();

  // Bridge state
  const [fromChainId, setFromChainId] = useState(1); // Ethereum default
  const [toChainId, setToChainId] = useState(8453); // Base default
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const bridge = useBridge();

  // Get chain names for dynamic messaging
  const fromChainName = useMemo(() => getChainById(fromChainId)?.name || 'Unknown', [fromChainId]);
  const toChainName = useMemo(() => getChainById(toChainId)?.name || 'Unknown', [toChainId]);

  // Dynamic "BridgeIT to/from" message
  const bridgeMessage = useMemo(() => {
    if (bridge.isExecuting) return `BridgeIT from ${fromChainName}...`;
    if (bridge.status?.status === 'pending') return `BridgeIT to ${toChainName}...`;
    if (bridge.status?.status === 'done') return `BridgeIT to ${toChainName} Complete!`;
    return `BridgeIT to ${toChainName}`;
  }, [fromChainName, toChainName, bridge.isExecuting, bridge.status]);

  // Fetch quote on input change
  const fetchQuoteDebounced = useMemo(
    () => debounce(async (amount: string) => {
      if (!fromToken || !toToken || !amount || parseFloat(amount) <= 0) return;

      try {
        const amountWei = parseUnits(amount, fromToken.decimals).toString();
        await bridge.fetchQuote({
          fromChainId,
          toChainId,
          fromToken: fromToken.address,
          toToken: toToken.address,
          fromAmount: amountWei,
        });
      } catch (err) {
        console.error('Quote error:', err);
      }
    }, 500),
    [fromChainId, toChainId, fromToken, toToken, bridge]
  );

  useEffect(() => {
    fetchQuoteDebounced(fromAmount);
  }, [fromAmount, fetchQuoteDebounced]);

  // Swap chains
  const handleSwapChains = useCallback(() => {
    setFromChainId(toChainId);
    setToChainId(fromChainId);
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount('');
    bridge.reset();
  }, [fromChainId, toChainId, fromToken, toToken, bridge]);

  // Execute bridge
  const handleBridge = async () => {
    if (!bridge.quote) return;

    // Switch chain if needed
    if (currentChainId !== fromChainId) {
      try {
        await switchChain({ chainId: fromChainId });
      } catch {
        return;
      }
    }

    const hash = await bridge.executeBridge();
    if (hash) {
      setTxHash(hash);
      setShowStatus(true);
    }
  };

  // Output amount display
  const outputAmount = useMemo(() => {
    if (!bridge.quote || !toToken) return '0';
    return formatNumber(
      formatUnits(BigInt(bridge.quote.estimate.toAmount), toToken.decimals),
      6
    );
  }, [bridge.quote, toToken]);

  // Min output amount
  const minOutputAmount = useMemo(() => {
    if (!bridge.quote || !toToken) return '0';
    return formatNumber(
      formatUnits(BigInt(bridge.quote.estimate.toAmountMin), toToken.decimals),
      6
    );
  }, [bridge.quote, toToken]);

  // Gas cost
  const gasCostUSD = useMemo(() => {
    if (!bridge.quote?.estimate.gasCosts?.length) return '0';
    const total = bridge.quote.estimate.gasCosts.reduce(
      (sum, cost) => sum + parseFloat(cost.amountUSD || '0'),
      0
    );
    return formatUSD(total);
  }, [bridge.quote]);

  // Execution time
  const executionTime = useMemo(() => {
    if (!bridge.quote?.estimate.executionDuration) return '~1 min';
    const seconds = bridge.quote.estimate.executionDuration;
    if (seconds < 60) return `~${seconds}s`;
    return `~${Math.ceil(seconds / 60)} min`;
  }, [bridge.quote]);

  // Button state
  const buttonState = useMemo(() => {
    if (!isConnected) return { text: 'Connect Wallet', disabled: true };
    if (!fromToken || !toToken) return { text: 'Select Tokens', disabled: true };
    if (!fromAmount || parseFloat(fromAmount) <= 0) return { text: 'Enter Amount', disabled: true };
    if (bridge.isLoadingQuote) return { text: 'Getting Quote...', disabled: true };
    if (bridge.error) return { text: bridge.error, disabled: true };
    if (!bridge.quote) return { text: 'No Route Found', disabled: true };
    if (currentChainId !== fromChainId) return { text: `Switch to ${fromChainName}`, disabled: false };
    return { text: bridgeMessage, disabled: false };
  }, [isConnected, fromToken, toToken, fromAmount, bridge, currentChainId, fromChainId, fromChainName, bridgeMessage]);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Main Card - Stained Glass Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-glass rounded-2xl p-6 animate-glow-rainbow"
      >
        {/* Header with rainbow gradient */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-glass-gold animate-float" />
            <h2 className="text-2xl font-heading font-bold gradient-text">
              {theme.brand.name}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted glass-teal px-3 py-1 rounded-full">
            <Shield className="w-4 h-4 text-glass-teal" />
            <span className="font-body">LI.FI</span>
          </div>
        </div>

        {/* Dynamic Bridge Message - Color cycles through rainbow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={bridgeMessage}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center mb-4"
          >
            <span className="text-lg font-heading font-semibold animate-color-cycle">
              {bridgeMessage}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* From Section - Ruby/Amber tinted glass */}
        <div className="glass-ruby rounded-xl p-4 mb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-muted font-body">From</span>
            <ChainSelector
              selectedChainId={fromChainId}
              onSelect={(id) => {
                setFromChainId(id);
                setFromToken(null);
                bridge.reset();
              }}
              excludeChainId={toChainId}
            />
          </div>

          <div className="flex items-center gap-3">
            <TokenSelector
              chainId={fromChainId}
              selectedToken={fromToken}
              onSelect={(token) => {
                setFromToken(token);
                bridge.reset();
              }}
            />
            <input
              type="text"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9.]/g, '');
                setFromAmount(val);
              }}
              className="input-glass flex-1 bg-transparent text-right text-2xl font-bold text-text placeholder:text-text-muted focus:outline-none border-none"
            />
          </div>
        </div>

        {/* Swap Button - Rainbow border animation */}
        <div className="flex justify-center -my-3 z-10 relative">
          <button
            onClick={handleSwapChains}
            className="p-3 bg-surface border-4 border-background rounded-xl hover:scale-110 transition-all hover:rotate-180 duration-300 animate-border-cycle"
          >
            <ArrowDownUp className="w-5 h-5 text-glass-teal" />
          </button>
        </div>

        {/* To Section - Teal/Sapphire tinted glass */}
        <div className="glass-sapphire rounded-xl p-4 mt-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-muted font-body">To</span>
            <ChainSelector
              selectedChainId={toChainId}
              onSelect={(id) => {
                setToChainId(id);
                setToToken(null);
                bridge.reset();
              }}
              excludeChainId={fromChainId}
            />
          </div>

          <div className="flex items-center gap-3">
            <TokenSelector
              chainId={toChainId}
              selectedToken={toToken}
              onSelect={(token) => {
                setToToken(token);
                bridge.reset();
              }}
            />
            <div className="flex-1 text-right">
              {bridge.isLoadingQuote ? (
                <Loader2 className="w-6 h-6 text-glass-sapphire animate-spin ml-auto" />
              ) : (
                <span className="text-2xl font-bold text-text">
                  {outputAmount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quote Details - Gold/Emerald accents */}
        {bridge.quote && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 glass-gold rounded-xl space-y-2 text-sm font-body"
          >
            <div className="flex justify-between">
              <span className="text-text-muted">Min. Received</span>
              <span className="text-text">{minOutputAmount} {toToken?.symbol}</span>
            </div>
            <div className="lead-line my-2"></div>
            <div className="flex justify-between">
              <span className="text-text-muted">Est. Gas</span>
              <span className="text-glass-amber">{gasCostUSD}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Est. Time</span>
              <span className="text-text flex items-center gap-1">
                <Clock className="w-4 h-4 text-glass-teal" />
                {executionTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Route</span>
              <span className="text-glass-emerald font-semibold">{bridge.quote.tool}</span>
            </div>
          </motion.div>
        )}

        {/* Error Display - Ruby glass */}
        {bridge.error && (
          <div className="mt-4 p-3 glass-ruby rounded-xl flex items-center gap-2 text-glass-ruby">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-body">{bridge.error}</span>
          </div>
        )}

        {/* Bridge Button - Rainbow glass style */}
        <button
          onClick={handleBridge}
          disabled={buttonState.disabled}
          className={`
            btn-glass-rainbow w-full mt-6 py-4 rounded-xl font-heading font-bold text-lg
            flex items-center justify-center gap-2 transition-all duration-300
            ${buttonState.disabled
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:scale-[1.02] hover:shadow-glow-rainbow'
            }
            ${bridge.isExecuting ? 'animate-pulse' : ''}
          `}
        >
          {bridge.isExecuting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Zap className="w-5 h-5" />
          )}
          {buttonState.text}
        </button>

        {/* Decorative rainbow line at bottom */}
        <div className="mt-6 h-1 bg-gradient-rainbow rounded-full opacity-50"></div>
      </motion.div>

      {/* Transaction Status Modal */}
      {showStatus && txHash && (
        <TransactionStatus
          txHash={txHash}
          fromChainId={fromChainId}
          toChainId={toChainId}
          fromChainName={fromChainName}
          toChainName={toChainName}
          onClose={() => {
            setShowStatus(false);
            setTxHash(null);
            setFromAmount('');
            bridge.reset();
          }}
        />
      )}
    </div>
  );
}
