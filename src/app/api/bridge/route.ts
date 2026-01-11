// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - BRIDGE STATUS API ROUTE
// ═══════════════════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { getStatus } from '@/lib/lifi';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const txHash = searchParams.get('txHash');
    const fromChain = searchParams.get('fromChain');
    const toChain = searchParams.get('toChain');
    const bridge = searchParams.get('bridge');

    if (!txHash) {
      return NextResponse.json(
        { error: 'Missing txHash parameter' },
        { status: 400 }
      );
    }

    const status = await getStatus({
      txHash,
      bridge: bridge || undefined,
      fromChain: fromChain ? parseInt(fromChain) : undefined,
      toChain: toChain ? parseInt(toChain) : undefined,
    });

    return NextResponse.json(status);
  } catch (error: any) {
    console.error('Bridge status API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get status' },
      { status: 500 }
    );
  }
}
