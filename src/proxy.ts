import {
  applyResponseHeaders,
  authkit,
  partitionAuthkitHeaders,
} from "@workos-inc/authkit-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import {
  DEFAULT_LOCALE,
  extractLocaleFromPathname,
  isPublicPath,
  isLocale,
  LOCALE_COOKIE_NAME,
  LOCALE_HEADER_NAME,
  localizeHref,
  type Locale,
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

async function getProfileLocalePreference(
  workosUserId: string | null | undefined
): Promise<Locale | null> {
  if (!workosUserId) {
    return null;
  }

  const supabase = createServerClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("locale_preference")
    .eq("workos_user_id", workosUserId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching locale preference in proxy:", error);
    return null;
  }

  return isLocale(data?.locale_preference) ? data.locale_preference : null;
}

export default async function proxy(request: NextRequest) {
  const { headers: authkitHeaders, session } = await authkit(request);
  const pathname = normalizePathname(request.nextUrl.pathname);
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const { pathname: pathnameWithoutLocale, locale: localePrefix } =
    extractLocaleFromPathname(pathname);
  const publicPath = isPublicPath(pathname);
  const privatePath = isPrivatePath(pathnameWithoutLocale);
  const profileLocalePreference = await getProfileLocalePreference(session.user?.id);
  const locale =
    profileLocalePreference ??
    (isLocale(cookieLocale) ? cookieLocale : null) ??
    (session.user ? DEFAULT_LOCALE : resolveLocale(pathname, cookieLocale));
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

  if (publicPath && session.user && localePrefix !== locale) {
    return finalizeResponse(
      NextResponse.redirect(
        buildRedirectUrl(request, localizeHref(pathnameWithoutLocale, locale))
      )
    );
  }

  if (publicPath && !session.user && !localePrefix) {
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
