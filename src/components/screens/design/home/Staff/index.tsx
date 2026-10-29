'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';

import NextImage from '@/src/components/components/image';

import { InstrumentSerif, Inter } from '@/src/constants/font';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    workers: WORKER[];
    section?: STAFF_SECTION;
};

const HOLD_MS = 5200;

const Staff = ({ workers, section }: Readonly<Props>) => {
    const t = useTranslations('staff-section');
    const locale = useLocale();
    const team = useMemo(() => workers.filter((member) => member.worker_image?.asset), [workers]);

    const copy = {
        line1: section?.line_1 || t('line-1'),
        line2: section?.line_2 || t('line-2'),
        line3: section?.line_3 || t('line-3'),
        experience: t('experience-label'),
        programs: t('programs'),
        skills: t('skills'),
    };

    const [[index, direction], setPage] = useState([0, 1]);
    const count = team.length;
    const activeIndex = count ? ((index % count) + count) % count : 0;
    const member = team[activeIndex];

    const go = useCallback((step: number) => {
        if (!count) return;
        setPage(([current]) => [current + step, step]);
    }, [count]);

    const goTo = useCallback((nextIndex: number) => {
        if (!count || nextIndex === activeIndex) return;
        setPage([nextIndex, nextIndex > activeIndex ? 1 : -1]);
    }, [activeIndex, count]);

    useEffect(() => {
        if (count < 2) return undefined;
        const timer = window.setInterval(() => go(1), HOLD_MS);
        return () => window.clearInterval(timer);
    }, [go, count]);

    if (!member) return null;

    const image = urlForImage(member.worker_image);
    const programs = member.programs?.length
        ? member.programs
        : member.profession.split(',').map((item) => item.trim()).filter(Boolean);
    const skills = member.skills?.length ? member.skills : [];
    const experience = member.experience || t('default-experience');
    const bio = member.bio || member.profession;

    return (
        <section id="staff" className={cn(styles.section, Inter.className)}>
            <div className={styles.wrap}>
                <div className={styles.stage}>
                    <div className={styles.left}>
                        <h2 className={cn(styles.headline, locale === 'am' && styles.headlineAm, locale === 'ru' && styles.headlineRu, InstrumentSerif.className)}>
                            <span className={styles.lead}>
                                {copy.line1}
                                {' '}
                                <em className={styles.emphasis}>{copy.line2}</em>
                            </span>
                            <span>{copy.line3}</span>
                        </h2>

                        <div
                            className={styles.stack}
                            onClick={() => go(1)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    go(1);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={t('next')}
                        >
                            <span className={styles.sheetBack} aria-hidden />
                            <span className={styles.sheetMid} aria-hidden />
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={member._key}
                                    className={styles.sheet}
                                    custom={direction}
                                    initial={{ x: direction > 0 ? 56 : -56, opacity: 0, scale: 0.96 }}
                                    animate={{ x: 0, opacity: 1, scale: 1 }}
                                    exit={{ x: direction > 0 ? -56 : 56, opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    {image?.src && (
                                        <NextImage
                                            src={image.src}
                                            alt={member.worker_image.alt || member.worker}
                                            className={styles.portrait}
                                            width={720}
                                            height={800}
                                            sizes="(max-width: 980px) 90vw, 480px"
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <article className={styles.panel}>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={member._key}
                                className={styles.panelInner}
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <div className={styles.panelHead}>
                                    <p className={styles.experience}>
                                        <span>{experience}</span>
                                        <small>{copy.experience}</small>
                                    </p>
                                    <div className={styles.avatarWrap}>
                                        {image?.src && (
                                            <NextImage
                                                src={image.src}
                                                alt=""
                                                className={styles.avatar}
                                                width={220}
                                                height={220}
                                                aria-hidden
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className={styles.identity}>
                                    <h3 className={styles.name}>{member.worker}</h3>
                                    <p className={styles.role}>{member.profession}</p>
                                </div>

                                <p className={styles.bio}>
                                    <span className={styles.bullet} aria-hidden />
                                    {bio}
                                </p>

                                {programs.length > 0 && (
                                    <div className={styles.group}>
                                        <p className={styles.groupLabel}>{copy.programs}</p>
                                        <ul className={styles.tags}>
                                            {programs.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div className={styles.group}>
                                        <p className={styles.groupLabel}>{copy.skills}</p>
                                        <ul className={styles.tags}>
                                            {skills.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {member.behance_url && (
                                    <Link href={member.behance_url} className={styles.behance} target="_blank" rel="noreferrer">
                                        Bē
                                    </Link>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </article>
                </div>
                {count > 1 && (
                    <div className={styles.dots} role="tablist" aria-label={t('next')}>
                        {team.map((person, dotIndex) => (
                            <button
                                key={person._key}
                                type="button"
                                role="tab"
                                aria-selected={dotIndex === activeIndex}
                                aria-label={person.worker}
                                className={cn(styles.dot, dotIndex === activeIndex && styles.dotActive)}
                                onClick={() => goTo(dotIndex)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default React.memo(Staff);
