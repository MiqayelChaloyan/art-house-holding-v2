'use client'

import React, { useMemo, useState } from 'react';

import Link from 'next/link';
import { LuArrowUpRight } from 'react-icons/lu';

import NextImage from '@/src/components/components/image';
import PortfolioImageCard from '@/src/lib/ui/portfolio-card';

import { Pages } from '@/src/constants/pages';
import { InstrumentSerif, Inter, Montserrat } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    locale: string;
    course: COURSES_DESIGN_QUERYResult;
    headings?: COURSES_SECTION;
};

const GROUP_FILTERS = ['morning', 'evening', 'online', 'offline'] as const;

const Course = ({ locale, course, headings }: Readonly<Props>) => {
    const {
        gallery_of_course,
        course_name,
        conditions = [],
        guides = [],
        name,
        portfolios,
        intro: courseIntro,
        slug,
        price_section: prices,
        why_section: why,
        groups_section: groups,
        faq_section: faq,
    } = course;

    const portrait = gallery_of_course?.[0];
    const aboutSource = gallery_of_course?.[1] || portrait;
    const image = portrait ? urlForImage(portrait, 1040) : undefined;
    const aboutImage = aboutSource ? urlForImage(aboutSource, 1040) : undefined;
    const intro = courseIntro || '';
    const facts = conditions.slice(0, 4);
    const copy = {
        eyebrow: headings?.detail_eyebrow || '',
        explore: headings?.explore_label || '',
        portfolio: headings?.portfolio_label || '',
        aboutEyebrow: headings?.about_eyebrow || '',
        aboutTitle: headings?.about_title || '',
        aboutEmphasis: headings?.about_emphasis || '',
        curriculumEyebrow: headings?.curriculum_eyebrow || '',
        curriculumTitle: headings?.curriculum_title || '',
        curriculumEmphasis: headings?.curriculum_emphasis || '',
        workEyebrow: headings?.work_eyebrow || '',
        workTitle: headings?.work_title || '',
        workEmphasis: headings?.work_emphasis || '',
    };
    const latestProjects = portfolios?.slice(Math.max(portfolios.length - 4, 0)) ?? [];
    const title = course_name || name;
    const priceItems = (prices?.items || []).filter((item) => item.title || item.amount);
    const whyItems = (why?.items || []).filter((item) => item.title || item.description);
    const groupItems = groups?.groups || [];
    const faqItems = (faq?.items || []).filter((item) => item.question);
    const [groupFilter, setGroupFilter] = useState('all');
    const [openFaq, setOpenFaq] = useState<string | null>(null);
    const visibleGroups = useMemo(
        () => groupItems.filter((item) => groupFilter === 'all' || item.mode === groupFilter),
        [groupItems, groupFilter],
    );
    const groupModes = GROUP_FILTERS.filter((mode) => groupItems.some((item) => item.mode === mode));
    const enrollHref = `/${locale}${Pages.DESIGN_CONTACT}`;

    return (
        <article className={cn(styles.page, Inter.className)}>
            <section className={styles.hero}>
                <div className={styles.copy}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {[copy.eyebrow, name].filter(Boolean).join(' · ')}
                    </p>
                    <h1 className={cn(styles.headline, InstrumentSerif.className)}>{keepWords(title)}</h1>
                    {intro && <p className={cn(styles.intro, Montserrat.className)}>{intro}</p>}
                    {(copy.explore || copy.portfolio) && (
                    <div className={styles.actions}>
                        {copy.explore && (
                        <Link href={`/${locale}${Pages.DESIGN_COURSES}`} className={styles.primary}>
                            {copy.explore}
                            <LuArrowUpRight aria-hidden />
                        </Link>
                        )}
                        {copy.portfolio && (
                        <Link
                            href={{
                                pathname: `/${locale}${Pages.DESIGN_PORTFOLIOS}`,
                                query: { name },
                            }}
                            className={styles.secondary}
                        >
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

            {(aboutImage?.src || facts.length > 0) && (
                <section className={styles.about}>
                    {aboutImage?.src && (
                        <div className={styles.aboutMedia}>
                            <NextImage
                                src={aboutImage.src}
                                alt={aboutSource?.alt || title}
                                className={styles.aboutImage}
                                width={aboutImage.width}
                                height={aboutImage.height}
                                sizes="(max-width: 980px) 100vw, 658px"
                            />
                        </div>
                    )}
                    <div className={styles.aboutCopy}>
                        <BlockHeading eyebrow={copy.aboutEyebrow} title={copy.aboutTitle} emphasis={copy.aboutEmphasis} />
                        {facts.length > 0 && (
                            <ul className={styles.facts}>
                                {facts.map((fact, index) => (
                                    <li key={`${index}-${fact}`} className={styles.fact}>
                                        <p className={cn(styles.factTitle, Montserrat.className)}>{fact}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            )}

            {guides.length > 0 && (
                <section className={styles.curriculum}>
                    <BlockHeading eyebrow={copy.curriculumEyebrow} title={copy.curriculumTitle} emphasis={copy.curriculumEmphasis} />
                    <ol className={styles.modules}>
                        {guides.map((guide, index) => (
                            <li key={`${index}-${guide}`} className={styles.module}>
                                <span className={cn(styles.moduleIndex, Montserrat.className)}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <p className={cn(styles.moduleTitle, Montserrat.className)}>{guide}</p>
                            </li>
                        ))}
                    </ol>
                </section>
            )}

            {priceItems.length > 0 && (
                <section className={styles.block}>
                    <BlockHeading eyebrow={prices?.eyebrow} title={prices?.line_1} emphasis={prices?.line_2} />
                    <ul className={styles.priceGrid}>
                        {priceItems.map((item) => (
                            <li key={item._key} className={styles.priceCard}>
                                <div>
                                    {item.title && <p className={cn(styles.priceTitle, Montserrat.className)}>{item.title}</p>}
                                    {item.subtitle && <p className={styles.priceSub}>{item.subtitle}</p>}
                                </div>
                                {item.amount && <p className={cn(styles.priceAmount, Montserrat.className)}>{item.amount}</p>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {whyItems.length > 0 && (
                <section className={styles.block}>
                    <BlockHeading eyebrow={why?.eyebrow} title={why?.line_1} emphasis={why?.line_2} />
                    <ul className={styles.whyGrid}>
                        {whyItems.map((item, index) => (
                            <li key={item._key} className={styles.whyItem}>
                                <span className={cn(styles.whyIndex, Montserrat.className)}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {item.title && <h3 className={cn(styles.whyTitle, Montserrat.className)}>{item.title}</h3>}
                                {item.description && <p className={styles.whyText}>{item.description}</p>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {groupItems.length > 0 && (
                <section className={styles.block}>
                    <BlockHeading eyebrow={groups?.eyebrow} title={groups?.line_1} emphasis={groups?.line_2} />
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
                                        <p className={cn(Montserrat.className)}>{item.start_date}</p>
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
                                        {item.price && <p className={cn(Montserrat.className)}>{item.price}</p>}
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
                    <ul className={styles.faq}>
                        {faqItems.map((item, index) => {
                            const isOpen = openFaq === item._key;
                            return (
                                <li key={item._key} className={cn(styles.faqItem, isOpen && styles.faqOpen)}>
                                    <button
                                        type="button"
                                        className={styles.faqButton}
                                        aria-expanded={isOpen}
                                        onClick={() => setOpenFaq(isOpen ? null : item._key)}
                                    >
                                        <span className={cn(styles.faqIndex, Montserrat.className)}>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className={cn(styles.faqQuestion, Montserrat.className)}>{item.question}</span>
                                        <span className={styles.faqToggle} aria-hidden>{isOpen ? '–' : '+'}</span>
                                    </button>
                                    {isOpen && item.answer && (
                                        <p className={styles.faqAnswer}>{item.answer}</p>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </section>
            )}

            {latestProjects.length > 0 && (
                <section className={styles.work}>
                    <BlockHeading eyebrow={copy.workEyebrow} title={copy.workTitle} emphasis={copy.workEmphasis} />
                    <div className={styles.projects}>
                        {latestProjects.map((project) => (
                            <PortfolioImageCard
                                key={project._key}
                                course_name={title}
                                project={project}
                                slug={slug}
                                type="portfolios"
                            />
                        ))}
                    </div>
                    {copy.portfolio && (
                    <Link
                        href={{
                            pathname: `/${locale}${Pages.DESIGN_PORTFOLIOS}`,
                            query: { name },
                        }}
                        className={styles.secondary}
                    >
                        {copy.portfolio}
                        <LuArrowUpRight aria-hidden />
                    </Link>
                    )}
                </section>
            )}
        </article>
    );
};

const BlockHeading = ({
    eyebrow,
    title,
    emphasis,
}: {
    eyebrow?: string;
    title?: string;
    emphasis?: string;
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
                <h2 className={cn(styles.sectionTitle, InstrumentSerif.className)}>
                    {title && <span>{keepWords(title)}</span>}
                    {emphasis && <span className={styles.emphasis}>{keepWords(emphasis)}</span>}
                </h2>
            )}
        </header>
    );
};

export default React.memo(Course);
