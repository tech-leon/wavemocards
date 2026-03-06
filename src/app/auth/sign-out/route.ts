import { signOut } from '@workos-inc/authkit-nextjs';
import type { NextRequest } from 'next/server';
import { sanitizeReturnTo } from '@/lib/auth-routing';

function resolveBaseUrl(request: NextRequest): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;

  if (appUrl) {
    return new URL(appUrl).origin;
  }

  return request.nextUrl.origin;
}

export async function GET(request: NextRequest) {
  const safeReturnTo = sanitizeReturnTo(request.nextUrl.searchParams.get('returnTo'));
  const returnTo = new URL(safeReturnTo, resolveBaseUrl(request)).toString();

  await signOut({ returnTo });
}
