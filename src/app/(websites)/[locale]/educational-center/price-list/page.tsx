'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import PriceList from '@/src/components/screens/educational-center/price-list';

import { Locale } from '@/src/locales';
import { Pages } from '@/src/constants/pages';
import { SITE_META_QUERY } from '@/sanity/services/educational-center-service';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';
import { getCourses } from '@/src/utils/data/educational-center';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({ 
    params: { locale } 
}: Readonly<Props>) {
    const data = await getCourses(locale);

    if (!data) {
        notFound()
    };

    return (<PriceList data={data} />);
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    return buildSectionPageMetadata({
        query: SITE_META_QUERY,
        locale,
        path: `/${locale}${Pages.EDUCATIONAL_PRICE_LIST}`,
        navigationKey: 'price-list',
    });
};