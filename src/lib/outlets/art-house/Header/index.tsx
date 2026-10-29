'use client';

import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

import LocalSwitcher from '@/src/components/components/local-switcher';

import Logo from '@/src/lib/icons/art-house/Logo';
import { Pages } from '@/src/constants/pages';
import { ArianAMU } from '@/src/constants/font';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface IHeaderProps {
    locale: string;
    typePosition: string;
    linkActive: string;
    handleChangeActiveLink: (link: string) => void;
};

const scrollLinks = [
    { to: 'main', label: 'main' },
    { to: 'partners', label: 'partners' }
];

const Header = ({ locale, typePosition, linkActive, handleChangeActiveLink }: Readonly<IHeaderProps>) => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const t = useTranslations('navigation');
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);

            if (window.scrollY === 1655) {
                handleChangeActiveLink('partners')
            } else {
                handleChangeActiveLink('')
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleChangeActiveLink]);

    const toggleMenuClick = () => setIsOpenMenu(!isOpenMenu);

    const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

    const handleScrollNavClick = (sectionId: string, activeLabel: string) => {
        handleChangeActiveLink(activeLabel === 'main' ? '' : activeLabel);
        setIsOpenMenu(false);

        if (!isHomePage) {
            router.push(`/${locale}#${sectionId}`);
        }
    };


    return (
        <header className={cn(
            styles.box,
            typePosition === 'fixed' && styles.boxFixed,
            isSticky && styles.boxScrolled,
            isOpenMenu && styles.boxOpenMenu
        )}>
            <div className={cn('container', styles.wrap)}>
                <ScrollLink
                    to={scrollLinks[0].to}
                    smooth={false}
                    duration={500}
                    className={cn(styles.logo, isSticky && styles.logoSticky)}
                    onClick={() => handleScrollNavClick(scrollLinks[0].to, scrollLinks[0].label)}
                >
                    <Logo
                        width={212}
                        height={60}
                        fill={colors.black}
                    />
                </ScrollLink>
                <div className={cn(styles.content, isOpenMenu && styles.contentShow)}>
                    <div className={styles.navbar}>
                        <Link
                            href={`/${locale}/${Pages.HOME_ABOUT}`}
                            prefetch
                            className={cn(styles.link, pathname.includes(Pages.HOME_ABOUT) && styles.linkActive, ArianAMU.className)}
                            onClick={() => {
                                handleChangeActiveLink(Pages.HOME_ABOUT);
                                setIsOpenMenu(false);
                            }}
                        >
                            {t('about')}
                        </Link>
                        <ScrollLink
                            to={`${scrollLinks[1].to}`}
                            smooth={false}
                            duration={500}
                            className={cn(styles.link, linkActive === scrollLinks[1].label && styles.linkActive, ArianAMU.className)}
                            onClick={() => handleScrollNavClick(scrollLinks[1].to, scrollLinks[1].label)}
                        >
                            {t(scrollLinks[1].label)}
                        </ScrollLink>
                        <div>
                            <LocalSwitcher activeColor={colors.darkRed} color={colors.black} />
                        </div>
                    </div>
                </div>
                <button
                    className={cn(styles.menuBtn, isOpenMenu && styles.menuBtnActive)}
                    onClick={toggleMenuClick}
                    title='Art House Holding'
                >
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Header;


