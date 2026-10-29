'use client'

import React, { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu';

import { InstrumentSerif, Inter } from '@/src/constants/font';
import { Pages } from '@/src/constants/pages';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    section?: STUDIO_SECTION;
    fallbackSlides?: MAIN_SLIDE[];
};

interface SlideView {
    key: string;
    src: string;
    alt: string;
};

const HOLD_MS = 5200;

const Studio = ({ section, fallbackSlides }: Readonly<Props>) => {
    const t = useTranslations('studio');
    const locale = useLocale();

    const copy = {
        eyebrow: section?.eyebrow || t('eyebrow'),
        line1: section?.line_1 || t('line-1'),
        line2: section?.line_2 || t('line-2'),
        line3: section?.line_3 || t('line-3'),
        line4: section?.line_4 || t('line-4'),
        description: section?.description || t('description'),
    };

    const stats = section?.stats?.length
        ? section.stats.map((item) => ({
            key: item._key,
            value: item.value,
            label: item.title,
        }))
        : [
            { key: 'years', value: t('years-value'), label: t('years') },
            { key: 'students', value: t('students-value'), label: t('students') },
            { key: 'projects', value: t('projects-value'), label: t('projects') },
        ];

    const slides = useMemo(() => {
        const fromStudio = (section?.slides || [])
            .map((slide) => toSlide(slide._key, slide.image, slide.image?.alt || copy.line4))
            .filter((slide): slide is SlideView => Boolean(slide));

        if (fromStudio.length) return fromStudio;

        return (fallbackSlides || [])
            .map((slide) => toSlide(slide._key, slide.image, slide.title || copy.line4))
            .filter((slide): slide is SlideView => Boolean(slide));
    }, [section?.slides, fallbackSlides, copy.line4]);

    const [index, setIndex] = useState(0);
    const activeIndex = slides.length ? index % slides.length : 0;

    useEffect(() => {
        if (slides.length < 2) return undefined;

        const timer = window.setInterval(() => {
            setIndex((current) => current + 1);
        }, HOLD_MS);

        return () => window.clearInterval(timer);
    }, [slides.length]);

    const active = slides[activeIndex];

    return (
        <section id="studio" className={cn(styles.section, Inter.className)}>
            <div className={styles.wrap}>
                <div className={styles.copy}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {copy.eyebrow}
                    </p>
                    <h2 className={cn(styles.headline, locale === 'am' && styles.headlineAm, locale === 'ru' && styles.headlineRu, InstrumentSerif.className)}>
                        <span>{copy.line1}</span>
                        <span>{copy.line2}</span>
                        <span className={styles.emphasis}>{copy.line3}</span>
                        <span>
                            {copy.line4}
                            <span className={styles.dot}>.</span>
                        </span>
                    </h2>
                    <p className={styles.description}>{copy.description}</p>
                    <div className={styles.actions}>
                        <Link
                            href={`/${locale}${Pages.DESIGN_HOME}#design-courses`}
                            className={styles.primary}
                        >
                            <span>{t('explore')}</span>
                            <LuArrowUpRight aria-hidden />
                        </Link>
                        <Link
                            href={`/${locale}${Pages.DESIGN_PORTFOLIOS}`}
                            className={styles.secondary}
                        >
                            <span>{t('portfolio')}</span>
                            <LuArrowRight aria-hidden />
                        </Link>
                    </div>
                </div>
                <div className={styles.visual}>
                    {active && (
                        <div className={styles.photo}>
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={active.key}
                                    className={styles.slide}
                                    style={{ backgroundImage: `url(${active.src})` }}
                                    initial={{ opacity: 0, scale: 1.14 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
                                        scale: { duration: 6.4, ease: 'linear' },
                                    }}
                                    role="img"
                                    aria-label={active.alt}
                                />
                            </AnimatePresence>
                            <div className={styles.shade} aria-hidden />
                            {slides.length > 1 && (
                                <div className={styles.dots} aria-hidden>
                                    {slides.map((slide, slideIndex) => (
                                        <span
                                            key={slide.key}
                                            className={cn(styles.pager, slideIndex === activeIndex && styles.pagerActive)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    <ul className={styles.stats}>
                        {stats.map((item) => (
                            <li key={item.key} className={styles.stat}>
                                <span className={styles.value}>{item.value}</span>
                                <span className={styles.label}>{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

const toSlide = (key: string, image: Asset | undefined, alt: string): SlideView | null => {
    const path = image ? urlForImage(image) : undefined;
    if (!path?.src) return null;
    return { key, src: path.src, alt };
};

export default React.memo(Studio);
