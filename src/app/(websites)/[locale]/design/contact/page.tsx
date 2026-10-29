'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Contact from '@/src/components/screens/design/contact';

import { Locale } from '@/src/locales';
import { Pages } from '@/src/constants/pages';
import { SITE_META_QUERY } from '@/sanity/services/design-service';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';
import { getContacts, getSelectOptions } from '@/src/utils/data/design';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const [lessons, lessonsArmenianKeyword, contacts] = await Promise.all([
        getSelectOptions(locale),
        getSelectOptions('am'),
        getContacts(locale),
    ]);

    if (!lessons || !lessonsArmenianKeyword || !contacts) {
        notFound()
    }

    return (
        <Contact
            lessons={lessons}
            lessonsArmenian={lessonsArmenianKeyword}
            contacts={contacts}
        />
    );
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