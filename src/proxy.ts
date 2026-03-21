import {
  applyResponseHeaders,
  authkit,
  partitionAuthkitHeaders,
} from "@workos-inc/authkit-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  extractLocaleFromPathname,
  isPublicPath,
  LOCALE_COOKIE_NAME,
  LOCALE_HEADER_NAME,
  localizeHref,
  normalizePathname,
  resolveLocale,
} from "@/lib/i18n/locale";

const PRIVATE_ROUTE_PREFIXES = ["/account", "/records", "/explore"] as const;
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function isPrivatePath(pathname: string): boolean {
  return PRIVATE_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function buildRedirectUrl(request: NextRequest, pathname: string): URL {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return url;
}

export default async function proxy(request: NextRequest) {
  const { headers: authkitHeaders } = await authkit(request);
  const pathname = normalizePathname(request.nextUrl.pathname);
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const { pathname: pathnameWithoutLocale, locale: localePrefix } =
    extractLocaleFromPathname(pathname);
  const publicPath = isPublicPath(pathname);
  const privatePath = isPrivatePath(pathnameWithoutLocale);

  const locale = localePrefix ?? resolveLocale(pathname, cookieLocale);
  const { requestHeaders, responseHeaders } = partitionAuthkitHeaders(
    request,
    authkitHeaders
  );

  requestHeaders.set(LOCALE_HEADER_NAME, locale);

  const finalizeResponse = (response: NextResponse) => {
    const nextResponse = applyResponseHeaders(response, responseHeaders);
    nextResponse.cookies.set(LOCALE_COOKIE_NAME, locale, {
      path: "/",
      sameSite: "lax",
      maxAge: LOCALE_COOKIE_MAX_AGE,
    });
    nextResponse.headers.set(LOCALE_HEADER_NAME, locale);
    return nextResponse;
  };

  if (pathname === "/") {
    return finalizeResponse(
      NextResponse.redirect(buildRedirectUrl(request, localizeHref("/", locale)))
    );
  }

  if (publicPath && !localePrefix) {
    return finalizeResponse(
      NextResponse.redirect(
        buildRedirectUrl(request, localizeHref(pathnameWithoutLocale, locale))
      )
    );
  }

  if (!publicPath && privatePath && localePrefix) {
    return finalizeResponse(
      NextResponse.redirect(buildRedirectUrl(request, pathnameWithoutLocale))
    );
  }

  return finalizeResponse(
    NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  );
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
