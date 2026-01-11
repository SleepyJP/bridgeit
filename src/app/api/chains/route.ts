// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - CHAINS API ROUTE
// ═══════════════════════════════════════════════════════════════════════════════

import { NextResponse } from 'next/server';
import { getChains } from '@/lib/lifi';

export async function GET() {
  try {
    const chains = await getChains();
    return NextResponse.json({ chains });
  } catch (error: any) {
    console.error('Chains API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get chains' },
      { status: 500 }
    );
  }
}
