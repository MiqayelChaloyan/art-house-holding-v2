'use client';

import Link from 'next/link';

import { LuArrowUpRight } from 'react-icons/lu';

import { designFont } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';
import { Pages } from '@/src/constants/pages';

import cn from 'classnames';

import styles from './styles.module.sass';


export interface NotFoundCopy {
    eyebrow: string;
    line1: string;
    line2: string;
    description: string;
    home: string;
    explore: string;
    design: string;
    language: string;
    educational: string;
};

interface Props {
    locale: string;
    copy: NotFoundCopy;
};

const NotFoundView = ({ locale, copy }: Readonly<Props>) => {
    const homeHref = `/${locale}${Pages.HOME}`;

    const sites = [
        { href: `/${locale}${Pages.DESIGN_HOME}`, label: copy.design },
        { href: `/${locale}${Pages.LANGUAGE_HOME}`, label: copy.language },
        { href: `/${locale}${Pages.EDUCATIONAL_HOME}`, label: copy.educational },
    ];

    return (
        <main className={cn(styles.page, designFont.ui)} data-not-found-page>
            <div className={styles.glow} aria-hidden />
            <div className={styles.wrap}>
                <p className={styles.code} aria-hidden>
                    404
                </p>
                <p className={styles.eyebrow}>
                    <span className={styles.mark} aria-hidden />
                    {copy.eyebrow}
                </p>
                <h1 className={cn(styles.headline, designFont.serif)}>
                    <span>{keepWords(copy.line1)}</span>
                    <span className={styles.emphasis}>{keepWords(copy.line2)}</span>
                </h1>
                <p className={styles.description}>{copy.description}</p>
                <div className={styles.actions}>
                    <Link href={homeHref} className={styles.primary}>
                        <span>{copy.home}</span>
                        <LuArrowUpRight aria-hidden />
                    </Link>
                </div>
                <div className={styles.explore}>
                    <p className={styles.exploreLabel}>{copy.explore}</p>
                    <nav className={styles.siteLinks} aria-label={copy.explore}>
                        {sites.map(({ href, label }) => (
                            <Link key={href} href={href} className={styles.siteLink}>
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </main>
    );
};

export default NotFoundView;
