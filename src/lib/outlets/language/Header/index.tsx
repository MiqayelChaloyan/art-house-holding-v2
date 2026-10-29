'use client'

import React, { memo, useEffect, useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { useDispatch } from 'react-redux';
import * as Action from '@/src/store/question_reducer'

import LocalSwitcher from '@/src/components/components/local-switcher';

import useWindowSize from '@/src/hooks/useWindowSize';

import { Pages } from '@/src/constants/pages';
import { Arial } from '@/src/constants/font';
import Logo from '@/src/lib/icons/language/Logo';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface IHeaderProps {
    locale: string;
};

interface StickyBoundaryProps {
    children: JSX.Element[];
    sticky: boolean;
};

interface HeaderProps {
    children: JSX.Element[];
};

const navigationLinks = [
    { path: Pages.LANGUAGE_HOME, label: 'about' },
    { path: Pages.LANGUAGE_BLOG_HOME, label: 'blog' },
    { path: Pages.LANGUAGE_LANGUAGES, label: 'languages' },
    { path: Pages.LANGUAGE_PROMOTIONS, label: 'promotions' },
    { path: Pages.LANGUAGE_PRICE_LIST, label: 'price-list' },
    { path: Pages.LANGUAGE_PARTNERS, label: 'partners' },
    { path: Pages.LANGUAGE_SEND_REQUEST, label: 'send-request' },
    { path: Pages.LANGUAGE_TAKE_TEST, label: 'take-the-test' }
];

const StickyBoundary = ({ children, sticky }: StickyBoundaryProps) => (
    <div className={`${styles.boundary} ${sticky ? styles.isSticky : ''}`}>{children}</div>
);

const HeaderBoundary = ({ children }: HeaderProps) => (
    <header className={styles.header}>{children}</header>
);

const Header = ({ locale }: IHeaderProps) => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    const pathname = usePathname();
    const windowSize = useWindowSize();
    const t = useTranslations()
    const dispatch = useDispatch();
    const isBlogPage = /\/language\/blog(?:\/|$)/.test(pathname);
    const navSticky = isBlogPage || isSticky;

    useEffect(() => {
        const handleScroll = () => {
            const winTop = window.scrollY;
            if (winTop >= 30) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (windowSize.width > 600) setIsOpenMenu(false)
    }, [windowSize.width])

    const toggleMenuClick = () => setIsOpenMenu(!isOpenMenu);


    return (
        <div className={cn(
            styles.container,
            navSticky ? styles.stickyContainer : '',
            isBlogPage ? styles.blogCompact : '',
        )}>
            <HeaderBoundary>
                <div className={styles.requests}>
                    <div className={styles.send_request}>
                        <Link
                            href={`/${locale}${Pages.LANGUAGE_SEND_REQUEST}`}
                            aria-label={Pages.LANGUAGE_SEND_REQUEST}
                            className={cn(styles.triangle_text, Arial.className)}
                            onClick={() => undefined}
                        >
                            {t("texts.send-request")}
                        </Link>
                    </div>
                    <div className={styles.take_test}>
                        <Link
                            href={`/${locale}${Pages.LANGUAGE_TAKE_TEST}`}
                            aria-label={Pages.LANGUAGE_TAKE_TEST}
                            className={cn(styles.triangle_text, Arial.className)}
                            onClick={() => {
                                dispatch(Action.resetAllAction());
                            }}
                        >
                            {t("texts.take-the-test")}
                        </Link>
                    </div>
                </div>
                <div className={styles.logo}>
                    <Logo width={windowSize.width < 1280 ? 150 : 255.53} height={80} fill={colors.yellow} />
                </div>
                <div className={styles.switcher}>
                    <LocalSwitcher activeColor={colors.yellow} color={colors.blue} />
                </div>
            </HeaderBoundary>
            <StickyBoundary sticky={navSticky}>
                <nav className={cn(
                    styles.nav,
                    isOpenMenu ? styles.active : ''
                )}>
                    {(windowSize.width < 600 ? navigationLinks : navigationLinks.slice(0, 5)).map((link, key) => (
                        <Link
                            key={key}
                            href={`/${locale}${link.path}`}
                            aria-label={link.path}
                            className={cn(styles.link, pathname === `/${locale}${link.path}` ? styles.linkActive : '', navSticky ? styles.scrollX : styles.scrollY, Arial.className)}
                            prefetch={true}
                            passHref
                            onClick={() => {
                                setIsOpenMenu(false);
                                dispatch(Action.resetAllAction())
                            }}
                        >
                            {t(`navigation.${link.label}`)}
                        </Link>
                    ))}
                    <div className={styles.mobile}>
                        <div className={styles.mobile_switcher}>
                            <LocalSwitcher activeColor={colors.yellow} color={colors.white} />
                        </div>
                        <Logo width={150} height={80} fill={colors.white} />
                    </div>
                </nav>
                <div className={styles.menuMobile}>
                    <button
                        className={cn(
                            styles.menuBtn,
                            isOpenMenu ? styles.menuBtnActive : '',
                        )}
                        onClick={toggleMenuClick}
                        title='Language'
                    ><span></span></button>
                </div>
            </StickyBoundary>
        </div>
    )
}

export default memo(Header);


