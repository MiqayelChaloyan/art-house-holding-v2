'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';

import NextImage from '@/src/components/components/image';

import { InstrumentSerif, Inter } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';
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
    const team = useMemo(() => workers.filter((member) => member.worker_image?.asset), [workers]);

    const copy = {
        line1: section?.line_1 || '',
        line2: section?.line_2 || '',
        line3: section?.line_3 || '',
        experience: section?.experience_label || '',
        programs: section?.programs_label || '',
        skills: section?.skills_label || '',
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

    return (
        <section
            id="staff"
            className={cn(styles.section, Inter.className)}
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => {
                paused.current = false;
                setRunId((value) => value + 1);
            }}
        >
            <div className={styles.wrap}>
                <div className={styles.stage}>
                    <div className={styles.left}>
                        <h2 className={cn(styles.headline, InstrumentSerif.className)}>
                            <span className={styles.lead}>
                                {keepWords(copy.line1)}
                                {' '}
                                <em className={styles.emphasis}>{keepWords(copy.line2)}</em>
                            </span>
                            <span>{keepWords(copy.line3)}</span>
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
                                    {portrait?.src && (
                                        <NextImage
                                            src={portrait.src}
                                            alt={member.worker_image.alt || member.worker}
                                            className={styles.portrait}
                                            width={portrait.width}
                                            height={portrait.height}
                                            sizes="(max-width: 980px) 90vw, 480px"
                                            loading="eager"
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
                                    {experience && (
                                        <p className={styles.experience}>
                                            <span>{experience}</span>
                                            <small>{copy.experience}</small>
                                        </p>
                                    )}
                                    <div className={styles.avatarWrap}>
                                        {avatar?.src && (
                                            <NextImage
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
