'use client'

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { LuArrowUpRight } from 'react-icons/lu';

import NextImage from '@/src/components/components/image';
import LocalSwitcher from '@/src/components/components/local-switcher';

import { designFont } from '@/src/constants/font';
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

const legalLinks = [
    { path: Pages.DESIGN_PRIVACY, label: 'privacy' },
    { path: Pages.DESIGN_TERMS, label: 'terms' },
    { path: Pages.DESIGN_IMPRINT, label: 'imprint' },
];

const Footer = ({ socialData }: Readonly<Props>) => {
    const locale = useLocale();
    const t = useTranslations();
    const footerT = useTranslations('footer-design');
    const year = new Date().getFullYear();
    const address = socialData?.address || t('address.address');
    const mapsQuery = encodeURIComponent(address);
    const logo = socialData?.logo ? urlForImage(socialData.logo, 240) : undefined;
    const brandName = [socialData?.brand_line_1, socialData?.brand_line_2].filter(Boolean).join(' ') || 'Art House';
    const taglineLines = [
        footerT('tagline-line-1'),
        footerT('tagline-line-2'),
        footerT('tagline-line-3'),
    ];

    const socials = (socialData?.social_links || [])
        .filter((host) => host.social_name && host.social_link)
        .map((host) => {
            const name = host.social_name.toLowerCase();
            const value = host.social_link.trim();
            const href = name === 'gmail' || (value.includes('@') && !/^https?:\/\//i.test(value))
                ? (value.startsWith('mailto:') ? value : `mailto:${value}`)
                : value;

            return { ...host, href };
        });

    const maps = (socialData?.map_links || []).filter((item) => item.name && item.link);
    const fallbackMaps: MAP_LINK[] = [
        { _key: 'google', name: 'Google', link: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}` },
        { _key: 'yandex', name: 'Yandex', link: `https://yandex.com/maps/?text=${mapsQuery}` },
        { _key: 'gis', name: '2GIS', link: `https://2gis.am/yerevan/search/${mapsQuery}` },
    ];
    const mapItems = (maps.length ? maps : fallbackMaps).slice(0, 10);
    const mapsGrid = mapItems.length > 3;

    return (
        <footer id="site-footer" className={cn(styles.footer, designFont.ui)}>
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
                        <p className={styles.tagline}>
                            {taglineLines.map((line, index) => (
                                <span key={index}>{line}</span>
                            ))}
                        </p>
                        <Link href={`/${locale}${Pages.DESIGN_START_LEARNING}`} className={styles.cta}>
                            <span>{t('buttons.start-learning')}</span>
                            <LuArrowUpRight aria-hidden />
                        </Link>
                    </div>

                    <div className={styles.linkCols}>
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
                                        <Link href={host.href} target="_blank" rel="noreferrer">
                                            {host.social_name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className={cn(styles.maps, mapsGrid && styles.mapsGrid)}>
                                {mapItems.map((item) => {
                                    const mark = item.image ? urlForImage(item.image, 96) : undefined;

                                    return (
                                        <Link key={item._key} href={item.link} target="_blank" rel="noreferrer">
                                            {mark?.src ? (
                                                <NextImage
                                                    src={mark.src}
                                                    alt={item.image?.alt || item.name}
                                                    className={styles.mapLogo}
                                                    width={mark.width}
                                                    height={mark.height}
                                                />
                                            ) : (
                                                <>
                                                    <span className={styles.mapMark}>{item.name[0]}</span>
                                                    {item.name}
                                                </>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={cn(styles.col, styles.colContact)}>
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
