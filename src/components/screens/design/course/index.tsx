'use client'

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LuArrowUpRight } from 'react-icons/lu';

import NextImage from '@/src/components/components/image';
import PortfolioImageCard from '@/src/lib/ui/portfolio-card';

import { Pages } from '@/src/constants/pages';
import { InstrumentSerif, Inter, Montserrat } from '@/src/constants/font';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    locale: string;
    course: COURSES_DESIGN_QUERYResult;
};

const Course = ({ locale, course }: Readonly<Props>) => {
    const t = useTranslations('course-page');
    const {
        gallery_of_course,
        course_name,
        conditions = [],
        guides = [],
        name,
        portfolios,
        ogDescription,
        slug,
    } = course;

    const portrait = gallery_of_course?.[0];
    const aboutSource = gallery_of_course?.[1] || portrait;
    const image = portrait ? urlForImage(portrait, 1040) : undefined;
    const aboutImage = aboutSource ? urlForImage(aboutSource, 1040) : undefined;
    const intro = ogDescription || conditions[0] || '';
    const facts = (ogDescription ? conditions : conditions.slice(1)).slice(0, 4);
    const latestProjects = portfolios?.slice(Math.max(portfolios.length - 4, 0)) ?? [];
    const title = course_name || name;

    return (
        <article className={cn(styles.page, Inter.className)}>
            <section className={styles.hero}>
                <div className={styles.copy}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {t('eyebrow')} · {name}
                    </p>
                    <h1 className={cn(styles.headline, InstrumentSerif.className)}>{title}</h1>
                    {intro && <p className={cn(styles.intro, Montserrat.className)}>{intro}</p>}
                    <div className={styles.actions}>
                        <Link href={`/${locale}${Pages.DESIGN_COURSES}`} className={styles.primary}>
                            {t('explore')}
                            <LuArrowUpRight aria-hidden />
                        </Link>
                        <Link
                            href={{
                                pathname: `/${locale}${Pages.DESIGN_PORTFOLIOS}`,
                                query: { name },
                            }}
                            className={styles.secondary}
                        >
                            {t('portfolio')}
                            <LuArrowUpRight aria-hidden />
                        </Link>
                    </div>
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
                        <p className={styles.eyebrow}>
                            <span className={styles.mark} aria-hidden />
                            {t('about-eyebrow')}
                        </p>
                        <h2 className={cn(styles.sectionTitle, InstrumentSerif.className)}>
                            <span>{t('about-title')}</span>
                            <span className={styles.emphasis}>{t('about-emphasis')}</span>
                        </h2>
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
                    <header className={styles.curriculumHead}>
                        <div>
                            <p className={styles.eyebrow}>
                                <span className={styles.mark} aria-hidden />
                                {t('curriculum-eyebrow')}
                            </p>
                            <h2 className={cn(styles.sectionTitle, InstrumentSerif.className)}>
                                <span>{t('curriculum-title')}</span>
                                <span className={styles.emphasis}>{t('curriculum-emphasis')}</span>
                            </h2>
                        </div>
                    </header>
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

            {latestProjects.length > 0 && (
                <section className={styles.work}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {t('portfolio-eyebrow')}
                    </p>
                    <h2 className={cn(styles.sectionTitle, InstrumentSerif.className)}>
                        <span>{t('portfolio-title')}</span>
                        <span className={styles.emphasis}>{t('portfolio-emphasis')}</span>
                    </h2>
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
                    <Link
                        href={{
                            pathname: `/${locale}${Pages.DESIGN_PORTFOLIOS}`,
                            query: { name },
                        }}
                        className={styles.secondary}
                    >
                        {t('portfolio')}
                        <LuArrowUpRight aria-hidden />
                    </Link>
                </section>
            )}
        </article>
    );
};

export default React.memo(Course);
