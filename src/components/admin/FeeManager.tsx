// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - FEE MANAGER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { DollarSign, Percent, Save, RotateCcw, Wallet } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { FEE_WALLETS } from '@/config/admin.config';
import { Button } from '@/components/ui/Button';

export function FeeManager() {
  const { feeConfig, setFeeConfig, resetFees } = useSettings();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Fee Rates */}
      <section className="bg-[var(--color-surface)] rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Percent className="w-5 h-5 text-[var(--color-primary)]" />
          <h3 className="text-lg font-bold text-[var(--color-text)]">Fee Rates</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-2">
              Bridge Fee (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={feeConfig.bridgeFeePercent}
              onChange={(e) => setFeeConfig({ bridgeFeePercent: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]/50"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-2">
              Swap Fee (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={feeConfig.swapFeePercent}
              onChange={(e) => setFeeConfig({ swapFeePercent: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]/50"
            />
          </div>
        </div>
      </section>

      {/* Fee Limits */}
      <section className="bg-[var(--color-surface)] rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-5 h-5 text-[var(--color-primary)]" />
          <h3 className="text-lg font-bold text-[var(--color-text)]">Fee Limits (USD)</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-2">
              Minimum Fee ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={feeConfig.minFeeUSD}
              onChange={(e) => setFeeConfig({ minFeeUSD: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]/50"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-2">
              Maximum Fee ($)
            </label>
            <input
              type="number"
              step="1"
              min="0"
              value={feeConfig.maxFeeUSD}
              onChange={(e) => setFeeConfig({ maxFeeUSD: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]/50"
            />
          </div>
        </div>
      </section>

      {/* Fee Wallets (Display Only) */}
      <section className="bg-[var(--color-surface)] rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-5 h-5 text-[var(--color-primary)]" />
          <h3 className="text-lg font-bold text-[var(--color-text)]">Fee Wallets</h3>
        </div>

        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Fees are automatically routed to these wallets (hardcoded for security):
        </p>

        <div className="space-y-3">
          {Object.entries(FEE_WALLETS).map(([chain, address]) => (
            <div key={chain} className="flex items-center justify-between p-3 bg-black/20 rounded-xl">
              <span className="text-sm font-semibold text-[var(--color-text)]">{chain}</span>
              <span className="font-mono text-xs text-[var(--color-text-muted)] break-all">
                {address}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Summary */}
      <section className="bg-[var(--color-primary)]/10 rounded-2xl p-6 border border-[var(--color-primary)]/30">
        <h3 className="text-lg font-bold text-[var(--color-text)] mb-4">Fee Summary</h3>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-black/20 rounded-xl">
            <div className="text-2xl font-bold text-[var(--color-primary)]">
              {feeConfig.bridgeFeePercent}%
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">Bridge Fee</div>
          </div>
          <div className="p-4 bg-black/20 rounded-xl">
            <div className="text-2xl font-bold text-[var(--color-secondary)]">
              {feeConfig.swapFeePercent}%
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">Swap Fee</div>
          </div>
          <div className="p-4 bg-black/20 rounded-xl">
            <div className="text-2xl font-bold text-[var(--color-accent)]">
              ${feeConfig.minFeeUSD}
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">Min Fee</div>
          </div>
          <div className="p-4 bg-black/20 rounded-xl">
            <div className="text-2xl font-bold text-[var(--color-warning)]">
              ${feeConfig.maxFeeUSD}
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">Max Fee</div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={resetFees} className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </Button>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
