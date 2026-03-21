import { authkit, handleAuthkitHeaders } from "@workos-inc/authkit-nextjs";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE_NAME, LOCALE_HEADER_NAME, normalizePathname, resolveLocale } from "@/lib/i18n/locale";

export default async function proxy(request: NextRequest) {
  const { headers } = await authkit(request);
  const pathname = normalizePathname(request.nextUrl.pathname);
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const locale = resolveLocale(pathname, cookieLocale);

  headers.set(LOCALE_HEADER_NAME, locale);

  return handleAuthkitHeaders(request, headers);
}


export const config = {
  matcher: [
    "/",
    "/about-emotions",
    "/emo-cards",
    "/emo-cards/(.*)",
    "/zh-TW/:path*",
    "/en/:path*",
    "/ja/:path*",
    "/account",
    "/account/(.*)",
    "/records",
    "/records/(.*)",
    "/explore",
    "/explore/(.*)",
    "/api/(.*)",
  ],
};
