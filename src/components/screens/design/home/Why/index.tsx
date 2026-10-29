'use client'

import React from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { InstrumentSerif, Inter } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    section?: WHY_SECTION;
};

const fallbackNumbers = ['01', '02', '03', '04', '05', '06'] as const;

const Why = ({ section }: Readonly<Props>) => {
    const t = useTranslations('why-section');
    const locale = useLocale();

    const copy = {
        eyebrow: section?.eyebrow || t('eyebrow'),
        line1: section?.line_1 || t('line-1'),
        line2: section?.line_2 || t('line-2'),
    };

    const items = section?.items?.length === 6
        ? section.items
        : fallbackNumbers.map((number, index) => ({
            _key: `fallback-${index}`,
            number,
            title: t(`item-${number}-title`),
            description: t(`item-${number}-description`),
        }));

    return (
        <section id="why-art-house" className={cn(styles.section, Inter.className)}>
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {copy.eyebrow}
                    </p>
                    <h2 className={cn(styles.headline, locale === 'am' && styles.headlineAm, locale === 'ru' && styles.headlineRu, InstrumentSerif.className)}>
                        <span>{copy.line1}</span>
                        <span className={styles.emphasis}>{copy.line2}</span>
                    </h2>
                </header>
                <ul className={styles.grid}>
                    {items.map((item) => (
                        <li key={item._key} className={styles.cell}>
                            <span className={styles.number}>{item.number}</span>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.description}>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default React.memo(Why);
