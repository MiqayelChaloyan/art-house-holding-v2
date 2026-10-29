'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Header from '@/src/lib/outlets/educational-center/Header';
import BottomMenu from '@/src/lib/outlets/educational-center/BottomMenu';
import RightMenu from '@/src/lib/outlets/educational-center/RightMenu';
import Footer from '@/src/lib/outlets/educational-center/Footer';
import Modal from '@/src/lib/outlets/educational-center/Modal';
import CoursesModal from '@/src/lib/outlets/educational-center/Modal/courses';
import ScrollToTopButton from '@/src/lib/outlets/general/ScrollToTopButton';
import FloatingMenu from '@/src/lib/outlets/general/FloatingMenu';
import PlayerModal from '@/src/lib/outlets/general/PlayerModal';
import GoBack from '@/src/lib/outlets/general/GoBack';

import colors from '@/src/themes';

import { Locale } from '@/src/locales';

import { SITE_META_QUERY } from '@/sanity/services/educational-center-service';

import { getContacts, getCourses, getSelectOptions } from '@/src/utils/data/educational-center';
import { getHomeDetails } from '@/src/utils/data/art-house';
import { buildSiteMetadata, fetchSiteMetaEntry } from '@/src/utils/site-meta';


interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    }
};

const localeStrings: {
    am: string;
    ru: string;
    en: string;
    [key: string]: string;
} = {
    am: 'ուսումնական կենտրոն',
    ru: 'образовательный центр',
    en: 'educational center'
};

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    const [branches, courses, contacts, lessons, lessonsArmenianKeyword] = await Promise.all([
        getHomeDetails(locale),
        getCourses(locale),
        getContacts(locale),
        getSelectOptions(locale),
        getSelectOptions('am'),
    ]);

    if (!courses || !branches || !contacts || !lessons || !lessonsArmenianKeyword) {
        notFound()
    };

    return (
        <>
            <GoBack locale={locale} theme={colors.red} />
            <RightMenu locale={locale} socialData={contacts} />
            <BottomMenu locale={locale} socialData={contacts} />
            <ScrollToTopButton theme={colors.red}  />
            <FloatingMenu
                website={localeStrings[locale]}
                branches={branches}
                theme={colors.red} 
                hover={colors.black}
            />
            <div>
                <Header typePosition="fixed" locale={locale} />
                <main className='wrapper-main'>
                    {children}
                </main>
                <Footer
                    courses={courses}
                    socialData={contacts}
                    lessons={lessons}
                    lessonsArmenian={lessonsArmenianKeyword}
                />
            </div>
            <Modal>
                <CoursesModal
                    locale={locale}
                    courses={courses}
                />
            </Modal>
            <PlayerModal />
        </>
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