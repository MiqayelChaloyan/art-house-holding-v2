'use client'

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { LuArrowUpRight } from 'react-icons/lu';
import { useDispatch } from 'react-redux';

import { openModal } from '@/src/store/modal_reducer';

import NextImage from '@/src/components/components/image';
import LocalSwitcher from '@/src/components/components/local-switcher';

import { Inter } from '@/src/constants/font';
import { Pages } from '@/src/constants/pages';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    socialData: CONTACT_US_DESIGN_QUERYResult;
};

const navigationLinks = [
    { path: Pages.DESIGN_ABOUT, label: 'about' },
    { path: Pages.DESIGN_HOME, hash: '#design-courses', label: 'courses' },
    { path: Pages.DESIGN_BLOG_HOME, label: 'blog' },
    { path: Pages.DESIGN_PORTFOLIOS, label: 'portfolios' },
    { path: Pages.DESIGN_CONTACT, label: 'contact' },
];

const preferredSocial = ['instagram', 'behance', 'linkedin'];

const legalLinks = [
    { path: Pages.DESIGN_PRIVACY, label: 'privacy' },
    { path: Pages.DESIGN_TERMS, label: 'terms' },
    { path: Pages.DESIGN_IMPRINT, label: 'imprint' },
];

const Footer = ({ socialData }: Readonly<Props>) => {
    const locale = useLocale();
    const t = useTranslations();
    const dispatch = useDispatch();
    const year = new Date().getFullYear();
    const address = socialData?.address || t('address.address');
    const mapsQuery = encodeURIComponent(address);
    const logo = socialData?.logo ? urlForImage(socialData.logo, 240) : undefined;
    const brandName = [socialData?.brand_line_1, socialData?.brand_line_2].filter(Boolean).join(' ') || 'Art House';

    const socials = (socialData?.social_links || [])
        .filter((host) => preferredSocial.includes(host.social_name?.toLowerCase()))
        .sort((a, b) => preferredSocial.indexOf(a.social_name.toLowerCase()) - preferredSocial.indexOf(b.social_name.toLowerCase()));

    return (
        <footer id="site-footer" className={cn(styles.footer, Inter.className)}>
            <div className={styles.wrap}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <Link href={`/${locale}${Pages.DESIGN_HOME}`} className={styles.logo} aria-label={brandName}>
                            {logo?.src && (
                            <NextImage
                                src={logo.src}
                                alt={socialData?.logo?.alt || brandName}
                                className={styles.logoImage}
                                width={logo.width}
                                height={logo.height}
                            />
                            )}
                        </Link>
                        {socialData?.tagline && (
                        <p className={styles.tagline}>{socialData.tagline}</p>
                        )}
                        <button
                            type="button"
                            className={styles.cta}
                            onClick={() => dispatch(openModal(true))}
                        >
                            <span>{t('buttons.start-learning')}</span>
                            <LuArrowUpRight aria-hidden />
                        </button>
                    </div>

                    <nav className={styles.col} aria-label={t('footer-design.navigate')}>
                        <p className={styles.label}>{t('footer-design.navigate')}</p>
                        <ul className={styles.links}>
                            {navigationLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={`/${locale}${link.path}${link.hash ?? ''}`}>
                                        {t(`navigation.${link.label}`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className={styles.col}>
                        <p className={styles.label}>{t('footer-design.social')}</p>
                        <ul className={styles.links}>
                            {socials.map((host) => (
                                <li key={host._key}>
                                    <Link href={host.social_link} target="_blank" rel="noreferrer">
                                        {host.social_name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.maps}>
                            <Link href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`} target="_blank" rel="noreferrer">
                                <span className={styles.mapMark}>G</span>
                                Google
                            </Link>
                            <Link href={`https://yandex.com/maps/?text=${mapsQuery}`} target="_blank" rel="noreferrer">
                                Yandex
                            </Link>
                            <Link href={`https://2gis.am/yerevan/search/${mapsQuery}`} target="_blank" rel="noreferrer">
                                <span className={styles.mapMark}>2</span>
                                GIS
                            </Link>
                        </div>
                    </div>

                    <div className={styles.col}>
                        <p className={styles.label}>{t('footer-design.contact')}</p>
                        <ul className={styles.links}>
                            {socialData?.email && (
                                <li>
                                    <Link href={`mailto:${socialData.email}`}>{socialData.email}</Link>
                                </li>
                            )}
                            {(socialData?.phone_numbers || []).map((number) => (
                                <li key={number}>
                                    <Link href={`tel:${number.replace(/\s/g, '')}`}>{number}</Link>
                                </li>
                            ))}
                            {address && <li className={styles.address}>{address}</li>}
                        </ul>
                        <div className={styles.langs}>
                            <LocalSwitcher
                                variant="codes"
                                activeColor={colors.white}
                                color="rgba(255, 255, 255, 0.55)"
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {year}{socialData?.brand_line_1 ? ` ${socialData.brand_line_1}` : ''}. {t('texts.rights')}.</p>
                    <div className={styles.legal}>
                        {legalLinks.map((link) => (
                            <Link key={link.label} href={`/${locale}${link.path}`}>
                                {t(`footer-design.${link.label}`)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
