// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - TRANSACTION STATUS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { getStatus } from '@/lib/lifi';
import { BridgeStatus } from '@/types/bridge.types';

interface TransactionStatusProps {
  txHash: string;
  fromChainId: number;
  toChainId: number;
  fromChainName: string;
  toChainName: string;
  onClose: () => void;
}

export function TransactionStatus({
  txHash,
  fromChainId,
  toChainId,
  fromChainName,
  toChainName,
  onClose,
}: TransactionStatusProps) {
  const [status, setStatus] = useState<BridgeStatus | null>(null);
  const [isPolling, setIsPolling] = useState(true);

  // Poll for status updates
  useEffect(() => {
    if (!txHash || !isPolling) return;

    const checkStatus = async () => {
      try {
        const result = await getStatus({
          txHash,
          fromChain: fromChainId,
          toChain: toChainId,
        });
        setStatus(result);

        if (result.status === 'done' || result.status === 'failed') {
          setIsPolling(false);
        }
      } catch (err) {
        console.error('Status check failed:', err);
      }
    };

    // Initial check
    checkStatus();

    // Poll every 5 seconds
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [txHash, fromChainId, toChainId, isPolling]);

  const getStatusIcon = () => {
    if (!status || status.status === 'pending' || status.status === 'not_found') {
      return <Loader2 className="w-16 h-16 text-[var(--color-primary)] animate-spin" />;
    }
    if (status.status === 'done') {
      return <CheckCircle2 className="w-16 h-16 text-[var(--color-success)]" />;
    }
    return <XCircle className="w-16 h-16 text-[var(--color-error)]" />;
  };

  const getStatusMessage = () => {
    if (!status || status.status === 'not_found') {
      return `BridgeIT from ${fromChainName}...`;
    }
    if (status.status === 'pending') {
      return `BridgeIT to ${toChainName}...`;
    }
    if (status.status === 'done') {
      return `BridgeIT to ${toChainName} Complete!`;
    }
    return 'Transaction Failed';
  };

  const getExplorerUrl = (chainId: number, hash: string) => {
    const explorers: Record<number, string> = {
      1: 'https://etherscan.io/tx/',
      369: 'https://scan.pulsechain.com/tx/',
      8453: 'https://basescan.org/tx/',
      42161: 'https://arbiscan.io/tx/',
      10: 'https://optimistic.etherscan.io/tx/',
      137: 'https://polygonscan.com/tx/',
      56: 'https://bscscan.com/tx/',
      43114: 'https://snowtrace.io/tx/',
      250: 'https://ftmscan.com/tx/',
    };
    return `${explorers[chainId] || 'https://etherscan.io/tx/'}${hash}`;
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="md">
      <div className="flex flex-col items-center text-center py-4">
        {/* Status Icon with Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="mb-6"
        >
          {getStatusIcon()}
        </motion.div>

        {/* Dynamic Status Message */}
        <motion.h3
          key={getStatusMessage()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-[var(--color-text)] mb-2"
        >
          {getStatusMessage()}
        </motion.h3>

        {/* Substatus */}
        {status?.substatusMessage && (
          <p className="text-[var(--color-text-muted)] mb-4">
            {status.substatusMessage}
          </p>
        )}

        {/* Chain Flow Visualization */}
        <div className="flex items-center justify-center gap-4 my-6 px-4 py-3 bg-black/20 rounded-xl">
          <div className="text-center">
            <div className="text-sm text-[var(--color-text-muted)]">From</div>
            <div className="font-semibold text-[var(--color-text)]">{fromChainName}</div>
          </div>
          <ArrowRight className="w-6 h-6 text-[var(--color-primary)]" />
          <div className="text-center">
            <div className="text-sm text-[var(--color-text-muted)]">To</div>
            <div className="font-semibold text-[var(--color-text)]">{toChainName}</div>
          </div>
        </div>

        {/* Success Celebration */}
        {status?.status === 'done' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-[var(--color-success)] mb-4"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Transaction Successful!</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>
        )}

        {/* Transaction Links */}
        <div className="w-full space-y-2 mt-4">
          {/* Source Chain TX */}
          <a
            href={getExplorerUrl(fromChainId, txHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 bg-black/20 rounded-xl hover:bg-black/30 transition-colors"
          >
            <span className="text-sm text-[var(--color-text-muted)]">
              Source Transaction
            </span>
            <div className="flex items-center gap-2 text-[var(--color-primary)]">
              <span className="text-sm font-mono">
                {txHash.slice(0, 6)}...{txHash.slice(-4)}
              </span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          {/* Destination Chain TX (if available) */}
          {status?.receivingChain?.txHash && (
            <a
              href={getExplorerUrl(toChainId, status.receivingChain.txHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 bg-black/20 rounded-xl hover:bg-black/30 transition-colors"
            >
              <span className="text-sm text-[var(--color-text-muted)]">
                Destination Transaction
              </span>
              <div className="flex items-center gap-2 text-[var(--color-success)]">
                <span className="text-sm font-mono">
                  {status.receivingChain.txHash.slice(0, 6)}...{status.receivingChain.txHash.slice(-4)}
                </span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          )}
        </div>

        {/* Close Button */}
        <Button
          fullWidth
          variant={status?.status === 'done' ? 'primary' : 'outline'}
          onClick={onClose}
          className="mt-6"
        >
          {status?.status === 'done' ? 'Bridge More' : 'Close'}
        </Button>
      </div>
    </Modal>
  );
}
