import { Suspense } from 'react';
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

async function DesignHeader({ locale }: { locale: string }) {
    const contacts = await getContacts(locale);
    if (!contacts) notFound();
    return <Header typePosition="fixed" locale={locale} brand={contacts} />;
}

async function DesignFloating({ locale }: { locale: string }) {
    const branches = await getHomeDetails(locale);
    if (!branches) notFound();
    return (
        <FloatingMenu
            website={localeStrings[locale]}
            branches={branches}
            theme={colors.studioRed}
            hover={colors.studioRedDark}
        />
    );
}

async function DesignFooter({ locale }: { locale: string }) {
    const contacts = await getContacts(locale);
    if (!contacts) notFound();
    return <Footer socialData={contacts} />;
}

export default function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    return (
        <div className={`${designFont.vars} ${designFont.ui} designSite`}>
            <Suspense fallback={<Header typePosition="fixed" locale={locale} />}>
                <DesignHeader locale={locale} />
            </Suspense>
            <div className="design-container">
                <GoBack locale={locale} theme={colors.studioRed} />
                <ScrollToTopButton theme={colors.studioRed} />
                <Suspense fallback={null}>
                    <DesignFloating locale={locale} />
                </Suspense>
                {children}
                <Suspense fallback={null}>
                    <DesignFooter locale={locale} />
                </Suspense>
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
