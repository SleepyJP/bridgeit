// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - TOKENS API ROUTE
// ═══════════════════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { getTokens } from '@/lib/lifi';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const chainId = searchParams.get('chainId');

    if (!chainId) {
      return NextResponse.json(
        { error: 'Missing chainId parameter' },
        { status: 400 }
      );
    }

    const tokens = await getTokens(parseInt(chainId));
    return NextResponse.json({ tokens });
  } catch (error: any) {
    console.error('Tokens API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get tokens' },
      { status: 500 }
    );
  }
}
