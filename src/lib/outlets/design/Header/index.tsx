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

import LocalSwitcher from '@/src/components/components/local-switcher';
import NextImage from '@/src/components/components/image';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface IHeaderProps {
    typePosition: string;
    locale: string;
    brand?: CONTACT_US_DESIGN_QUERYResult;
};

const navigationLinks = [
    { path: Pages.DESIGN_ABOUT, label: 'about' },
    { path: Pages.DESIGN_COURSES, label: 'courses' },
    { path: Pages.DESIGN_BLOG_HOME, label: 'blog' },
    { path: Pages.DESIGN_PORTFOLIOS, label: 'portfolios' },
    { path: Pages.DESIGN_CONTACT, label: 'contact' },
];

const Header = ({ typePosition, locale, brand }: Readonly<IHeaderProps>) => {
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
    const logo = brand?.logo ? urlForImage(brand.logo, 240) : undefined;
    const brandLine1 = brand?.brand_line_1 || '';
    const brandLine2 = brand?.brand_line_2 || '';
    const brandName = [brandLine1, brandLine2].filter(Boolean).join(' ') || 'Art House';

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
                    aria-label={brandName}
                    className={styles.brand}
                >
                    {logo?.src && (
                    <span className={styles.logoMark}>
                        <NextImage
                            src={logo.src}
                            alt={brand?.logo?.alt || brandName}
                            className={styles.logoImage}
                            width={logo.width}
                            height={logo.height}
                            priority
                        />
                    </span>
                    )}
                    {(brandLine1 || brandLine2) && (
                    <span className={styles.brandText}>
                        {brandLine1 && <span>{brandLine1}</span>}
                        {brandLine2 && <span>{brandLine2}</span>}
                    </span>
                    )}
                </Link>
                <div className={cn(
                    styles.content,
                    isOpenMenu ? styles.contentShow : '',
                )}>
                    <nav className={styles.nav} aria-label="Design studio">
                        {navigationLinks.map((link) => {
                            const href = `/${locale}${link.path}`;
                            const isActive = pathname === href || pathname.startsWith(`${href}/`);

                            return (
                                <Link
                                    key={link.label}
                                    href={href}
                                    aria-label={link.label}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={cn(styles.link, isActive ? styles.linkActive : '')}
                                    prefetch={true}
                                    onClick={() => setIsOpenMenu(false)}
                                >
                                    {t(`navigation.${link.label}`)}
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
