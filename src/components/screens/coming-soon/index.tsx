'use client'

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { LuArrowUpRight } from 'react-icons/lu';
import { TiSocialFacebook } from 'react-icons/ti';
import { BsInstagram, BsBehance } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';

import Logo from '@/src/lib/icons/art-house/LogoFooter';
import Copyright from '@/src/components/components/copyright';
import { keepWords } from '@/src/components/screens/design/keepWords';
import { splitTitlePeriod, TitlePeriod } from '@/src/components/screens/design/titlePeriod';

import { Pages } from '@/src/constants/pages';
import { designFont } from '@/src/constants/font';

import { socialNetwork } from '@/src/types/coming-soon';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: SOCIAL_QUERYResult;
};

const socialNetworkComponents: socialNetwork = {
    facebook: TiSocialFacebook,
    instagram: BsInstagram,
    gmail: SiGmail,
    linkedin: FaLinkedinIn,
    behance: BsBehance,
};

const ComingSoon = ({ data }: Readonly<Props>) => {
    const locale = useLocale();
    const t = useTranslations('coming-soon-page');

    const homeHref = `/${locale}${Pages.HOME}`;
    const { body: line2, period } = splitTitlePeriod(t('line-2'));
    const badge = t('badge').repeat(2);

    const sites = [
        { href: `/${locale}${Pages.DESIGN_HOME}`, label: t('design') },
        { href: `/${locale}${Pages.LANGUAGE_HOME}`, label: t('language') },
        { href: `/${locale}${Pages.EDUCATIONAL_HOME}`, label: t('educational') },
    ];

    const hosts = data?.social_links.map((host: SOCIAL_LINK) => {
        const socialName = host?.social_name.toLowerCase();
        const link = socialName === 'gmail' ? `mailto:${host?.social_link}` : host?.social_link;
        const SocialIcon = (socialNetworkComponents as any)[socialName];
        if (!SocialIcon) return null;

        return (
            <Link
                key={host._key}
                href={link}
                aria-label={host?.social_name}
                className={styles.social}
                target="_blank"
                rel="noopener noreferrer"
            >
                <SocialIcon aria-hidden />
            </Link>
        );
    });

    return (
        <main className={cn(styles.page, designFont.vars, designFont.ui)}>
            <div className={styles.grid} aria-hidden />
            <div className={styles.glow} aria-hidden />

            <header className={cn(styles.top, styles.wrap)}>
                <Link href={homeHref} aria-label="Art House" className={styles.logo}>
                    <Logo width={150} height={41} fill="#ffffff" />
                </Link>
                <span className={styles.status}>
                    <span className={styles.pulse} aria-hidden />
                    {t('status')}
                </span>
            </header>

            <section className={cn(styles.hero, styles.wrap)}>
                <div className={styles.content}>
                    <p className={cn(styles.eyebrow, styles.reveal)}>
                        <span className={styles.mark} aria-hidden />
                        {t('eyebrow')}
                    </p>
                    <h1 className={cn(styles.headline, designFont.serif)}>
                        <span className={styles.reveal}>{keepWords(t('line-1'))}</span>
                        <span className={cn(styles.emphasis, styles.reveal)}>
                            {keepWords(line2)}
                            <TitlePeriod mark={period} />
                        </span>
                    </h1>
                    <p className={cn(styles.description, styles.reveal)}>{t('description')}</p>
                    <div className={cn(styles.progress, styles.reveal)} aria-hidden>
                        <span />
                    </div>
                    <div className={cn(styles.actions, styles.reveal)}>
                        <Link href={homeHref} className={styles.primary}>
                            <span>{t('home')}</span>
                            <LuArrowUpRight aria-hidden />
                        </Link>
                        {hosts?.some(Boolean) && (
                            <div className={styles.follow}>
                                <span className={styles.followLabel}>{t('follow')}</span>
                                <div className={styles.socials}>{hosts}</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.badge} aria-hidden>
                    <svg viewBox="0 0 200 200" className={styles.badgeRing}>
                        <defs>
                            <path id="coming-soon-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                        </defs>
                        <text>
                            <textPath href="#coming-soon-circle" textLength="488">
                                {badge}
                            </textPath>
                        </text>
                    </svg>
                    <span className={styles.badgeCore}>
                        <LuArrowUpRight />
                    </span>
                </div>
            </section>

            <footer className={cn(styles.bottom, styles.wrap)}>
                <nav className={styles.sites} aria-label={t('explore')}>
                    <span className={styles.sitesLabel}>{t('explore')}</span>
                    <div className={styles.siteLinks}>
                        {sites.map(({ href, label }) => (
                            <Link key={href} href={href} className={styles.siteLink}>
                                {label}
                            </Link>
                        ))}
                    </div>
                </nav>
                <Copyright className={styles.copyright} />
            </footer>
        </main>
    );
};

export default ComingSoon;
