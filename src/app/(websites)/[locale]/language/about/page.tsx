'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import About from '@/src/components/screens/language/about';

import { Locale } from '@/src/locales';
import { Pages } from '@/src/constants/pages';
import { SITE_META_QUERY } from '@/sanity/services/language-service';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';
import { getHomeDetails } from '@/src/utils/data/language';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const data = await getHomeDetails(locale);

    if (!data) {
        notFound()
    }

    return (<About data={data} locale={locale} />);
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    return buildSectionPageMetadata({
        query: SITE_META_QUERY,
        locale,
        path: `/${locale}${Pages.LANGUAGE_ABOUT}`,
        navigationKey: 'about',
    });
};

