'use client'

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LuArrowUpRight } from 'react-icons/lu';

import { useDispatch } from 'react-redux';
import { openModal } from '@/src/store/modal_reducer';

import { Pages } from '@/src/constants/pages';
import { Inter } from '@/src/constants/font';
import { ImagePaths } from '@/src/constants';

import LocalSwitcher from '@/src/components/components/local-switcher';
import NextImage from '@/src/components/components/image';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface IHeaderProps {
    typePosition: string;
    locale: string;
};

const navigationLinks = [
    { path: Pages.DESIGN_ABOUT, label: 'about' },
    { path: Pages.DESIGN_COURSES, label: 'courses' },
    { path: Pages.DESIGN_BLOG_HOME, label: 'blog' },
    { path: Pages.DESIGN_PORTFOLIOS, label: 'portfolios' },
    { path: Pages.DESIGN_CONTACT, label: 'contact' },
];

const Header = ({ typePosition, locale }: Readonly<IHeaderProps>) => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const t = useTranslations();
    const pathname = usePathname();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenuClick = () => setIsOpenMenu(!isOpenMenu);

    const handleSubmit = () => {
        setIsOpenMenu(false);
        setTimeout(() => dispatch(openModal(true)), 500);
    };

    const homePath = `/${locale}${Pages.DESIGN_HOME}`;

    return (
        <header className={cn(
            styles.box,
            Inter.className,
            typePosition === 'fixed' ? styles.boxFixed : '',
            isSticky ? styles.boxScrolled : '',
            isOpenMenu ? styles.boxOpenMenu : ''
        )}>
            <div className={styles.wrap}>
                <Link
                    href={homePath}
                    aria-label="Art House Design Studio"
                    className={styles.brand}
                >
                    <span className={styles.logoMark}>
                        <NextImage
                            src={ImagePaths.DESIGN.logoURL}
                            alt="Art House Design Studio"
                            className={styles.logoImage}
                            width={120}
                            height={120}
                            priority
                        />
                    </span>
                    <span className={styles.brandText}>
                        <span>ART HOUSE</span>
                        <span>DESIGN STUDIO</span>
                    </span>
                </Link>
                <div className={cn(
                    styles.content,
                    isOpenMenu ? styles.contentShow : '',
                )}>
                    <nav className={styles.nav} aria-label="Design studio">
                        {navigationLinks.map((link) => {
                            const href = `/${locale}${link.path}`;
                            const isActive = pathname === href;

                            return (
                                <Link
                                    key={link.label}
                                    href={href}
                                    aria-label={link.label}
                                    className={cn(styles.link, isActive ? styles.linkActive : '')}
                                    prefetch={true}
                                    onClick={() => setIsOpenMenu(false)}
                                >
                                    {link.label === 'about' && locale === 'en'
                                        ? 'About'
                                        : t(`navigation.${link.label}`)}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className={styles.actions}>
                        <div className={styles.langs}>
                            <LocalSwitcher
                                variant="codes"
                                activeColor={colors.white}
                                color="#d9d9d9"
                            />
                        </div>
                        <button
                            type="button"
                            className={styles.cta}
                            onClick={handleSubmit}
                        >
                            <span>{t('buttons.start-learning')}</span>
                            <LuArrowUpRight className={styles.ctaIcon} aria-hidden />
                        </button>
                    </div>
                </div>
                <button
                    type="button"
                    className={cn(
                        styles.menuBtn,
                        isOpenMenu ? styles.menuBtnActive : '',
                    )}
                    onClick={toggleMenuClick}
                    aria-expanded={isOpenMenu}
                    aria-label="Open menu"
                >
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
