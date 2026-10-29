/**
 * Single source of truth for every absolute URL the site emits:
 * canonical tags, hreflang alternates, Open Graph URLs, sitemap.xml,
 * robots.txt and share links.
 */

const configuredDomain = process.env.NEXT_PUBLIC_DOMAIN?.trim();

if (!configuredDomain && process.env.NODE_ENV === 'production') {
    throw new Error(
        'Missing environment variable: NEXT_PUBLIC_DOMAIN. Production builds must not fall back to a localhost origin, because it would be baked into canonical tags and the sitemap.',
    );
};

export const siteUrl = (
    configuredDomain || `http://localhost:${process.env.PORT || 3000}`
).replace(/\/$/, '');

export const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || 'Art House';

export function absoluteUrl(pathname: string): string {
    return `${siteUrl}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
};
