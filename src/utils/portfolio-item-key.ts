export function getPortfolioItemKey(
    searchParams: Pick<URLSearchParams, 'get'>,
): string | null {
    if (typeof window !== 'undefined') {
        const hash = window.location.hash.slice(1);
        if (hash) {
            return decodeURIComponent(hash);
        }
    }

    const legacyName = searchParams.get('name');
    return legacyName ? decodeURIComponent(legacyName) : null;
}
