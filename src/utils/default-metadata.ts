import 'server-only';

import { type Metadata } from 'next';
import { headers } from 'next/headers';

import { ImagePath } from '@/src/types/general';
import { defaultKeywords } from '../constants';
import DefaultIcon from '@/src/app/favicon.ico';
import { siteName, siteUrl } from '@/src/config/site';
import { buildHreflangAlternates, encodeCanonicalPath, resolveCanonicalPath } from '@/src/utils/canonical';

export const generateMetadataDynamic = (
    ogDescription?: string,
    ogTitle?: string,
    path?: ImagePath,
    icon?: ImagePath | null,
    locale?: string,
    keywords?: string[] | null,
    canonicalPath?: string,
): Metadata => {
    const icons = icon ? { icon: icon?.src } : { icon: DefaultIcon.src };
    const finalKeywords = keywords?.length ? keywords : defaultKeywords;
    const requestPathname = headers().get('x-pathname');
    const pathname = encodeCanonicalPath(
        resolveCanonicalPath(locale, canonicalPath, requestPathname),
    );
    const canonical = `${siteUrl}${pathname}`;

    const images = path?.src
        ? [
            {
                url: path.src,
                width: path.width,
                height: path.height,
                alt: ogTitle ?? siteName,
            },
        ]
        : undefined;

    return {
        metadataBase: new URL(siteUrl),
        title: ogTitle,
        description: ogDescription,
        authors: [
            {
                name: siteName,
                url: siteUrl,
            },
        ],
        twitter: {
            card: images ? 'summary_large_image' : 'summary',
            title: ogTitle,
            description: ogDescription,
            creator: '@arthouse',
            images,
        },
        robots: 'index, follow',
        alternates: {
            canonical,
            languages: buildHreflangAlternates(pathname),
        },
        openGraph: {
            type: 'website',
            url: canonical,
            title: ogTitle,
            description: ogDescription,
            siteName,
            images,
            locale,
        },
        icons,
        keywords: finalKeywords.join(', '),
    };
};
