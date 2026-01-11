// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - CHAIN SELECTOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Check } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';
import { supportedChains, chainLogos } from '@/lib/wagmi';

interface ChainSelectorProps {
  selectedChainId: number;
  onSelect: (chainId: number) => void;
  label?: string;
  excludeChainId?: number;
}

export function ChainSelector({ selectedChainId, onSelect, label, excludeChainId }: ChainSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selectedChain = useMemo(
    () => supportedChains.find(c => c.id === selectedChainId),
    [selectedChainId]
  );

  const filteredChains = useMemo(() => {
    return supportedChains
      .filter(c => c.id !== excludeChainId)
      .filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.nativeCurrency.symbol.toLowerCase().includes(search.toLowerCase())
      );
  }, [search, excludeChainId]);

  return (
    <>
      <div className="flex flex-col gap-2">
        {label && (
          <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
        )}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-between gap-3 px-4 py-3 bg-[var(--color-surface)] border border-white/10 rounded-xl hover:border-[var(--color-primary)]/50 transition-all"
        >
          <div className="flex items-center gap-3">
            <img
              src={chainLogos[selectedChainId] || `https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg`}
              alt={selectedChain?.name || 'Chain'}
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg';
              }}
            />
            <div className="text-left">
              <div className="font-semibold text-[var(--color-text)]">
                {selectedChain?.name || 'Select Chain'}
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">
                {selectedChain?.nativeCurrency.symbol}
              </div>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)]" />
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Select Chain" size="md">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search chains..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/50"
          />
        </div>

        {/* Chain List */}
        <div className="max-h-80 overflow-y-auto space-y-1">
          {filteredChains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => {
                onSelect(chain.id);
                setIsOpen(false);
                setSearch('');
              }}
              className={cn(
                'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all',
                selectedChainId === chain.id
                  ? 'bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/50'
                  : 'hover:bg-white/5'
              )}
            >
              <div className="flex items-center gap-3">
                <img
                  src={chainLogos[chain.id] || `https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg`}
                  alt={chain.name}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg';
                  }}
                />
                <div className="text-left">
                  <div className="font-semibold text-[var(--color-text)]">{chain.name}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">
                    {chain.nativeCurrency.symbol}
                  </div>
                </div>
              </div>
              {selectedChainId === chain.id && (
                <Check className="w-5 h-5 text-[var(--color-primary)]" />
              )}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
