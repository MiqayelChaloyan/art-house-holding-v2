import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import LegalPage from '@/src/components/screens/design/legal';

import { Locale } from '@/src/locales';
import { Pages } from '@/src/constants/pages';
import { siteName } from '@/src/config/site';
import { SITE_META_QUERY } from '@/sanity/services/design-service';
import { getLegalPage } from '@/src/utils/data/design';
import { buildSiteMetadata, fetchSiteMetaEntry } from '@/src/utils/site-meta';


const PATHS: Record<LEGAL_PAGE_SLUG, string> = {
    privacy: Pages.DESIGN_PRIVACY,
    terms: Pages.DESIGN_TERMS,
    imprint: Pages.DESIGN_IMPRINT,
};

export async function renderLegalPage(locale: string, page: LEGAL_PAGE_SLUG) {
    const data = await getLegalPage(locale, page);

    if (!data?.line_1) {
        notFound();
    }

    return <LegalPage data={data} page={page} />;
}

export async function legalPageMetadata(locale: Locale, page: LEGAL_PAGE_SLUG): Promise<Metadata> {
    const [data, meta] = await Promise.all([
        getLegalPage(locale, page),
        fetchSiteMetaEntry(SITE_META_QUERY, locale, 0),
    ]);

    const path = `/${locale}${PATHS[page]}`;
    const base = buildSiteMetadata(meta, locale, path);
    const headline = [data?.line_1, data?.line_2].filter(Boolean).join(' ');
    const title = headline ? `${headline} | ${siteName}` : base.title;

    return {
        ...base,
        title,
        description: data?.lead || base.description,
        openGraph: {
            ...base.openGraph,
            title,
            description: data?.lead || base.openGraph?.description,
        },
    };
}
