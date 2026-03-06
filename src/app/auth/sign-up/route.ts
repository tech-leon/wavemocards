import type { NextRequest } from 'next/server';
import { handleHostedAuthRedirect } from '@/lib/auth-entry';

export async function GET(request: NextRequest) {
  return handleHostedAuthRedirect(request, 'sign-up');
}
