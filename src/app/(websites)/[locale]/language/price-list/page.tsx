'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/src/components/screens/language/price-list';

import { Locale } from '@/src/locales';
import { Pages } from '@/src/constants/pages';
import { SITE_META_QUERY } from '@/sanity/services/language-service';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';
import { getPriceList } from '@/src/utils/data/language';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const data = await getPriceList(locale);

    if (!data) {
        notFound()
    }

    return (<Home data={data} />);
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    return buildSectionPageMetadata({
        query: SITE_META_QUERY,
        locale,
        path: `/${locale}${Pages.LANGUAGE_PRICE_LIST}`,
        navigationKey: 'price-list',
    });
};
