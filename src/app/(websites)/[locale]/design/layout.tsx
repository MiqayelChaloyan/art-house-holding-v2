'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Footer from '@/src/lib/outlets/design/Footer';
import Header from '@/src/lib/outlets/design/Header';
import ScrollToTopButton from '@/src/lib/outlets/general/ScrollToTopButton';
import FloatingMenu from '@/src/lib/outlets/general/FloatingMenu';
import Modal from '@/src/lib/outlets/design/Modal';
import CoursesModal from '@/src/lib/outlets/design/Modal/courses';
import ContactUs from '@/src/lib/outlets/design/ContactUs';
import PlayerModal from '@/src/lib/outlets/general/PlayerModal';
import GoBack from '@/src/lib/outlets/general/GoBack';

import colors from '@/src/themes';

import { Locale } from '@/src/locales';

import { SITE_META_QUERY } from '@/sanity/services/design-service';

import { getHomeDetails } from '@/src/utils/data/art-house';
import { getContacts, getCourses, getSelectOptions } from '@/src/utils/data/design';
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
    const [courses, contacts, lessons, lessonsArmenianKeyword, branches] = await Promise.all([
        getCourses(locale),
        getContacts(locale),
        getSelectOptions(locale),
        getSelectOptions('am'),
        getHomeDetails(locale),
    ]);

    if (!branches || !courses || !contacts || !lessons || !lessonsArmenianKeyword) {
        notFound()
    };

    return (
        <>
            <Header typePosition='fixed' locale={locale} />
            <div className='design-container'>
                <GoBack locale={locale} theme={colors.darkChestnut} />
                <ScrollToTopButton theme={colors.darkChestnut} />
                <FloatingMenu
                    website={localeStrings[locale]}
                    branches={branches}
                    theme={colors.darkChestnut}
                    hover={colors.brown}
                />
                {children}
                <ContactUs lessons={lessons} lessonsArmenian={lessonsArmenianKeyword} />
                <Footer socialData={contacts} />
            </div>
            <Modal>
                <CoursesModal courses={courses} />
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