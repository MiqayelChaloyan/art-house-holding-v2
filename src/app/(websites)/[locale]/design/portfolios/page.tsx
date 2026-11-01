'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/src/components/screens/design/portfolios';

import { Locale } from '@/src/locales';

import { buildSectionPageMetadata } from '@/src/utils/page-metadata';
import { SITE_META_QUERY } from '@/sanity/services/design-service';
import { getCourses, getPortfolioPage } from '@/src/utils/data/design';
import { Pages } from '@/src/constants/pages';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const [courses, page] = await Promise.all([
        getCourses(locale),
        getPortfolioPage(locale),
    ]);

    if (!courses?.length) {
        notFound()
    }

    return <Home courses={courses} page={page} />;
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    return buildSectionPageMetadata({
        query: SITE_META_QUERY,
        locale,
        path: `/${locale}${Pages.DESIGN_PORTFOLIOS}`,
        navigationKey: 'portfolios',
    });
};