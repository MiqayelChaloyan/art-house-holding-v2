'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Course from '@/src/components/screens/design/course';

import { Locale } from '@/src/locales';

import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { generateMetadataDynamic } from '@/src/utils/default-metadata';
import { getCourseBySlug } from '@/src/utils/data/design';


interface Props {
    params: {
        locale: string;
        slug: string;
    }
};

export default async function Page({
    params: { locale, slug }
}: Readonly<Props>) {
    const decodedQuery = decodeURIComponent(slug[0]);
    const course = await getCourseBySlug(locale, decodedQuery);

    if (!course) {
        notFound()
    }

    return (<Course locale={locale} course={course} />
    );
};


export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale, slug: string };
}): Promise<Metadata> {
    const decodedQuery = decodeURIComponent(slug[0]);
    const data = await getCourseBySlug(locale, decodedQuery);

    if (!data) {
        notFound();
    }

    const ogTitle = data.name;
    const ogImage = data?.ogImage;
    const ogDescription = data?.ogDescription;
    const keywords = data?.keywords;

    const path: ImagePath = urlForImage(ogImage);
    const icon = null;

    const slugPath = Array.isArray(slug) ? slug.map(decodeURIComponent).join('/') : decodeURIComponent(slug);
    const metadata = generateMetadataDynamic(
        ogDescription,
        ogTitle,
        path,
        icon,
        locale,
        keywords,
        `/${locale}/design/${slugPath}`,
    );
    return metadata;
};