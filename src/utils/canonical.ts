import { defaultLocale, locales } from '@/src/locales';

export function buildPagePath(locale: string, ...segments: string[]): string {
    const suffix = segments.filter(Boolean).join('/');
    return suffix ? `/${locale}/${suffix}` : `/${locale}`;
}

export function encodeCanonicalPath(pathname: string): string {
    return pathname
        .split('/')
        .map((segment) => {
            if (!segment) {
                return segment;
            }
            try {
                return encodeURIComponent(decodeURIComponent(segment));
            } catch {
                return encodeURIComponent(segment);
            }
        })
        .join('/');
}

export function buildHreflangAlternates(pathname: string): Record<string, string> {
    const alternates = Object.fromEntries(
        locales.map((loc) => [
            loc,
            pathname.replace(/^\/(am|en|ru)(?=\/|$)/, `/${loc}`),
        ]),
    );

    return {
        ...alternates,
        'x-default': alternates[defaultLocale],
    };
}

export function resolveCanonicalPath(
    locale?: string,
    explicitPath?: string,
    requestPathname?: string | null,
): string {
    if (explicitPath) {
        return explicitPath.startsWith('/') ? explicitPath : `/${explicitPath}`;
    }

    if (requestPathname) {
        return requestPathname;
    }

    return locale ? `/${locale}` : '/';
}
