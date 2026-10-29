'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/src/components/screens/design/contact';

import { Locale } from '@/src/locales';
import { Pages } from '@/src/constants/pages';
import { SITE_META_QUERY } from '@/sanity/services/design-service';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';
import { getSelectOptions } from '@/src/utils/data/design';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const lessons = await getSelectOptions(locale);
    const lessonsArmenianKeyword = await getSelectOptions('am');

    if (!lessons || !lessonsArmenianKeyword) {
        notFound()
    }

    return (<Home lessons={lessons} lessonsArmenian={lessonsArmenianKeyword}/>);
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    return buildSectionPageMetadata({
        query: SITE_META_QUERY,
        locale,
        path: `/${locale}${Pages.DESIGN_CONTACT}`,
        navigationKey: 'contact',
    });
};