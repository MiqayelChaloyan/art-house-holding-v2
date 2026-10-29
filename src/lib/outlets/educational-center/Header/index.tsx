'use client'

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl';

import { useDispatch } from 'react-redux';
import { openModal } from '@/src/store/modal_reducer';

import Logo from '@/src/lib/icons/educational-center/Logo';
import Button from '@/src/lib/ui/Button';
import { Pages } from '@/src/constants/pages';
import { ArianAMU } from '@/src/constants/font';

import LocalSwitcher from '@/src/components/components/local-switcher';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface IHeaderProps {
    typePosition: string;
    locale: string;
};

const Header = ({ typePosition, locale }: IHeaderProps) => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const t = useTranslations('navigation');
    const pathname = usePathname();

    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const toggleMenuClick = () => setIsOpenMenu(!isOpenMenu);

    const handleSubmit = () => {
        setIsOpenMenu(false);
        setTimeout(() => dispatch(openModal(true)), 500);
    };

    return (
        <header className={cn(
            styles.box,
            typePosition === 'fixed' && styles.boxFixed,
            isSticky && styles.boxScrolled,
            isOpenMenu && styles.boxOpenMenu
        )}>
            <div className={cn('container', styles.wrap)}>
                <Link
                    href={`/${locale}${Pages.EDUCATIONAL_HOME}`}
                    aria-label={Pages.EDUCATIONAL_HOME}
                    className={cn(styles.logo, isSticky && styles.logoSticky)}
                >
                    <Logo
                        width={212}
                        height={60}
                        fill={colors.black}
                    />
                </Link>
                <div className={cn(
                    styles.content,
                    isOpenMenu && styles.contentShow,
                    isSticky && isOpenMenu && styles.contentSticky,
                )}>
                    <div className={styles.nav}>
                        <Link
                            onClick={toggleMenuClick}
                            href={`/${locale}${Pages.EDUCATIONAL_HOME}`}
                            aria-label={Pages.EDUCATIONAL_HOME}
                            className={cn(styles.link, pathname === `/${locale}${Pages.EDUCATIONAL_HOME}` && styles.linkActive, ArianAMU.className)}
                        >
                            {t('about')}
                        </Link>
                        <Button
                            text={t('courses')}
                            onClick={handleSubmit}
                            className={cn(styles.btn, ArianAMU.className)}
                        />
                        <Link
                            onClick={toggleMenuClick}
                            href={`/${locale}${Pages.EDUCATIONAL_PARTNERS}`}
                            aria-label={Pages.EDUCATIONAL_PARTNERS}
                            className={cn(styles.link, pathname === `/${locale}${Pages.EDUCATIONAL_PARTNERS}` && styles.linkActive, ArianAMU.className)}
                        >
                            {t('partners')}
                        </Link>
                        <Link
                            onClick={toggleMenuClick}
                            href={`/${locale}${Pages.EDUCATIONAL_PRICE_LIST}`}
                            aria-label={Pages.EDUCATIONAL_PRICE_LIST}
                            className={cn(styles.link, pathname === `/${locale}${Pages.EDUCATIONAL_PRICE_LIST}` && styles.linkActive, ArianAMU.className)}
                        >
                            {t('price-list')}
                        </Link>
                        <Link
                            onClick={toggleMenuClick}
                            href={`/${locale}${Pages.EDUCATIONAL_BLOG_HOME}`}
                            aria-label={Pages.EDUCATIONAL_BLOG_HOME}
                            className={cn(styles.link, pathname.startsWith(`/${locale}${Pages.EDUCATIONAL_BLOG_HOME}`) && styles.linkActive, ArianAMU.className)}
                        >
                            {t('blog')}
                        </Link>
                        <div>
                            <LocalSwitcher
                                activeColor={colors.darkRed}
                                color={colors.white}
                            />
                        </div>
                    </div>
                </div>
                <button
                    className={cn(
                        styles.menuBtn,
                        isOpenMenu && styles.menuBtnActive,
                    )}
                    onClick={toggleMenuClick}
                    title='Art Training Center'
                >
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
