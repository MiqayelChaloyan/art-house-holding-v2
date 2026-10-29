'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import ComingSoon from '@/src/components/screens/coming-soon';

import { Locale } from '@/src/locales';

import { SITE_META_QUERY } from '@/sanity/services/art-house-service';

import { getContacts } from '@/src/utils/data/art-house';
import { buildSiteMetadata, fetchSiteMetaEntry } from '@/src/utils/site-meta';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const data = await getContacts('en');

    if (!data) {
        notFound()
    }

    return (<ComingSoon data={data} />);
};


export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const meta = await fetchSiteMetaEntry(SITE_META_QUERY, locale, 1);
    const base = buildSiteMetadata(meta, locale, `/${locale}/comingSoon`);
    return {
        ...base,
        robots: { index: false, follow: true },
    };
};








