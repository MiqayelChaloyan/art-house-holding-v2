const PORTFOLIO_NAME_TO_SLUG: Record<string, string> = {
    'GRAPHIC DESIGN': 'graphicdesign',
    GRAPHIC_DESIGN: 'graphicdesign',
    'INTERIOR DESIGN': 'interiordesign',
    INTERIOR_DESIGN: 'interiordesign',
    'FURNITURE DESIGN AND CONSTRUCTION': 'furniture-design',
    FURNITURE_DESIGN_AND_CONSTRUCTION: 'furniture-design',
    'FURNITURE DESIGN': 'furniture-design',
    FURNITURE_DESIGN: 'furniture-design',
    'AUTODESK 3DS MAX': 'autodesk3dsmax',
    AUTODESK_3DS_MAX: 'autodesk3dsmax',
    'AUTODESK REVIT': 'autodeskrevit',
    AUTODESK_REVIT: 'autodeskrevit',
    'UX/UI DESIGN': 'ux-ui',
    UX_UI_DESIGN: 'ux-ui',
    AUTOCAD: 'autocad&archicad',
    'AUTOCAD & ARCHICAD': 'autocad&archicad',
    AUTOCAD_ARCHICAD: 'autocad&archicad',
    RHINOCEROS: 'graphicdesign',
    All: '',
};

const DESIGN_COURSE_SLUG_ALIASES: Record<string, string> = {
    rhinoceros: 'graphicdesign',
    furnituredesign: 'furniture-design',
    furniture_design: 'furniture-design',
    interiordesign: 'interiordesign',
    graphicdesign: 'graphicdesign',
    autodeskrevit: 'autodeskrevit',
    autodesk3dsmax: 'autodesk3dsmax',
    'ux-ui': 'ux-ui',
    uxui: 'ux-ui',
};

export function resolveDesignCourseSlug(slug: string): string {
    const decoded = decodeFully(slug);
    const lower = decoded.toLowerCase();
    return DESIGN_COURSE_SLUG_ALIASES[lower] ?? decoded;
}

function decodeFully(value: string): string {
    let decoded = value;
    for (let i = 0; i < 3; i++) {
        try {
            const next = decodeURIComponent(decoded);
            if (next === decoded) {
                break;
            }
            decoded = next;
        } catch {
            break;
        }
    }
    return decoded.trim();
}

export function resolvePortfolioSlugFromName(nameParam: string): string | null {
    const decoded = decodeFully(nameParam);
    if (!decoded || decoded === 'All') {
        return null;
    }

    if (PORTFOLIO_NAME_TO_SLUG[decoded]) {
        return PORTFOLIO_NAME_TO_SLUG[decoded] || null;
    }

    const normalized = decoded.replace(/_/g, ' ');
    if (PORTFOLIO_NAME_TO_SLUG[normalized]) {
        return PORTFOLIO_NAME_TO_SLUG[normalized];
    }

    return normalized.toLowerCase().replace(/\s+/g, '').replace(/\//g, '-');
}

export function resolveLegacyPathRedirect(pathname: string): string | null {
    const designStudioLegacy = pathname.match(/^\/designstudio(?:\/.*)?$/);
    if (designStudioLegacy) {
        return '/am/design';
    }

    const langCenter = pathname.match(/^\/langcenter\/?$/);
    if (langCenter) {
        return '/am/language';
    }

    const localeLangCenter = pathname.match(/^\/(am|en|ru)\/langcenter\/?$/);
    if (localeLangCenter) {
        return `/${localeLangCenter[1]}/language`;
    }

    const designPortfolioSlug = pathname.match(/^\/(am|en|ru)\/design\/portfolios\/([^/]+)\/?$/);
    if (designPortfolioSlug) {
        const [, locale, slug] = designPortfolioSlug;
        const canonical = resolveDesignCourseSlug(slug);
        if (canonical !== decodeURIComponent(slug)) {
            return `/${locale}/design/portfolios/${encodeURIComponent(canonical)}`;
        }
    }

    const designOrderSlug = pathname.match(/^\/(am|en|ru)\/design\/orders\/([^/]+)\/?$/);
    if (designOrderSlug) {
        const [, locale, slug] = designOrderSlug;
        const canonical = resolveDesignCourseSlug(slug);
        if (canonical !== decodeURIComponent(slug)) {
            return `/${locale}/design/orders/${encodeURIComponent(canonical)}`;
        }
    }

    const localeOrders = pathname.match(/^\/(am|en|ru)\/orders\/?$/);
    if (localeOrders) {
        return `/${localeOrders[1]}/design/orders`;
    }

    const localeOnl = pathname.match(/^\/(am|en|ru)\/onl\/?$/);
    if (localeOnl) {
        return `/${localeOnl[1]}/educational-center`;
    }

    const localePriceList = pathname.match(/^\/(am|en|ru)\/price-list\/?$/);
    if (localePriceList) {
        return `/${localePriceList[1]}/educational-center/price-list`;
    }

    const ourTeam = pathname.match(/^\/(am|en|ru)\/our-team\/?$/);
    if (ourTeam) {
        return `/${ourTeam[1]}/design`;
    }

    const lessons = pathname.match(/^\/(am|en|ru)\/lessons\/[^/]+\/?$/);
    if (lessons) {
        return `/${lessons[1]}/educational-center`;
    }

    const truncatedSlug = pathname.match(/^\/(am|en|ru)\/educational-center\/clothing-\/?$/);
    if (truncatedSlug) {
        return `/${truncatedSlug[1]}/educational-center/clothing-design`;
    }

    const localeHomeAlias = pathname.match(/^\/(am|en|ru)\/home\/?$/);
    if (localeHomeAlias) {
        return `/${localeHomeAlias[1]}`;
    }

    const legacyHySite = pathname.match(/^\/hy(?:\/.*)?$/);
    if (legacyHySite) {
        return '/am';
    }

    return null;
}

export function resolvePathNormalization(pathname: string): string | null {
    const collapsed = pathname.replace(/\/{2,}/g, '/');
    const withoutTrailingSlash =
        collapsed.length > 1 && collapsed.endsWith('/')
            ? collapsed.slice(0, -1)
            : collapsed;

    return withoutTrailingSlash !== pathname ? withoutTrailingSlash : null;
}

export function resolvePortfolioLegacyRedirect(
    pathname: string,
    nameParam: string | null,
): string | null {
    const portfolioIndex = pathname.match(/^\/(am|en|ru)\/design\/portfolios\/?$/);
    if (portfolioIndex && nameParam) {
        const slug = resolvePortfolioSlugFromName(nameParam);
        if (slug === null) {
            return `/${portfolioIndex[1]}/design/portfolios`;
        }
        const canonicalSlug = resolveDesignCourseSlug(slug);
        return `/${portfolioIndex[1]}/design/portfolios/${encodeURIComponent(canonicalSlug)}`;
    }

    const portfolioWithSlug = pathname.match(/^\/(am|en|ru)\/design\/portfolios\/([^/]+)\/?$/);
    if (portfolioWithSlug && nameParam) {
        return `/${portfolioWithSlug[1]}/design/portfolios/${portfolioWithSlug[2]}`;
    }

    const ordersWithQuery = pathname.match(/^\/(am|en|ru)\/design\/orders\/([^/]+)\/?$/);
    if (ordersWithQuery && nameParam) {
        return `/${ordersWithQuery[1]}/design/orders/${ordersWithQuery[2]}`;
    }

    return null;
}
