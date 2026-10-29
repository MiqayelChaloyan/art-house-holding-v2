import 'server-only';

import { type Metadata } from 'next';

import { sanityFetch } from '@/src/api/sanity-fetch';
import { Site } from '@/src/types/general';
import { siteName } from '@/src/config/site';
import { generateMetadataDynamic } from '@/src/utils/default-metadata';
import { urlForImage } from '@/sanity/imageUrlBuilder';

export async function fetchSiteMetaEntry(
    query: string,
    locale: string,
    index: number = 0,
): Promise<Site | null> {
    const site = await sanityFetch<Site[]>({
        query,
        params: { language: locale },
    });

    return site?.[index] ?? null;
}

export function buildSiteMetadata(
    meta: Site | null,
    locale: string,
    canonicalPath?: string,
): Metadata {
    if (!meta) {
        return generateMetadataDynamic(
            undefined,
            siteName,
            undefined,
            null,
            locale,
            null,
            canonicalPath,
        );
    }

    const { ogDescription, ogTitle, ogImage, keywords } = meta;
    const path = ogImage ? urlForImage(ogImage) : undefined;

    return generateMetadataDynamic(
        ogDescription,
        ogTitle,
        path,
        null,
        locale,
        keywords,
        canonicalPath,
    );
}
