'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Home from '@/src/components/screens/design/order';

import { Locale } from '@/src/locales';

import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { generateMetadataDynamic } from '@/src/utils/default-metadata';
import { getCourseBySlug } from '@/src/utils/data/design';


interface Props {
    params: {
        locale: string;
        courseName: string;
    }
};

export default async function Page({
    params: { locale, courseName }
}: Readonly<Props>) {
    const decodedQuery = decodeURIComponent(courseName[0]);
    const course = await getCourseBySlug(locale, decodedQuery);

    if (!course) {
        notFound()
    }

    return (<Home data={course} />);
};


export async function generateMetadata({
    params: { locale, courseName },
}: {
    params: { locale: Locale, courseName: string };
}): Promise<Metadata> {
    const decodedQuery = decodeURIComponent(courseName[0]);
    const data = await getCourseBySlug(locale, decodedQuery);

    if (!data) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: 'navigation' });
    // Distinguishes this page from /design/portfolios/<slug>, which describes the same course.
    const ogTitle = `${data.course_name} | ${data.orders[0]?.author} | ${t('orders')}`;
    const ogImage = data.orders[0]?.image;
    const ogDescription = data?.guides[0];

    const path: ImagePath = urlForImage(ogImage);
    const icon = null;
    const keywords = null;

    const slugPath = Array.isArray(courseName)
        ? courseName.map(decodeURIComponent).join('/')
        : decodeURIComponent(courseName);
    const metadata = generateMetadataDynamic(
        ogDescription,
        ogTitle,
        path,
        icon,
        locale,
        keywords,
        `/${locale}/design/orders/${slugPath}`,
    );
    return metadata;
};