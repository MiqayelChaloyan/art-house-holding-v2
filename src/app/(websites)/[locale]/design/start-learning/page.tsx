'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/src/components/screens/design/orders';

import { Locale } from '@/src/locales';

import { SITE_META_QUERY } from '@/sanity/services/design-service';

import { Pages } from '@/src/constants/pages';
import { getSelectOptions } from '@/src/utils/data/design';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';


interface Props {
    params: {
        locale: string;
    }
    searchParams: {
        course?: string;
    }
};

export default async function Page({
    params: { locale },
    searchParams,
}: Readonly<Props>) {
    const [lessons, lessonsArmenian] = await Promise.all([
        getSelectOptions(locale),
        getSelectOptions('am'),
    ]);

    if (!lessons || !lessonsArmenian) {
        notFound()
    }

    return (
        <Home
            lessons={lessons}
            lessonsArmenian={lessonsArmenian}
            selectedSlug={searchParams.course}
        />
    )
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    return buildSectionPageMetadata({
        query: SITE_META_QUERY,
        locale,
        path: `/${locale}${Pages.DESIGN_START_LEARNING}`,
        navigationKey: 'start-learning',
    });
};
