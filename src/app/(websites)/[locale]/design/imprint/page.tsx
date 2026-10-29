import { type Metadata } from 'next';

import { Locale } from '@/src/locales';

import { legalPageMetadata, renderLegalPage } from '../_legal';


interface Props {
    params: {
        locale: string;
    };
};

export default async function Page({ params: { locale } }: Readonly<Props>) {
    return renderLegalPage(locale, 'imprint');
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    return legalPageMetadata(locale, 'imprint');
}
