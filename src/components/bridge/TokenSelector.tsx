// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - TOKEN SELECTOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';
import { getTokens, NATIVE_TOKEN } from '@/lib/lifi';
import { Token } from '@/types/bridge.types';

interface TokenSelectorProps {
  chainId: number;
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
  label?: string;
}

export function TokenSelector({ chainId, selectedToken, onSelect, label }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch tokens when chain changes
  useEffect(() => {
    async function fetchTokens() {
      setIsLoading(true);
      try {
        const result = await getTokens(chainId);
        setTokens(result);
      } catch (err) {
        console.error('Failed to fetch tokens:', err);
        setTokens([]);
      }
      setIsLoading(false);
    }
    fetchTokens();
  }, [chainId]);

  const filteredTokens = useMemo(() => {
    return tokens.filter(t =>
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.address.toLowerCase().includes(search.toLowerCase())
    );
  }, [tokens, search]);

  // Popular tokens first
  const sortedTokens = useMemo(() => {
    const popular = ['ETH', 'USDC', 'USDT', 'DAI', 'WETH', 'WBTC', 'PLS', 'BNB', 'MATIC', 'AVAX'];
    return [...filteredTokens].sort((a, b) => {
      const aIndex = popular.indexOf(a.symbol);
      const bIndex = popular.indexOf(b.symbol);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });
  }, [filteredTokens]);

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
            {selectedToken ? (
              <>
                <img
                  src={selectedToken.logoURI || `https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/tokens/${selectedToken.symbol.toLowerCase()}.svg`}
                  alt={selectedToken.symbol}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/tokens/unknown.svg';
                  }}
                />
                <div className="text-left">
                  <div className="font-semibold text-[var(--color-text)]">
                    {selectedToken.symbol}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] truncate max-w-[120px]">
                    {selectedToken.name}
                  </div>
                </div>
              </>
            ) : (
              <span className="text-[var(--color-text-muted)]">Select Token</span>
            )}
          </div>
          <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)]" />
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Select Token" size="md">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search by name, symbol, or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/50"
          />
        </div>

        {/* Token List */}
        <div className="max-h-80 overflow-y-auto space-y-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full" />
            </div>
          ) : sortedTokens.length === 0 ? (
            <div className="text-center py-8 text-[var(--color-text-muted)]">
              No tokens found
            </div>
          ) : (
            sortedTokens.slice(0, 50).map((token) => (
              <button
                key={token.address}
                onClick={() => {
                  onSelect(token);
                  setIsOpen(false);
                  setSearch('');
                }}
                className={cn(
                  'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all',
                  selectedToken?.address === token.address
                    ? 'bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/50'
                    : 'hover:bg-white/5'
                )}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={token.logoURI || `https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/tokens/${token.symbol.toLowerCase()}.svg`}
                    alt={token.symbol}
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/tokens/unknown.svg';
                    }}
                  />
                  <div className="text-left">
                    <div className="font-semibold text-[var(--color-text)]">{token.symbol}</div>
                    <div className="text-xs text-[var(--color-text-muted)] truncate max-w-[200px]">
                      {token.name}
                    </div>
                  </div>
                </div>
                {selectedToken?.address === token.address && (
                  <Check className="w-5 h-5 text-[var(--color-primary)]" />
                )}
              </button>
            ))
          )}
        </div>
      </Modal>
    </>
  );
}
