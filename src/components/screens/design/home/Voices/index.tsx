'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';

import NextImage from '@/src/components/components/image';

import { designFont } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderVoicesSecondLine = (text: string, emphasisWord: string) => {
    if (!text) return null;

    if (!emphasisWord) {
        return keepWords(text);
    }

    const match = text.match(new RegExp(`^(.*?)(${escapeRegExp(emphasisWord)})(.*)$`, 'iu'));
    if (!match) {
        return keepWords(text);
    }

    const [, before, emphasis, after] = match;

    return (
        <>
            {before ? keepWords(before) : null}
            <span className={styles.emphasis}>{emphasis}</span>
            {after ? keepWords(after) : null}
        </>
    );
};

interface Props {
    section?: VOICES_SECTION;
};

const HOLD_MS = 5600;

const Voices = ({ section }: Readonly<Props>) => {
    const t = useTranslations('voices-section');

    const copy = {
        eyebrow: t('eyebrow'),
        line1: t('line-1'),
        line2: t('line-2'),
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
            className={cn(styles.section, designFont.ui)}
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
                    <h2 className={cn(styles.headline, designFont.serif)}>
                        <span>{keepWords(copy.line1)}</span>
                        <span>{renderVoicesSecondLine(copy.line2, t('emphasis-word'))}</span>
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
                                    <svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                        <path
                                            d="M11.8 29.2H2.8V17.6C2.8 11.8 4.28 7.36 7.24 4.24C10.2 1.96 13.52 1 17.2 1V7.6C14.96 7.88 13.28 8.96 12.16 10.84C11.04 12.72 10.48 15.08 10.48 17.92H11.8V29.2ZM29.8 29.2H20.8V17.6C20.8 11.8 22.28 7.36 25.24 4.24C28.2 1.96 31.52 1 35.2 1V7.6C32.96 7.88 31.28 8.96 30.16 10.84C29.04 12.72 28.48 15.08 28.48 17.92H29.8V29.2Z"
                                            stroke="#CE2421"
                                            strokeWidth="2.4"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                <blockquote className={cn(styles.quote, designFont.serif)}>{voice.quote}</blockquote>
                                <div className={styles.footer}>
                                    <div className={styles.meta}>
                                        <p className={styles.name}>{voice.name}</p>
                                        <p className={styles.role}>{voice.role}</p>
                                    </div>
                                    <div className={styles.stars} aria-label={`${rating} / 5`}>
                                        {Array.from({ length: 5 }).map((_, starIndex) => (
                                            <span key={starIndex} className={starIndex < rating ? styles.starOn : styles.starOff}>★</span>
                                        ))}
                                    </div>
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
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Voices);
