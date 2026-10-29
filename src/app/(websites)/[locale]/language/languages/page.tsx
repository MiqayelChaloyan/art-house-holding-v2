'use server'

import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { type Metadata } from 'next';

import { Locale } from '@/src/locales';
import { Pages } from '@/src/constants/pages';
import { SITE_META_QUERY } from '@/sanity/services/language-service';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';
import { getCourses } from '@/src/utils/data/language';


const Component = dynamic(() =>
    import('@/src/components/screens/language/languages'),
);

interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const languages = await getCourses(locale);

    if (!languages) {
        notFound()
    }

    return (<Component locale={locale} data={languages} />);
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    return buildSectionPageMetadata({
        query: SITE_META_QUERY,
        locale,
        path: `/${locale}${Pages.LANGUAGE_LANGUAGES}`,
        navigationKey: 'languages',
    });
};

