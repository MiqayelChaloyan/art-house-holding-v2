'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SiBehance } from 'react-icons/si';

import NextImage from '@/src/components/components/image';

import { designFont } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    workers: WORKER[];
    labels?: {
        experience_label?: string;
        programs_label?: string;
        skills_label?: string;
    };
    heading?: {
        eyebrow?: string;
        title?: string;
        emphasis?: string;
    };
};

const HOLD_MS = 5200;
const SLIDE_MS = 0.72;
const SLIDE_EASE = [0.22, 1, 0.36, 1] as const;

/** Shared left (portrait) + right (panel) slide — same direction, distance, and timing. */
const staffSlide = {
    enter: (direction: number) => ({
        x: direction > 0 ? '11%' : '-11%',
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? '-11%' : '11%',
        opacity: 0,
    }),
};

const Staff = ({ workers, labels, heading }: Readonly<Props>) => {
    const t = useTranslations('staff-section');
    const reduceMotion = useReducedMotion();
    const team = useMemo(() => workers.filter((member) => member.worker_image?.asset), [workers]);

    const copy = {
        line1: t('line-1'),
        line2: t('line-2'),
        line3: t('line-3'),
        experience: labels?.experience_label || t('experience-label'),
        programs: labels?.programs_label || t('programs'),
        skills: labels?.skills_label || t('skills'),
    };

    const [[index, direction], setPage] = useState([0, 1]);
    const count = team.length;
    const activeIndex = count ? ((index % count) + count) % count : 0;
    const member = team[activeIndex];

    const paused = useRef(false);
    const [runId, setRunId] = useState(0);

    const go = useCallback((step: number) => {
        if (!count) return;
        setPage(([current]) => [current + step, step]);
        setRunId((value) => value + 1);
    }, [count]);

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

    if (!member) return null;

    const portrait = urlForImage(member.worker_image, 960);
    const avatar = urlForImage(member.worker_image, 524);
    const programs = member.programs?.length ? member.programs : [];
    const skills = member.skills?.length ? member.skills : [];
    const experience = member.experience || '';
    const bio = member.bio || member.profession;

    const slideTransition = reduceMotion
        ? { duration: 0.01 }
        : { duration: SLIDE_MS, ease: SLIDE_EASE };

    return (
        <section
            id="staff"
            className={cn(styles.section, designFont.ui)}
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => {
                paused.current = false;
                setRunId((value) => value + 1);
            }}
        >
            <div className={styles.wrap}>
                <div className={cn(styles.stage, heading && styles.stageCentered)}>
                    <div className={styles.left}>
                        {heading ? (
                            <header>
                                {heading.eyebrow && (
                                    <p className={styles.eyebrow}>
                                        <span className={styles.mark} aria-hidden />
                                        {heading.eyebrow}
                                    </p>
                                )}
                                <h2 className={cn(styles.headline, designFont.serif)}>
                                    <span>{keepWords(heading.title || '')}</span>
                                    {heading.emphasis && (
                                        <em className={styles.emphasis}>{keepWords(heading.emphasis)}</em>
                                    )}
                                </h2>
                            </header>
                        ) : (
                            <h2 className={cn(styles.headline, designFont.serif)}>
                                <span className={styles.lead}>
                                    {keepWords(copy.line1)}
                                    {' '}
                                    <em className={styles.emphasis}>{keepWords(copy.line2)}</em>
                                </span>
                                <span>{keepWords(copy.line3)}</span>
                            </h2>
                        )}

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
                                    variants={staffSlide}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={slideTransition}
                                >
                                    {portrait?.src && (
                                        <div className={styles.portraitFrame}>
                                            <NextImage
                                                key={`${member._key}-portrait`}
                                                src={portrait.src}
                                                alt={member.worker_image.alt || member.worker}
                                                className={styles.portrait}
                                                width={portrait.width}
                                                height={portrait.height}
                                                sizes="(max-width: 980px) 90vw, 480px"
                                                loading="eager"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <article className={styles.panel}>
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={member._key}
                                className={styles.panelInner}
                                custom={direction}
                                variants={staffSlide}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={slideTransition}
                            >
                                <div className={styles.panelHero}>
                                    {experience && (
                                        <p className={styles.experience}>
                                            <span>{experience}</span>
                                            <small>{copy.experience}</small>
                                        </p>
                                    )}
                                    <div className={styles.avatarWrap}>
                                        {avatar?.src && (
                                            <NextImage
                                                key={`${member._key}-avatar`}
                                                src={avatar.src}
                                                alt=""
                                                className={styles.avatar}
                                                width={avatar.width}
                                                height={avatar.height}
                                                sizes="262px"
                                                loading="eager"
                                                aria-hidden
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className={styles.panelBody}>
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
                                        <div className={cn(styles.group, styles.groupLast)}>
                                            <p className={styles.groupLabel}>{copy.skills}</p>
                                            <ul className={styles.tags}>
                                                {skills.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {member.behance_url && (
                                        <footer className={styles.panelFooter}>
                                            <Link
                                                href={member.behance_url}
                                                className={styles.behance}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={t('view-behance', { name: member.worker })}
                                            >
                                                <SiBehance aria-hidden />
                                            </Link>
                                        </footer>
                                    )}
                                </div>
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
            <div className={styles.preload} aria-hidden>
                {team.map((person) => {
                    const large = urlForImage(person.worker_image, 960);
                    const small = urlForImage(person.worker_image, 524);
                    return (
                        <React.Fragment key={person._key}>
                            {large?.src && <img src={large.src} alt="" />}
                            {small?.src && <img src={small.src} alt="" />}
                        </React.Fragment>
                    );
                })}
            </div>
        </section>
    );
};

export default React.memo(Staff);
