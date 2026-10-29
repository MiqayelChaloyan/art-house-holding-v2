'use client'

import React from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu';
import { useDispatch } from 'react-redux';

import { openModal } from '@/src/store/modal_reducer';

import { InstrumentSerif, Inter } from '@/src/constants/font';
import { Pages } from '@/src/constants/pages';

import cn from 'classnames';

import styles from './styles.module.sass';


const LEGAL_LINKS: { page: LEGAL_PAGE_SLUG; path: string; label: 'privacy' | 'terms' | 'imprint' }[] = [
    { page: 'privacy', path: Pages.DESIGN_PRIVACY, label: 'privacy' },
    { page: 'terms', path: Pages.DESIGN_TERMS, label: 'terms' },
    { page: 'imprint', path: Pages.DESIGN_IMPRINT, label: 'imprint' },
];

interface Props {
    data: LEGAL_PAGE_DESIGN_QUERYResult;
    page: LEGAL_PAGE_SLUG;
};

const formatDate = (value: string | undefined, locale: string) => {
    if (!value) return '';

    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat(locale === 'am' ? 'hy-AM' : locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

const stripEnd = (value: string) => value.replace(/[.\u0589]+$/u, '');

const LegalPage = ({ data, page }: Readonly<Props>) => {
    const locale = useLocale();
    const t = useTranslations();
    const dispatch = useDispatch();
    const sections = (data.sections || []).filter((item) => item?.heading && item?.body);
    const updated = formatDate(data.updated_at, locale);
    const line2 = stripEnd(data.line_2 || '');

    return (
        <section className={cn(styles.section, Inter.className)}>
            <div className={styles.wrap}>
                <div className={styles.hero}>
                    <div className={styles.copy}>
                        <p className={styles.eyebrow}>
                            <span className={styles.mark} aria-hidden />
                            {data.eyebrow}
                        </p>
                        <h1 className={cn(styles.headline, locale === 'am' && styles.headlineAm, locale === 'ru' && styles.headlineRu, InstrumentSerif.className)}>
                            <span>{data.line_1}</span>
                            <span className={styles.emphasis}>
                                {line2}
                                <span className={styles.dot}>.</span>
                            </span>
                        </h1>
                        {data.lead && <p className={styles.lead}>{data.lead}</p>}
                        <div className={styles.actions}>
                            <button
                                type="button"
                                className={styles.primary}
                                onClick={() => dispatch(openModal(true))}
                            >
                                <span>{t('buttons.start-learning')}</span>
                                <LuArrowUpRight aria-hidden />
                            </button>
                            <Link href={`/${locale}${Pages.DESIGN_HOME}`} className={styles.secondary}>
                                <span>{t('legal-page.back')}</span>
                                <LuArrowRight aria-hidden />
                            </Link>
                        </div>
                    </div>

                    <aside className={styles.aside}>
                        <p className={styles.asideLabel}>{t('legal-page.index')}</p>
                        <nav className={styles.asideNav} aria-label={t('legal-page.index')}>
                            {LEGAL_LINKS.map((link) => (
                                <Link
                                    key={link.page}
                                    href={`/${locale}${link.path}`}
                                    className={cn(styles.asideLink, page === link.page && styles.asideLinkActive)}
                                >
                                    {t(`footer-design.${link.label}`)}
                                </Link>
                            ))}
                        </nav>
                        {updated && (
                            <p className={styles.updated}>
                                <span>{t('legal-page.updated')}</span>
                                <strong>{updated}</strong>
                            </p>
                        )}
                    </aside>
                </div>

                <ol className={styles.grid}>
                    {sections.map((section, index) => (
                        <li key={section._key} className={styles.cell}>
                            <span className={cn(styles.number, InstrumentSerif.className)}>
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <div className={styles.body}>
                                <h2 className={cn(styles.heading, InstrumentSerif.className)}>{section.heading}</h2>
                                {section.body.split(/\n{2,}/).map((paragraph, paragraphIndex) => (
                                    <p key={`${section._key}-${paragraphIndex}`}>{paragraph}</p>
                                ))}
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default React.memo(LegalPage);
