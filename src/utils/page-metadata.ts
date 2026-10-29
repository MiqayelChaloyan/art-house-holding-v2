import 'server-only';

import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { Locale } from '@/src/locales';
import { siteName } from '@/src/config/site';
import { buildSiteMetadata, fetchSiteMetaEntry } from '@/src/utils/site-meta';

/** Keys of the `navigation` namespace, which already holds a localized label per section page. */
export type NavigationKey =
    | 'about'
    | 'blog'
    | 'contact'
    | 'courses'
    | 'departments'
    | 'languages'
    | 'orders'
    | 'our-team'
    | 'partners'
    | 'portfolios'
    | 'price-list'
    | 'promotions'
    | 'send-request'
    | 'take-the-test';

interface SectionPageMetadataInput {
    query: string;
    locale: Locale;
    path: string;
    navigationKey: NavigationKey;
    index?: number;
};

/**
 * Every page inside a section reads the same CMS metadata document, so without a
 * page-specific title they all report an identical <title> to Search Console.
 * Prefixing the localized nav label keeps each page distinct while leaving the
 * CMS in charge of the section branding.
 */
export async function buildSectionPageMetadata({
    query,
    locale,
    path,
    navigationKey,
    index = 0,
}: SectionPageMetadataInput): Promise<Metadata> {
    const [meta, t] = await Promise.all([
        fetchSiteMetaEntry(query, locale, index),
        getTranslations({ locale, namespace: 'navigation' }),
    ]);

    const base = buildSiteMetadata(meta, locale, path);
    const sectionTitle = typeof base.title === 'string' ? base.title : siteName;
    const title = `${t(navigationKey)} | ${sectionTitle}`;

    return {
        ...base,
        title,
        openGraph: { ...base.openGraph, title },
        twitter: { ...base.twitter, title },
    };
};
