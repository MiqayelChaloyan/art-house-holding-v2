import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { defaultLocale, locales } from './locales';
import {
    resolveLegacyPathRedirect,
    resolvePathNormalization,
    resolvePortfolioLegacyRedirect,
} from './utils/legacy-redirects';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
});

const LANGUAGE_SECTION_RESERVED = new Set([
  'languages',
  'blog',
  'promotions',
  'price-list',
  'partners',
  'form',
  'quiz',
  'about',
]);

function redirectTo(request: NextRequest, pathname: string, searchParams?: URLSearchParams) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = searchParams?.toString() ?? '';
  return NextResponse.redirect(url, 301);
}

function redirectToHttps(request: NextRequest): NextResponse | null {
  const hostname = request.nextUrl.hostname;
  if (hostname !== 'arthouse.am' && hostname !== 'www.arthouse.am') {
    return null;
  }

  const forwardedProto = request.headers.get('x-forwarded-proto');
  const isHttp =
    forwardedProto === 'http' ||
    (request.nextUrl.protocol === 'http:' && !forwardedProto);

  if (!isHttp) {
    return null;
  }

  const url = request.nextUrl.clone();
  url.protocol = 'https:';
  url.port = '';
  return NextResponse.redirect(url, 301);
}

export default function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;

  if (hostname === 'www.arthouse.am') {
    const url = request.nextUrl.clone();
    url.hostname = 'arthouse.am';
    return NextResponse.redirect(url, 301);
  }

  const httpsRedirect = redirectToHttps(request);
  if (httpsRedirect) {
    return httpsRedirect;
  }

  const { pathname } = request.nextUrl;
  const nameParam = request.nextUrl.searchParams.get('name');

  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const normalizedPath = resolvePathNormalization(pathname);
  if (normalizedPath) {
    return redirectTo(request, normalizedPath);
  }

  const portfolioRedirect = resolvePortfolioLegacyRedirect(pathname, nameParam);
  if (portfolioRedirect) {
    return redirectTo(request, portfolioRedirect);
  }

  const designPathWithJunkQuery = pathname.match(
    /^\/(am|en|ru)\/design\/(portfolios|orders)(?:\/[^/]+)?\/?$/,
  );
  if (designPathWithJunkQuery && request.nextUrl.search) {
    return redirectTo(request, pathname);
  }

  const legacyPathRedirect = resolveLegacyPathRedirect(pathname);
  if (legacyPathRedirect) {
    return redirectTo(request, legacyPathRedirect);
  }

  const languageBlogMisrouteMatch = pathname.match(
    /^\/(am|en|ru)\/language\/languages\/blog(\/.*)?$/,
  );
  if (languageBlogMisrouteMatch) {
    const [, locale, suffix = ''] = languageBlogMisrouteMatch;
    return redirectTo(request, `/${locale}/language/blog${suffix}`);
  }

  const languageLegacyMatch = pathname.match(/^\/(am|en|ru)\/language\/([^/]+)\/?$/);
  if (languageLegacyMatch) {
    const [, locale, segment] = languageLegacyMatch;
    const decoded = decodeURIComponent(segment);

    if (!LANGUAGE_SECTION_RESERVED.has(decoded)) {
      return redirectTo(request, `/${locale}/language/languages/${decoded}`);
    }
  }

  const localeHomeWithJunkQuery = pathname.match(/^\/(am|en|ru)\/?$/);
  if (localeHomeWithJunkQuery && request.nextUrl.search) {
    return redirectTo(request, `/${localeHomeWithJunkQuery[1]}`);
  }

  if (pathname === '/' && request.nextUrl.search) {
    return redirectTo(request, '/am');
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  return intlMiddleware(
    new NextRequest(request.url, {
      headers: requestHeaders,
    }),
  );
}

export const config = {
  matcher: [
    '/',
    '/(am|en|ru)/:path*',
    '/((?!_next|admin|api|robots.txt|sitemap.xml|favicon.ico).*)',
  ],
};
