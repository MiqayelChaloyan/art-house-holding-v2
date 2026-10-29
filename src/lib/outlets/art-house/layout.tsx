'use client';

import { useCallback, useState } from 'react';

import { useLocale } from 'next-intl';

import Header from '@/src/lib/outlets/art-house/Header';
import Footer from '@/src/lib/outlets/art-house/Footer';


interface Props {
    children: React.ReactNode;
    headerPosition?: 'fixed' | 'sticky';
    socialData?: SOCIAL_QUERYResult;
};

const Layout = ({
    children,
    headerPosition,
    socialData,
}: Readonly<Props>) => {
    const [linkActive, setLinkActive] = useState<string>('');
    const activeLocale = useLocale();

    const typePosition = headerPosition === 'fixed' ? 'fixed' : 'sticky';

    const handleChangeActiveLink = useCallback((link: string) => setLinkActive(link), []);

    return (
        <>
            <Header
                locale={activeLocale}
                typePosition={typePosition}
                linkActive={linkActive}
                handleChangeActiveLink={handleChangeActiveLink}
            />
            {children}
            <Footer
                locale={activeLocale}
                socialData={socialData}
                linkActive={linkActive}
                handleChangeActiveLink={handleChangeActiveLink}
            />
        </>
    );
}

export default Layout;
