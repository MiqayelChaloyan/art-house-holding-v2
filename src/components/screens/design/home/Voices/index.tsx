'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';

import NextImage from '@/src/components/components/image';

import { InstrumentSerif, Inter } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    section?: VOICES_SECTION;
};

const HOLD_MS = 5600;

const Voices = ({ section }: Readonly<Props>) => {
    const t = useTranslations('voices-section');

    const copy = {
        eyebrow: section?.eyebrow || '',
        line1: section?.line_1 || '',
        line2: section?.line_2 || '',
    };

    const items = useMemo(
        () => (section?.items || []).filter((item) => item?.quote && item?.name),
        [section?.items],
    );

    const [[index, direction], setPage] = useState([0, 1]);
    const count = items.length;
    const activeIndex = count ? ((index % count) + count) % count : 0;
    const voice = items[activeIndex];

    const paused = useRef(false);
    const [runId, setRunId] = useState(0);

    const goTo = useCallback((nextIndex: number) => {
        if (!count || nextIndex === activeIndex) return;
        setPage([nextIndex, nextIndex > activeIndex ? 1 : -1]);
        setRunId((value) => value + 1);
    }, [activeIndex, count]);

    useEffect(() => {
        if (count < 2) return undefined;
        const timer = window.setInterval(() => {
            if (paused.current) return;
            setPage(([current]) => [current + 1, 1]);
        }, HOLD_MS);
        return () => window.clearInterval(timer);
    }, [count, runId]);

    if (!voice) return null;

    const image = voice.image ? urlForImage(voice.image, 720) : undefined;
    const rating = Math.max(1, Math.min(5, voice.rating || 5));

    return (
        <section
            id="student-voices"
            className={cn(styles.section, Inter.className)}
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => {
                paused.current = false;
                setRunId((value) => value + 1);
            }}
        >
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {copy.eyebrow}
                    </p>
                    <h2 className={cn(styles.headline, InstrumentSerif.className)}>
                        <span>{keepWords(copy.line1)}</span>
                        <span className={styles.emphasis}>{keepWords(copy.line2)}</span>
                    </h2>
                </header>

                <div className={styles.card}>
                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                        <motion.div
                            key={voice._key}
                            className={styles.slide}
                            custom={direction}
                            initial={{ x: direction > 0 ? 48 : -48, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction > 0 ? -48 : 48, opacity: 0 }}
                            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <div className={styles.photo}>
                                {image?.src && (
                                    <NextImage
                                        src={image.src}
                                        alt={voice.image?.alt || voice.name}
                                        className={styles.image}
                                        width={image.width}
                                        height={image.height}
                                        sizes="(max-width: 860px) 70vw, 359px"
                                    />
                                )}
                            </div>
                            <div className={styles.body}>
                                <span className={styles.quoteMark} aria-hidden>
                                    <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                                        <path d="M11.2 21.2H0.8V12.4C0.8 8.08 1.84 4.72 3.92 2.32C6 0.88 8.4 0.16 11.12 0.16V5.2C9.52 5.36 8.32 6 7.52 7.12C6.72 8.24 6.32 9.84 6.32 11.92H11.2V21.2ZM27.2 21.2H16.8V12.4C16.8 8.08 17.84 4.72 19.92 2.32C22 0.88 24.4 0.16 27.12 0.16V5.2C25.52 5.36 24.32 6 23.52 7.12C22.72 8.24 22.32 9.84 22.32 11.92H27.2V21.2Z" fill="#ce2421" />
                                    </svg>
                                </span>
                                <blockquote className={cn(styles.quote, InstrumentSerif.className)}>“{voice.quote}”</blockquote>
                                <div className={styles.footer}>
                                    <div>
                                        <p className={styles.name}>{voice.name}</p>
                                        <p className={styles.role}>{voice.role}</p>
                                    </div>
                                    <div className={styles.stars} aria-label={`${rating} / 5`}>
                                        {Array.from({ length: 5 }).map((_, starIndex) => (
                                            <span key={starIndex} className={starIndex < rating ? styles.starOn : styles.starOff}>★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {count > 1 && (
                        <div className={styles.dots} role="tablist" aria-label={t('slides')}>
                            {items.map((item, dotIndex) => (
                                <button
                                    key={item._key}
                                    type="button"
                                    role="tab"
                                    aria-selected={dotIndex === activeIndex}
                                    aria-label={item.name}
                                    className={cn(styles.dot, dotIndex === activeIndex && styles.dotActive)}
                                    onClick={() => goTo(dotIndex)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Voices);
