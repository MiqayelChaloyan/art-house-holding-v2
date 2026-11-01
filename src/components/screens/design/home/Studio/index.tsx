'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu';

import NextImage from '@/src/components/components/image';

import { InstrumentSerif, Inter, Montserrat } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';
import { Pages } from '@/src/constants/pages';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    section?: STUDIO_SECTION;
};

interface SlideView {
    key: string;
    src: string;
    alt: string;
};

const HOLD_MS = 5200;

const Studio = ({ section }: Readonly<Props>) => {
    const locale = useLocale();

    const copy = {
        eyebrow: section?.eyebrow || '',
        line1: section?.line_1 || '',
        line2: section?.line_2 || '',
        line3: section?.line_3 || '',
        line4: section?.line_4 || '',
        description: section?.description || '',
        explore: section?.explore_label || '',
        portfolio: section?.portfolio_label || '',
    };

    const stats = (section?.stats || []).map((item) => ({
        key: item._key,
        value: item.value,
        label: item.title,
    }));

    const slides = useMemo(() => (
        (section?.slides || [])
            .map((slide) => toSlide(slide._key, slide.image, slide.image?.alt || copy.line4))
            .filter((slide): slide is SlideView => Boolean(slide))
    ), [section?.slides, copy.line4]);

    const [index, setIndex] = useState(0);
    const activeIndex = slides.length ? index % slides.length : 0;

    const paused = useRef(false);
    const [runId, setRunId] = useState(0);

    useEffect(() => {
        if (slides.length < 2) return undefined;

        const timer = window.setInterval(() => {
            if (paused.current) return;
            setIndex((current) => current + 1);
        }, HOLD_MS);

        return () => window.clearInterval(timer);
    }, [slides.length, runId]);

    return (
        <section
            id="studio"
            className={cn(styles.section, Inter.className)}
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => {
                paused.current = false;
                setRunId((value) => value + 1);
            }}
        >
            <div className={styles.wrap}>
                <div className={styles.copy}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {copy.eyebrow}
                    </p>
                    <h2 className={cn(
                        styles.headline,
                        locale === 'am' && styles.headlineAm,
                        locale === 'ru' && styles.headlineRu,
                        InstrumentSerif.className,
                    )}>
                        <span>{keepWords(copy.line1)}</span>
                        <span>{keepWords(copy.line2)}</span>
                        <span className={styles.emphasis}>{keepWords(copy.line3)}</span>
                        <span>
                            {keepWords(copy.line4)}
                            <span className={styles.dot}>.</span>
                        </span>
                    </h2>
                    <p className={styles.description}>{copy.description}</p>
                    {(copy.explore || copy.portfolio) && (
                    <div className={styles.actions}>
                        {copy.explore && (
                        <Link
                            href={`/${locale}${Pages.DESIGN_HOME}#design-courses`}
                            className={styles.primary}
                        >
                            <span>{copy.explore}</span>
                            <LuArrowUpRight aria-hidden />
                        </Link>
                        )}
                        {copy.portfolio && (
                        <Link
                            href={`/${locale}${Pages.DESIGN_PORTFOLIOS}`}
                            className={styles.secondary}
                        >
                            <span>{copy.portfolio}</span>
                            <LuArrowRight aria-hidden />
                        </Link>
                        )}
                    </div>
                    )}
                </div>
                <div className={styles.visual}>
                    {slides.length > 0 && (
                        <div className={styles.photo}>
                            {slides.map((slide, slideIndex) => (
                                <motion.div
                                    key={slide.key}
                                    className={styles.slide}
                                    initial={false}
                                    animate={{
                                        opacity: slideIndex === activeIndex ? 1 : 0,
                                        scale: slideIndex === activeIndex ? 1 : 1.08,
                                    }}
                                    transition={{
                                        opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                                        scale: { duration: 6.4, ease: 'linear' },
                                    }}
                                    style={{ zIndex: slideIndex === activeIndex ? 1 : 0 }}
                                >
                                    <NextImage
                                        src={slide.src}
                                        alt={slide.alt}
                                        className={styles.slideImage}
                                        width={1040}
                                        height={1300}
                                        sizes="(max-width: 980px) 100vw, 520px"
                                        priority={slideIndex === 0}
                                        loading="eager"
                                    />
                                </motion.div>
                            ))}
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
                    <motion.ul
                        className={styles.stats}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.45 }}
                    >
                        {stats.map((item, index) => (
                            <motion.li
                                key={item.key}
                                className={styles.stat}
                                variants={{
                                    hidden: { opacity: 0, y: 18 },
                                    show: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                                    },
                                }}
                            >
                                <StatValue value={item.value} className={cn(styles.value, Montserrat.className)} />
                                <span className={styles.label}>{item.label}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </div>
        </section>
    );
};

const parseStat = (raw: string) => {
    const text = String(raw || '').trim();
    const match = text.match(/^(\D*?)(\d+(?:[.,]\d+)?)(.*)$/);
    if (!match) {
        return { prefix: '', number: 0, suffix: text, decimals: 0, pad: 0 };
    }

    const digits = match[2].replace(',', '.');
    const decimals = (digits.split('.')[1] || '').length;
    const whole = match[2].split(/[.,]/)[0];

    return {
        prefix: match[1],
        number: Number(digits),
        suffix: match[3],
        decimals,
        pad: /^0\d/.test(whole) ? whole.length : 0,
    };
};

const formatStat = (
    parsed: ReturnType<typeof parseStat>,
    value: number,
) => {
    let body = parsed.decimals > 0 ? value.toFixed(parsed.decimals) : String(Math.round(value));
    if (parsed.pad) {
        const [int, frac] = body.split('.');
        body = `${int.padStart(parsed.pad, '0')}${frac ? `.${frac}` : ''}`;
    }
    return `${parsed.prefix}${body}${parsed.suffix}`;
};

const StatValue = ({ value, className }: { value: string; className: string }) => {
    const parsed = useMemo(() => parseStat(value), [value]);
    const [shown, setShown] = useState(() => formatStat(parsed, 0));
    const node = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = node.current;
        if (!el) return undefined;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            setShown(formatStat(parsed, parsed.number));
            return undefined;
        }

        let frame = 0;
        const play = () => {
            if (started.current) return;
            started.current = true;
            const duration = 1400;
            const start = performance.now();

            const tick = (now: number) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - (1 - t) ** 3;
                setShown(formatStat(parsed, parsed.number * eased));
                if (t < 1) frame = requestAnimationFrame(tick);
            };

            frame = requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) play();
        }, { threshold: 0.4 });

        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [parsed]);

    return <span ref={node} className={className}>{shown}</span>;
};

const toSlide = (key: string, image: Asset | undefined, alt: string): SlideView | null => {
    const path = image ? urlForImage(image, 1040) : undefined;
    if (!path?.src) return null;
    return { key, src: path.src, alt };
};

export default React.memo(Studio);
