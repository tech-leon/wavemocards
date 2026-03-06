import { authkit, getSignInUrl, getSignUpUrl, handleAuthkitHeaders } from '@workos-inc/authkit-nextjs';
import type { NextRequest } from 'next/server';
import { type AuthScreenHint, sanitizeReturnTo } from '@/lib/auth-routing';

function encodeReturnPathname(returnTo: string): string {
  return Buffer.from(JSON.stringify({ returnPathname: returnTo }))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export async function handleHostedAuthRedirect(request: NextRequest, screenHint: AuthScreenHint) {
  const safeReturnTo = sanitizeReturnTo(request.nextUrl.searchParams.get('returnTo'));
  const forceAuth = request.nextUrl.searchParams.get('force') === '1';
  const { session, headers } = await authkit(request, { screenHint });

  if (session.user && !forceAuth) {
    return handleAuthkitHeaders(request, headers, { redirect: safeReturnTo });
  }

  const state = encodeReturnPathname(safeReturnTo);
  const authUrl =
    screenHint === 'sign-in'
      ? await getSignInUrl({ state })
      : await getSignUpUrl({ state });

  return handleAuthkitHeaders(request, headers, { redirect: authUrl });
}
