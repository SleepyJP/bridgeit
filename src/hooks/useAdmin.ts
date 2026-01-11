// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - ADMIN HOOK
// ═══════════════════════════════════════════════════════════════════════════════

import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { isAdmin, ADMIN_WALLETS } from '@/config/admin.config';

export function useAdmin() {
  const { address, isConnected } = useAccount();

  const isAdminWallet = useMemo(() => {
    if (!address || !isConnected) return false;
    return isAdmin(address);
  }, [address, isConnected]);

  return {
    isAdmin: isAdminWallet,
    address,
    isConnected,
    adminWallets: ADMIN_WALLETS,
  };
}
