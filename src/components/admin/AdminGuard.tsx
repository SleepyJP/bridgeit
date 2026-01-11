// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - ADMIN GUARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { ReactNode } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Shield, AlertTriangle } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/Button';

interface AdminGuardProps {
  children: ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { isAdmin, adminWallets } = useAdmin();

  // Not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="max-w-md w-full mx-4 p-8 bg-[var(--color-surface)] rounded-3xl border border-white/10 text-center">
          <Shield className="w-16 h-16 text-[var(--color-primary)] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">
            Admin Access Required
          </h1>
          <p className="text-[var(--color-text-muted)] mb-6">
            Connect your wallet to access the admin dashboard.
          </p>
          <Button onClick={openConnectModal} fullWidth>
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  // Connected but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="max-w-md w-full mx-4 p-8 bg-[var(--color-surface)] rounded-3xl border border-[var(--color-error)]/50 text-center">
          <AlertTriangle className="w-16 h-16 text-[var(--color-error)] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">
            Access Denied
          </h1>
          <p className="text-[var(--color-text-muted)] mb-4">
            Your wallet is not authorized to access the admin dashboard.
          </p>
          <div className="p-3 bg-black/30 rounded-xl mb-6">
            <p className="text-sm text-[var(--color-text-muted)]">Connected:</p>
            <p className="font-mono text-sm text-[var(--color-text)] break-all">
              {address}
            </p>
          </div>
          <div className="text-left p-4 bg-black/20 rounded-xl">
            <p className="text-sm text-[var(--color-text-muted)] mb-2">Authorized wallets:</p>
            {adminWallets.map((wallet, i) => (
              <p key={i} className="font-mono text-xs text-[var(--color-text-muted)] break-all">
                {wallet}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Admin - render children
  return <>{children}</>;
}
