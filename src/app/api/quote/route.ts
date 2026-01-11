// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - QUOTE API ROUTE
// ═══════════════════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { getQuote, getRoutes } from '@/lib/lifi';
import { BridgeRequest } from '@/types/bridge.types';

export async function POST(request: NextRequest) {
  try {
    const body: BridgeRequest = await request.json();

    // Validate required fields
    if (!body.fromChainId || !body.toChainId || !body.fromToken || !body.toToken || !body.fromAmount || !body.fromAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get quote from LI.FI
    const quote = await getQuote(body);

    return NextResponse.json(quote);
  } catch (error: any) {
    console.error('Quote API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get quote' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const bridgeRequest: BridgeRequest = {
      fromChainId: parseInt(searchParams.get('fromChainId') || '1'),
      toChainId: parseInt(searchParams.get('toChainId') || '8453'),
      fromToken: searchParams.get('fromToken') || '',
      toToken: searchParams.get('toToken') || '',
      fromAmount: searchParams.get('fromAmount') || '',
      fromAddress: searchParams.get('fromAddress') || '',
      toAddress: searchParams.get('toAddress') || searchParams.get('fromAddress') || '',
      slippage: parseFloat(searchParams.get('slippage') || '0.03'),
    };

    // Validate required fields
    if (!bridgeRequest.fromToken || !bridgeRequest.toToken || !bridgeRequest.fromAmount || !bridgeRequest.fromAddress) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get routes from LI.FI
    const routes = await getRoutes(bridgeRequest);

    return NextResponse.json({ routes });
  } catch (error: any) {
    console.error('Routes API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get routes' },
      { status: 500 }
    );
  }
}
