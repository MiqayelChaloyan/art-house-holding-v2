'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Partners from '@/src/components/screens/educational-center/partners';

import { Locale } from '@/src/locales';
import { Pages } from '@/src/constants/pages';
import { SITE_META_QUERY } from '@/sanity/services/educational-center-service';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';
import { getPartners } from '@/src/utils/data';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const partners = await getPartners(locale);

    if (!partners) {
        notFound()
    };

    return (<Partners data={partners} />);
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    return buildSectionPageMetadata({
        query: SITE_META_QUERY,
        locale,
        path: `/${locale}${Pages.EDUCATIONAL_PARTNERS}`,
        navigationKey: 'partners',
    });
};