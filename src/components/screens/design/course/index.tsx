'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { LuArrowUpRight } from 'react-icons/lu';

import NextImage from '@/src/components/components/image';
import GoogleMaps from '@/src/components/components/map';
import Staff from '@/src/components/screens/design/home/Staff';
import Projects from '@/src/components/screens/design/home/Projects';
import Blog from '@/src/components/screens/design/home/Blog';

import { Pages } from '@/src/constants/pages';
import { designFont } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    locale: string;
    course: COURSES_DESIGN_QUERYResult;
    home?: HOME_DETALIS_DESIGN_QUERYResult;
};

const GROUP_FILTERS = ['morning', 'evening', 'online', 'offline'] as const;

const DEFAULT_MODULES_LABEL: Record<string, string> = {
    am: 'մոդուլ',
    en: 'modules',
    ru: 'модулей',
};

const Course = ({ locale, course, home }: Readonly<Props>) => {
    const {
        _id,
        gallery_of_course,
        course_name,
        conditions = [],
        guides = [],
        name,
        intro: courseIntro,
        topics_section: topicsHeading,
        topics: courseTopics,
        condition_items: conditionItems,
        trainers_section: trainersSection,
        price_section: prices,
        why_section: why,
        groups_section: groups,
        faq_section: faq,
    } = course;

    const headings = home?.courses_section;
    const portrait = gallery_of_course?.[0];
    const image = portrait ? urlForImage(portrait, 1040) : undefined;
    const gallery = (gallery_of_course || []).filter((item) => item?.asset);
    const aboutSlides = gallery.length > 1 ? [...gallery.slice(1), gallery[0]] : gallery;
    const intro = courseIntro || '';
    const title = course_name || name;
    const copy = {
        eyebrow: headings?.detail_eyebrow || '',
        emphasis: headings?.detail_emphasis || '',
        explore: headings?.explore_label || '',
        portfolio: headings?.portfolio_label || '',
        aboutEyebrow: headings?.about_eyebrow || '',
        curriculumEyebrow: topicsHeading?.eyebrow || headings?.curriculum_eyebrow || '',
        curriculumModulesLabel: topicsHeading?.modules_label || headings?.curriculum_modules_label || DEFAULT_MODULES_LABEL[locale] || 'modules',
        curriculumTitle: topicsHeading?.title || headings?.curriculum_title || '',
        curriculumEmphasis: topicsHeading?.emphasis || headings?.curriculum_emphasis || '',
        curriculumDescription: topicsHeading?.description || headings?.curriculum_description || '',
        trainersEyebrow: trainersSection?.eyebrow || headings?.trainers_eyebrow || '',
        trainersEmphasis: trainersSection?.emphasis || headings?.trainers_emphasis || '',
    };

    const points = guides.slice(0, 4).map((guide, index) => ({ _key: `guide-${index}`, title: guide, text: '' }));
    const topics = (courseTopics || []).filter((topic) => topic.title);
    const fallbackTopics = (conditionItems || []).filter((item) => item.title);
    const topicItems = topics.length
        ? topics
        : fallbackTopics.length
            ? fallbackTopics
            : conditions.map((condition, index) => ({ _key: `condition-${index}`, title: condition, description: '' }));
    const modulesPart = copy.curriculumModulesLabel && topicItems.length
        ? `${topicItems.length} ${copy.curriculumModulesLabel}`
        : '';
    const curriculumEyebrow = copy.curriculumEyebrow.includes('·')
        ? copy.curriculumEyebrow
        : [copy.curriculumEyebrow, modulesPart].filter(Boolean).join(' · ');
    const trainers = useMemo(() => {
        const fromCourse = (trainersSection?.items || []).filter((member) => member.worker_image?.asset);
        if (fromCourse.length) return fromCourse;

        const linked = (home?.workers || []).filter((worker) => worker.courses?.includes(_id));
        if (linked.length) return linked;

        return (home?.workers || []).filter((member) => member.worker_image?.asset);
    }, [trainersSection?.items, home?.workers, _id]);
    const selectedPosts = (home?.blog_section?.posts || []).filter((post) => post?.slug && post?.title);

    const priceItems = (prices?.items || []).filter((item) => item.title || item.amount);
    const whyItems = (why?.items || []).filter((item) => item.title || item.description);
    const groupItems = useMemo(() => groups?.groups || [], [groups?.groups]);
    const faqItems = (faq?.items || []).filter((item) => item.question);
    const [groupFilter, setGroupFilter] = useState('all');
    const [openTopic, setOpenTopic] = useState<string | null>(null);
    const [openFaq, setOpenFaq] = useState<string | null>(null);
    const visibleGroups = useMemo(
        () => groupItems.filter((item) => groupFilter === 'all' || item.mode === groupFilter),
        [groupItems, groupFilter],
    );
    const groupModes = GROUP_FILTERS.filter((mode) => groupItems.some((item) => item.mode === mode));
    const enrollHref = `/${locale}${Pages.DESIGN_START_LEARNING}?course=${encodeURIComponent(course.slug || name || '')}`;
    const portfolioHref = {
        pathname: `/${locale}${Pages.DESIGN_PORTFOLIOS}`,
        query: { name },
    };

    return (
        <article className={cn(styles.page, designFont.ui)}>
            <section className={styles.hero}>
                <div className={styles.copy}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {[copy.eyebrow, title].filter(Boolean).join(' / ')}
                    </p>
                    <h1 className={cn(styles.headline, designFont.serif)}>
                        <span>{keepWords(title)}</span>
                        {copy.emphasis && <span className={styles.emphasis}>{keepWords(copy.emphasis)}</span>}
                    </h1>
                    {intro && <p className={cn(styles.intro, designFont.medium)}>{intro}</p>}
                    {(copy.explore || copy.portfolio) && (
                        <div className={styles.actions}>
                            {copy.explore && (
                                <Link href={`/${locale}${Pages.DESIGN_COURSES}`} className={styles.primary}>
                                    {copy.explore}
                                    <LuArrowUpRight aria-hidden />
                                </Link>
                            )}
                            {copy.portfolio && (
                                <Link href={portfolioHref} className={styles.secondary}>
                                    {copy.portfolio}
                                    <LuArrowUpRight aria-hidden />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
                {image?.src && (
                    <div className={styles.portrait}>
                        <NextImage
                            src={image.src}
                            alt={portrait?.alt || title}
                            className={styles.portraitImage}
                            width={image.width}
                            height={image.height}
                            sizes="(max-width: 980px) 100vw, 518px"
                            priority
                        />
                    </div>
                )}
            </section>

            {(aboutSlides.length > 0 || points.length > 0) && (
                <section className={styles.about}>
                    {aboutSlides.length > 0 && <AboutSlider slides={aboutSlides} title={title} />}
                    <div className={styles.aboutCopy}>
                        <BlockHeading eyebrow={copy.aboutEyebrow} title={title} emphasis={copy.emphasis.replace(/\.$/, '')} />
                        {points.length > 0 && (
                            <ul className={styles.points}>
                                {points.map((point) => (
                                    <li key={point._key} className={styles.point}>
                                        {point.title && <h3 className={cn(styles.pointTitle, designFont.medium)}>{point.title}</h3>}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            )}

            {topicItems.length > 0 && (
                <section className={styles.block}>
                    <div className={styles.splitHead}>
                        <BlockHeading eyebrow={curriculumEyebrow} title={copy.curriculumTitle} emphasis={copy.curriculumEmphasis} inline />
                        {copy.curriculumDescription && <p className={styles.splitText}>{copy.curriculumDescription}</p>}
                    </div>
                    <Accordion
                        items={topicItems.map((topic, index) => ({
                            key: topic._key || `topic-${index}`,
                            label: topic.title || '',
                            body: topic.description?.trim() || topic.title || '',
                        }))}
                        open={openTopic}
                        onToggle={setOpenTopic}
                    />
                </section>
            )}

            {trainers.length > 0 && (
                <div className={styles.trainers}>
                    <Staff
                        workers={trainers}
                        section={{
                            line_1: home?.staff_section?.line_1 || '',
                            line_2: home?.staff_section?.line_2 || '',
                            line_3: home?.staff_section?.line_3 || '',
                            experience_label: trainersSection?.experience_label || home?.staff_section?.experience_label,
                            programs_label: trainersSection?.programs_label || home?.staff_section?.programs_label,
                            skills_label: trainersSection?.skills_label || home?.staff_section?.skills_label,
                        }}
                        heading={{ eyebrow: copy.trainersEyebrow, title, emphasis: copy.trainersEmphasis }}
                    />
                </div>
            )}

            {priceItems.length > 0 && (
                <section className={styles.block}>
                    <BlockHeading eyebrow={prices?.eyebrow} title={prices?.line_1} emphasis={prices?.line_2} inline />
                    <ul className={styles.priceGrid}>
                        {priceItems.map((item) => (
                            <li key={item._key} className={styles.priceCard}>
                                <span className={styles.priceDot} aria-hidden />
                                <div className={styles.priceName}>
                                    {item.title && <p className={cn(styles.priceTitle, designFont.medium)}>{item.title}</p>}
                                    {item.subtitle && <p className={styles.priceSub}>{item.subtitle}</p>}
                                </div>
                                {item.duration && <p className={cn(styles.priceDuration, designFont.medium)}>{item.duration}</p>}
                                {item.amount && <p className={cn(styles.priceAmount, designFont.medium)}>{item.amount}</p>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {whyItems.length > 0 && (
                <section className={styles.block}>
                    <BlockHeading eyebrow={why?.eyebrow} title={why?.line_1} emphasis={why?.line_2} />
                    <ul className={styles.whyGrid}>
                        {whyItems.map((item) => (
                            <li key={item._key} className={styles.whyItem}>
                                <span className={styles.whyIcon} aria-hidden />
                                {item.title && <h3 className={cn(styles.whyTitle, designFont.medium)}>{item.title}</h3>}
                                {item.description && <p className={styles.whyText}>{item.description}</p>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {groupItems.length > 0 && (
                <section className={styles.block}>
                    <BlockHeading eyebrow={groups?.eyebrow} title={groups?.line_1} emphasis={groups?.line_2} inline />
                    {(groups?.filter_all || groupModes.length > 0) && (
                        <div className={styles.filters} role="tablist">
                            <button
                                type="button"
                                className={cn(styles.chip, groupFilter === 'all' && styles.chipActive)}
                                onClick={() => setGroupFilter('all')}
                            >
                                {groups?.filter_all || 'All'}
                            </button>
                            {groupModes.map((mode) => {
                                const label = groupItems.find((item) => item.mode === mode)?.shift || mode;
                                return (
                                    <button
                                        key={mode}
                                        type="button"
                                        className={cn(styles.chip, groupFilter === mode && styles.chipActive)}
                                        onClick={() => setGroupFilter(mode)}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                    <ul className={styles.groupGrid}>
                        {visibleGroups.map((item) => (
                            <li key={item._key} className={styles.groupCard}>
                                {item.shift && <span className={styles.groupBadge}>{item.shift}</span>}
                                {item.start_date && (
                                    <div className={styles.groupDate}>
                                        {groups?.start_date_label && <span>{groups.start_date_label}</span>}
                                        <p className={cn(designFont.medium)}>{item.start_date}</p>
                                    </div>
                                )}
                                <dl className={styles.groupMeta}>
                                    {item.schedule && (
                                        <div>
                                            <dt>{groups?.schedule_label}</dt>
                                            <dd>{item.schedule}</dd>
                                        </div>
                                    )}
                                    {item.time && (
                                        <div>
                                            <dt>{groups?.time_label}</dt>
                                            <dd>{item.time}</dd>
                                        </div>
                                    )}
                                    {item.duration && (
                                        <div>
                                            <dt>{groups?.duration_label}</dt>
                                            <dd>{item.duration}</dd>
                                        </div>
                                    )}
                                </dl>
                                <div className={styles.groupFooter}>
                                    <div>
                                        {groups?.price_label && <span>{groups.price_label}</span>}
                                        {item.price && <p className={cn(designFont.medium)}>{item.price}</p>}
                                    </div>
                                    {groups?.enroll_label && (
                                        <Link href={enrollHref} className={styles.enroll}>
                                            {groups.enroll_label}
                                            <LuArrowUpRight aria-hidden />
                                        </Link>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {faqItems.length > 0 && (
                <section className={styles.block}>
                    <BlockHeading eyebrow={faq?.eyebrow} title={faq?.line_1} emphasis={faq?.line_2} />
                    <Accordion
                        items={faqItems.map((item) => ({ key: item._key, label: item.question || '', body: item.answer }))}
                        open={openFaq}
                        onToggle={setOpenFaq}
                    />
                </section>
            )}

            <div className={styles.shared}>
                <Projects section={home?.projects_section} />
                <Blog section={home?.blog_section} posts={selectedPosts} layout="cards" />
            </div>

            <section className={cn(styles.block, styles.map)}>
                <GoogleMaps height="100%" />
            </section>
        </article>
    );
};

const SLIDE_MS = 4800;

const AboutSlider = ({ slides, title }: { slides: GALLERY[]; title: string }) => {
    const [[index, direction], setPage] = useState([0, 1]);
    const [runId, setRunId] = useState(0);
    const paused = useRef(false);
    const count = slides.length;
    const active = ((index % count) + count) % count;
    const slide = slides[active];
    const image = urlForImage(slide, 1040);

    const goTo = useCallback((next: number) => {
        if (next === active) return;
        setPage([next, next > active ? 1 : -1]);
        setRunId((value) => value + 1);
    }, [active]);

    useEffect(() => {
        if (count < 2) return undefined;
        const timer = window.setInterval(() => {
            if (!paused.current) setPage(([current]) => [current + 1, 1]);
        }, SLIDE_MS);
        return () => window.clearInterval(timer);
    }, [count, runId]);

    return (
        <div
            className={styles.aboutMedia}
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => {
                paused.current = false;
                setRunId((value) => value + 1);
            }}
        >
            <span className={styles.aboutBar} aria-hidden />
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={slide._key}
                    className={styles.aboutSlide}
                    custom={direction}
                    initial={{ x: direction > 0 ? '100%' : '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: direction > 0 ? '-100%' : '100%' }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                    {image?.src && (
                        <NextImage
                            src={image.src}
                            alt={slide.alt || title}
                            className={styles.aboutImage}
                            width={image.width}
                            height={image.height}
                            sizes="(max-width: 980px) 100vw, 560px"
                        />
                    )}
                </motion.div>
            </AnimatePresence>
            {count > 1 && (
                <div className={styles.aboutDots} role="tablist">
                    {slides.map((item, dotIndex) => (
                        <button
                            key={item._key}
                            type="button"
                            role="tab"
                            aria-selected={dotIndex === active}
                            aria-label={`${dotIndex + 1} / ${count}`}
                            className={cn(styles.aboutDot, dotIndex === active && styles.aboutDotActive)}
                            onClick={() => goTo(dotIndex)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Accordion = ({
    items,
    open,
    onToggle,
}: {
    items: { key: string; label: string; body?: string }[];
    open: string | null;
    onToggle: (key: string | null) => void;
}) => (
    <ul className={styles.accordion}>
        {items.map((item) => {
            const isOpen = open === item.key;
            const panelId = `accordion-panel-${item.key}`;
            return (
                <li key={item.key} className={cn(styles.accordionItem, isOpen && styles.accordionOpen)}>
                    <button
                        type="button"
                        className={styles.accordionButton}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => onToggle(isOpen ? null : item.key)}
                    >
                        <span className={cn(styles.accordionLabel, designFont.medium)}>{item.label}</span>
                        <span className={styles.accordionToggle} aria-hidden>{isOpen ? '–' : '+'}</span>
                    </button>
                    <motion.div
                        id={panelId}
                        className={styles.accordionPanel}
                        role="region"
                        aria-hidden={!isOpen}
                        initial={false}
                        animate={isOpen ? 'open' : 'closed'}
                        variants={{
                            open: { height: 'auto', opacity: 1 },
                            closed: { height: 0, opacity: 0 },
                        }}
                        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className={styles.accordionPanelInner}>
                            <p className={styles.accordionBody}>{item.body}</p>
                        </div>
                    </motion.div>
                </li>
            );
        })}
    </ul>
);

const BlockHeading = ({
    eyebrow,
    title,
    emphasis,
    inline = false,
}: {
    eyebrow?: string;
    title?: string;
    emphasis?: string;
    inline?: boolean;
}) => {
    if (!eyebrow && !title && !emphasis) return null;

    return (
        <header className={styles.blockHead}>
            {eyebrow && (
                <p className={styles.eyebrow}>
                    <span className={styles.mark} aria-hidden />
                    {eyebrow}
                </p>
            )}
            {(title || emphasis) && (
                <h2 className={cn(styles.sectionTitle, inline && styles.sectionTitleInline, designFont.serif)}>
                    {title && <span>{keepWords(title)}</span>}
                    {emphasis && <span className={styles.emphasis}>{keepWords(emphasis)}</span>}
                </h2>
            )}
        </header>
    );
};

export default React.memo(Course);
