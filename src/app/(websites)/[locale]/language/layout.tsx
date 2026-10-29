'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import ScrollToTopButton from '@/src/lib/outlets/general/ScrollToTopButton';
import ContactUs from '@/src/lib/outlets/language/ContactUs';
import Footer from '@/src/lib/outlets/language/Footer';
import Header from '@/src/lib/outlets/language/Header';
import PlayerModal from '@/src/lib/outlets/general/PlayerModal';
import FloatingMenu from '@/src/lib/outlets/general/FloatingMenu';
import GoBack from '@/src/lib/outlets/general/GoBack';

import colors from '@/src/themes';

import { Locale } from '@/src/locales';

import { SITE_META_QUERY } from '@/sanity/services/language-service';

import { getHomeDetails } from '@/src/utils/data/art-house';
import { getContacts, getSelectOptions, getSelectOptionsFiltered } from '@/src/utils/data/language';
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
    am: 'լեզվի կենտրոն',
    ru: 'языковой центр',
    en: 'language center'
};

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    const [courses, languages, contacts, branches] = await Promise.all([
        getSelectOptions(locale),
        getSelectOptionsFiltered(locale),
        getContacts(locale),
        getHomeDetails(locale),
    ]);

    if (!courses || !branches || !languages || !contacts) {
        notFound()
    };

    return (
        <div className='languages-container'>
            <div className='wrapper-content'>
                <Header locale={locale} />
                <GoBack locale={locale} theme={colors.blue} />
                <ScrollToTopButton theme={colors.blue} />
                <FloatingMenu
                    website={localeStrings[locale]}
                    branches={branches}
                    theme={colors.blue}
                    hover={colors.yellow}
                />
                <main className='languages-main'>
                    {children}
                </main>
            </div>
            <PlayerModal />
            <ContactUs
                courses={courses?.course_name}
                languages={languages}
                socialData={contacts}
            />
            <Footer socialData={contacts} />
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