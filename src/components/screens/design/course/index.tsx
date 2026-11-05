'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { LuArrowUpRight } from 'react-icons/lu';

import { designCourseCountWord } from '@/src/utils/design-course-count-word';
import {
    mapCoursePortfoliosToProjects,
    mapPortfolioPicksToProjects,
} from '@/src/utils/design-selected-work-from-portfolios';

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
type GroupFilter = typeof GROUP_FILTERS[number];

const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const Course = ({ locale, course, home }: Readonly<Props>) => {
    const t = useTranslations('design-course-sections');
    const {
        _id,
        gallery_of_course,
        course_name,
        conditions = [],
        about_section: aboutSection,
        name,
        intro: courseIntro,
        topics: courseTopics,
        condition_items: conditionItems,
        trainers_section: trainersSection,
        price_section: prices,
        why_section: why,
        groups_section: groups,
        faq_section: faq,
        blog_posts: courseBlogPosts,
        selected_work_section: courseSelectedWork,
        portfolios: coursePortfolios = [],
        slug: courseSlug,
    } = course;
    const portrait = gallery_of_course?.[0];
    const image = portrait ? urlForImage(portrait, 1040) : undefined;
    const gallery = (gallery_of_course || []).filter((item) => item?.asset);
    const aboutSlides = gallery.length > 1 ? [...gallery.slice(1), gallery[0]] : gallery;
    const intro = courseIntro || '';
    const title = course_name || name;
    const copy = {
        eyebrow: t('detail-eyebrow'),
        emphasis: t('detail-emphasis'),
        explore: t('explore-label'),
        portfolio: t('portfolio-label'),
        aboutEyebrow: t('about.eyebrow'),
        curriculumTitle: t('curriculum.line-1'),
        curriculumEmphasis: t('curriculum.line-2'),
        curriculumDescription: t('curriculum.description'),
        trainersEyebrow: t('trainers.eyebrow'),
        trainersEmphasis: t('trainers.emphasis'),
    };

    const aboutDescription = asText(aboutSection?.description);
    const aboutReasons = useMemo(
        () => (aboutSection?.reasons || [])
            .map((row, index) => ({
                _key: row._key || `about-reason-${index}`,
                title: asText(row.title),
                text: asText(row.description),
            }))
            .filter((row) => row.title || row.text)
            .slice(0, 4),
        [aboutSection?.reasons],
    );
    const topicItems = useMemo(() => {
        const topics = (courseTopics || []).filter((topic) => asText(topic.title));
        if (topics.length) return topics;
        const fallbackTopics = (conditionItems || []).filter((item) => asText(item.title));
        if (fallbackTopics.length) return fallbackTopics;
        return conditions
            .map((condition) => asText(condition))
            .filter(Boolean)
            .map((condition, index) => ({
                _key: `condition-${index}`,
                title: condition,
                description: '',
            }));
    }, [courseTopics, conditionItems, conditions]);
    const topicAccordionItems = useMemo(
        () => topicItems.map((topic, index) => ({
            key: topic._key || `topic-${index}`,
            label: topic.title || '',
            body: asText(topic.description) || topic.title || '',
        })),
        [topicItems],
    );
    const curriculumModuleCount = topicItems.length;
    const curriculumEyebrow = curriculumModuleCount > 0
        ? t('curriculum.eyebrow', { count: designCourseCountWord(curriculumModuleCount, locale) })
        : t('curriculum.eyebrow-prefix');

    const groupFilterLabel = (mode: GroupFilter) => t(`groups.filter-${mode}` as 'groups.filter-morning');
    const trainers = useMemo(() => {
        const fromCourse = (trainersSection?.items || []).filter((member) => member.worker_image?.asset);
        if (fromCourse.length) return fromCourse;

        const linked = (home?.workers || []).filter((worker) => worker.courses?.includes(_id));
        if (linked.length) return linked;

        return (home?.workers || []).filter((member) => member.worker_image?.asset);
    }, [trainersSection?.items, home?.workers, _id]);
    const selectedPosts = useMemo(() => {
        const fromCourse = (courseBlogPosts || []).filter((post) => post?.slug && post?.title);
        if (fromCourse.length) return fromCourse;
        return (home?.blog_section?.posts || []).filter((post) => post?.slug && post?.title);
    }, [courseBlogPosts, home?.blog_section?.posts]);
    const projectsSection = useMemo((): PROJECTS_SECTION | undefined => {
        const description = courseSelectedWork?.description
            || home?.projects_section?.description
            || '';
        const fromPicks = mapPortfolioPicksToProjects(courseSelectedWork?.portfolio_picks);
        if (fromPicks.length) {
            return { description, projects: fromPicks };
        }
        const courseLabel = title;
        const fromOwnPortfolios = mapCoursePortfoliosToProjects(
            coursePortfolios,
            courseSlug || name,
            courseLabel,
        );
        if (fromOwnPortfolios.length) {
            return { description, projects: fromOwnPortfolios };
        }
        return home?.projects_section;
    }, [
        courseSelectedWork,
        coursePortfolios,
        courseSlug,
        name,
        title,
        home?.projects_section,
    ]);

    const priceItems = (prices?.items || []).filter((item) => item.title || item.amount);
    const whyItems = (why?.items || []).filter((item) => item.title || item.description);
    const groupItems = useMemo(() => groups?.groups || [], [groups?.groups]);
    const faqItems = useMemo(
        () => (faq?.items || []).filter((item) => item.question),
        [faq?.items],
    );
    const faqAccordionItems = useMemo(
        () => faqItems.map((item) => ({
            key: item._key,
            label: item.question || '',
            body: item.answer,
        })),
        [faqItems],
    );
    const trainersHeading = useMemo(
        () => ({
            eyebrow: copy.trainersEyebrow,
            title,
            emphasis: copy.trainersEmphasis,
        }),
        [copy.trainersEyebrow, copy.trainersEmphasis, title],
    );
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

            {(aboutSlides.length > 0 || aboutDescription || aboutReasons.length > 0) && (
                <section className={styles.about}>
                    {aboutSlides.length > 0 && <AboutSlider slides={aboutSlides} title={title} />}
                    <div className={styles.aboutCopy}>
                        <BlockHeading eyebrow={copy.aboutEyebrow} title={title} emphasis={copy.emphasis} />
                        {aboutDescription && (
                            <p className={cn(styles.aboutText, designFont.medium)}>{aboutDescription}</p>
                        )}
                        {aboutReasons.length > 0 && (
                            <ul className={styles.points}>
                                {aboutReasons.map((point) => (
                                    <li key={point._key} className={styles.point}>
                                        {point.title && (
                                            <h3 className={cn(styles.pointTitle, designFont.medium)}>{point.title}</h3>
                                        )}
                                        {point.text && <p className={styles.pointText}>{point.text}</p>}
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
                        items={topicAccordionItems}
                        open={openTopic}
                        onToggle={setOpenTopic}
                    />
                </section>
            )}

            {trainers.length > 0 && (
                <div className={styles.trainers}>
                    <Staff
                        workers={trainers}
                        heading={trainersHeading}
                    />
                </div>
            )}

            {priceItems.length > 0 && (
                <section className={styles.block}>
                    <BlockHeading eyebrow={t('price.eyebrow')} title={t('price.line-1')} emphasis={t('price.line-2')} inline />
                    <ul className={styles.priceGrid}>
                        {priceItems.map((item) => (
                            <li key={item._key} className={styles.priceCard}>
                                <div className={styles.priceColMain}>
                                    <span className={styles.priceDot} aria-hidden />
                                    <div className={styles.priceName}>
                                        {item.title && (
                                            <p className={cn(styles.priceTitle, designFont.medium)}>{item.title}</p>
                                        )}
                                        {item.subtitle && <p className={styles.priceSub}>{item.subtitle}</p>}
                                    </div>
                                </div>
                                <div className={styles.priceColDuration}>
                                    {item.duration && (
                                        <p className={cn(styles.priceDuration, designFont.medium)}>{item.duration}</p>
                                    )}
                                </div>
                                <div className={styles.priceColAmount}>
                                    {item.amount && (
                                        <p className={cn(styles.priceAmount, designFont.medium)}>{item.amount}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {whyItems.length > 0 && (
                <section className={styles.block}>
                    <BlockHeading
                        eyebrow={t('why.eyebrow')}
                        title={t('why.line-1')}
                        line2Prefix={t('why.line-2')}
                        emphasis={t('why.line-2-emphasis')}
                    />
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
                    <BlockHeading eyebrow={t('groups.eyebrow')} title={t('groups.line-1')} emphasis={t('groups.line-2')} inline />
                    {groupModes.length > 0 && (
                        <div className={styles.filters} role="tablist">
                            <button
                                type="button"
                                className={cn(styles.chip, groupFilter === 'all' && styles.chipActive)}
                                onClick={() => setGroupFilter('all')}
                            >
                                {t('groups.filter-all')}
                            </button>
                            {groupModes.map((mode) => (
                                <button
                                    key={mode}
                                    type="button"
                                    className={cn(styles.chip, groupFilter === mode && styles.chipActive)}
                                    onClick={() => setGroupFilter(mode)}
                                >
                                    {groupFilterLabel(mode)}
                                </button>
                            ))}
                        </div>
                    )}
                    <ul className={styles.groupGrid}>
                        {visibleGroups.map((item) => (
                            <li key={item._key} className={styles.groupCard}>
                                {item.shift && <span className={styles.groupBadge}>{item.shift}</span>}
                                {item.start_date && (
                                    <div className={styles.groupDate}>
                                        <span>{t('groups.start-date-label')}</span>
                                        <p className={cn(designFont.medium)}>{item.start_date}</p>
                                    </div>
                                )}
                                <dl className={styles.groupMeta}>
                                    {item.schedule && (
                                        <div>
                                            <dt>{t('groups.schedule-label')}</dt>
                                            <dd>{item.schedule}</dd>
                                        </div>
                                    )}
                                    {item.time && (
                                        <div>
                                            <dt>{t('groups.time-label')}</dt>
                                            <dd>{item.time}</dd>
                                        </div>
                                    )}
                                    {item.duration && (
                                        <div>
                                            <dt>{t('groups.duration-label')}</dt>
                                            <dd>{item.duration}</dd>
                                        </div>
                                    )}
                                </dl>
                                <div className={styles.groupFooter}>
                                    <div>
                                        <span>{t('groups.price-label')}</span>
                                        {item.price && <p className={cn(designFont.medium)}>{item.price}</p>}
                                    </div>
                                    <Link href={enrollHref} className={styles.enroll}>
                                        {t('groups.enroll-label')}
                                        <LuArrowUpRight aria-hidden />
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {faqItems.length > 0 && (
                <section className={styles.block}>
                    <BlockHeading eyebrow={t('faq.eyebrow')} title={t('faq.line-1')} emphasis={t('faq.line-2')} />
                    <Accordion
                        items={faqAccordionItems}
                        open={openFaq}
                        onToggle={setOpenFaq}
                    />
                </section>
            )}

            <div className={styles.shared}>
                <Projects section={projectsSection} />
                <Blog posts={selectedPosts} layout="cards" />
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
                    <div
                        id={panelId}
                        className={styles.accordionPanel}
                        role="region"
                        hidden={!isOpen}
                    >
                        <div className={styles.accordionPanelInner}>
                            <p className={styles.accordionBody}>{item.body}</p>
                        </div>
                    </div>
                </li>
            );
        })}
    </ul>
);

const BlockHeading = ({
    eyebrow,
    title,
    emphasis,
    line2Prefix,
    inline = false,
}: {
    eyebrow?: string;
    title?: string;
    emphasis?: string;
    /** Second heading line before emphasis (e.g. "this " + emphasis "course."). */
    line2Prefix?: string;
    inline?: boolean;
}) => {
    if (!eyebrow && !title && !emphasis && !line2Prefix) return null;

    const splitSecondLine = line2Prefix !== undefined;

    return (
        <header className={styles.blockHead}>
            {eyebrow && (
                <p className={styles.eyebrow}>
                    <span className={styles.mark} aria-hidden />
                    {eyebrow}
                </p>
            )}
            {(title || emphasis || line2Prefix) && (
                <h2 className={cn(styles.sectionTitle, inline && styles.sectionTitleInline, designFont.serif)}>
                    {title && <span>{splitSecondLine ? title : keepWords(title)}</span>}
                    {splitSecondLine ? (
                        <span>
                            {line2Prefix}
                            {emphasis && <em className={styles.emphasis}>{emphasis}</em>}
                        </span>
                    ) : (
                        emphasis && <span className={styles.emphasis}>{keepWords(emphasis)}</span>
                    )}
                </h2>
            )}
        </header>
    );
};

export default React.memo(Course);
