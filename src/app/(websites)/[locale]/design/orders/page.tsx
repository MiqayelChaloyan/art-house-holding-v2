'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/src/components/screens/design/orders';

import { Locale } from '@/src/locales';

import { SITE_META_QUERY } from '@/sanity/services/design-service';

import { Pages } from '@/src/constants/pages';
import { getCourses, getSelectOptions } from '@/src/utils/data/design';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const courses = await getCourses(locale);
    const lessons = await getSelectOptions(locale);
    const lessonsArmenianKeyword = await getSelectOptions('am');

    if (!lessons || !lessonsArmenianKeyword || !courses) {
        notFound()
    }

    return (
        <Home
            orders={lessons.order_name}
            ordersArmenian={lessonsArmenianKeyword.order_name}
            courses={courses}
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
        path: `/${locale}${Pages.DESIGN_ORDERS}`,
        navigationKey: 'orders',
    });
};