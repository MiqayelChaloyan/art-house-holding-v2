'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Footer from '@/src/lib/outlets/design/Footer';
import Header from '@/src/lib/outlets/design/Header';
import ScrollToTopButton from '@/src/lib/outlets/general/ScrollToTopButton';
import FloatingMenu from '@/src/lib/outlets/general/FloatingMenu';
import PlayerModal from '@/src/lib/outlets/general/PlayerModal';
import GoBack from '@/src/lib/outlets/general/GoBack';

import { designFont } from '@/src/constants/font';
import colors from '@/src/themes';

import { Locale } from '@/src/locales';

import { SITE_META_QUERY } from '@/sanity/services/design-service';

import { getHomeDetails } from '@/src/utils/data/art-house';
import { getContacts } from '@/src/utils/data/design';
import { buildSiteMetadata, fetchSiteMetaEntry } from '@/src/utils/site-meta';


interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    };
};

const localeStrings: {
    am: string;
    ru: string;
    en: string;
    [key: string]: string;
} = {
    am: 'դիզայն ստուդիա',
    ru: 'студия дизайна',
    en: 'design studio'
};

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    const [contacts, branches] = await Promise.all([
        getContacts(locale),
        getHomeDetails(locale),
    ]);

    if (!branches || !contacts) {
        notFound()
    };

    return (
        <div className={`${designFont.vars} ${designFont.ui}`}>
            <Header typePosition='fixed' locale={locale} brand={contacts} />
            <div className='design-container'>
                <GoBack locale={locale} theme={colors.studioRed} />
                <ScrollToTopButton theme={colors.studioRed} />
                <FloatingMenu
                    website={localeStrings[locale]}
                    branches={branches}
                    theme={colors.studioRed}
                    hover={colors.studioRedDark}
                />
                {children}
                <Footer socialData={contacts} />
            </div>
            <PlayerModal />
        </div>
    );
};


export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const meta = await fetchSiteMetaEntry(SITE_META_QUERY, locale, 0);
    return buildSiteMetadata(meta, locale);
};