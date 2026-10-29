import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import About from '@/src/components/screens/design/about';

import { Locale } from '@/src/locales';
import { Pages } from '@/src/constants/pages';
import { SITE_META_QUERY } from '@/sanity/services/design-service';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';
import { getAboutPage, getHomeDetails } from '@/src/utils/data/design';


interface Props {
    params: {
        locale: string;
    };
};

export default async function Page({ params: { locale } }: Readonly<Props>) {
    const [data, home] = await Promise.all([
        getAboutPage(locale),
        getHomeDetails(locale),
    ]);

    if (!data?.line_1) {
        notFound();
    }

    return <About data={data} clients={home?.clients} />;
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    return buildSectionPageMetadata({
        query: SITE_META_QUERY,
        locale,
        path: `/${locale}${Pages.DESIGN_ABOUT}`,
        navigationKey: 'about',
    });
}
