'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';

import { designFont } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';
import { Pages } from '@/src/constants/pages';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import PortfolioCardSkeleton from './PortfolioCardSkeleton';

import styles from './styles.module.sass';


interface Props {
    courses: COURSES_DESIGN_QUERYResult[];
};

const PAGE_SIZE = 9;
const LOAD_MORE_MS = 720;

const resolveFilterSlug = (courses: COURSES_DESIGN_QUERYResult[], raw: string | null) => {
    if (!raw) return null;
    const decoded = decodeURIComponent(raw).replace(/_/g, ' ');
    const bySlug = courses.find((course) => course.slug === decoded);
    if (bySlug) return bySlug.slug;
    const byName = courses.find((course) => course.name === decoded);
    if (byName?.slug) return byName.slug;
    return null;
};

const Portfolios = ({ courses }: Readonly<Props>) => {
    const t = useTranslations('portfolios-page');
    const searchParams = useSearchParams();
    const locale = useLocale();
    const queryCourse = searchParams.get('course') || searchParams.get('name');
    const [activeCourseSlug, setActiveCourseSlug] = useState<string | null>(() => (
        resolveFilterSlug(courses, queryCourse)
    ));
    const [visible, setVisible] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        setActiveCourseSlug(resolveFilterSlug(courses, queryCourse));
        setLoadingMore(false);
    }, [courses, queryCourse]);

    const setCourseFilter = useCallback((slug: string | null) => {
        setActiveCourseSlug(slug);
        setVisible(PAGE_SIZE);
        setLoadingMore(false);
        const base = `/${locale}${Pages.DESIGN_PORTFOLIOS}`;
        const nextUrl = slug ? `${base}?course=${encodeURIComponent(slug)}` : base;
        window.history.replaceState(null, '', nextUrl);
    }, [locale]);

    const items = useMemo(() => {
        const selected = activeCourseSlug
            ? courses.filter((course) => course.slug === activeCourseSlug)
            : courses;

        return selected.flatMap((course) => (
            (course.portfolios || []).map((project) => ({
                course,
                project,
            }))
        ));
    }, [courses, activeCourseSlug]);

    const shown = items.slice(0, visible);
    const skeletonCount = Math.min(PAGE_SIZE, Math.max(0, items.length - visible));

    const loadMore = useCallback(() => {
        if (loadingMore || visible >= items.length) return;
        setLoadingMore(true);
        window.setTimeout(() => {
            setVisible((count) => Math.min(count + PAGE_SIZE, items.length));
            setLoadingMore(false);
        }, LOAD_MORE_MS);
    }, [items.length, loadingMore, visible]);

    return (
        <section className={cn(styles.section, designFont.ui)}>
            <div className={styles.wrap}>
                <div className={styles.top}>
                    <header>
                        <p className={styles.eyebrow}>
                            <span className={styles.mark} aria-hidden />
                            {t('eyebrow')}
                        </p>
                        <h1 className={cn(styles.headline, designFont.serif)}>
                            <span>{keepWords(t('line-1'))}</span>
                            <span className={styles.emphasis}>{keepWords(t('line-2'))}</span>
                        </h1>
                    </header>
                    <nav className={styles.filters} role="tablist" aria-label={t('eyebrow')}>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={!activeCourseSlug}
                            className={cn(styles.chip, styles.chipAll, !activeCourseSlug && styles.chipActive)}
                            onClick={() => setCourseFilter(null)}
                        >
                            {t('all')}
                        </button>
                        {courses.map((course) => {
                            const isActive = activeCourseSlug === course.slug;
                            return (
                                <button
                                    key={course._id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={cn(styles.chip, isActive && styles.chipActive)}
                                    onClick={() => setCourseFilter(course.slug)}
                                >
                                    {course.course_name || course.name}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {shown.length === 0 ? (
                    <p className={styles.empty}>{t('empty')}</p>
                ) : (
                    <ul className={styles.grid} aria-busy={loadingMore}>
                        {shown.map(({ course, project }) => {
                            const image = project.image ? urlForImage(project.image, 900) : undefined;
                            const href = `/${locale}${Pages.DESIGN_PORTFOLIOS}/${encodeURIComponent(course.slug)}#${encodeURIComponent(project._key)}`;

                            return (
                                <li key={project._key} className={styles.gridItem}>
                                    <Link href={href} className={styles.card}>
                                        <span className={styles.media}>
                                            {image?.src && (
                                                <NextImage
                                                    src={image.src}
                                                    alt={project.image?.alt || project.author || course.course_name || ''}
                                                    className={styles.image}
                                                    width={image.width}
                                                    height={image.height}
                                                    sizes="(max-width: 640px) 100vw, 418px"
                                                />
                                            )}
                                        </span>
                                        <span className={cn(styles.author, designFont.medium)}>
                                            {project.author}
                                        </span>
                                        <span className={cn(styles.course, designFont.medium)}>
                                            {course.course_name}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                        {loadingMore && skeletonCount > 0 && Array.from({ length: skeletonCount }, (_, index) => (
                            <PortfolioCardSkeleton key={`portfolio-skeleton-${index}`} index={index} />
                        ))}
                    </ul>
                )}

                {visible < items.length && (
                    <button
                        type="button"
                        className={cn(styles.more, loadingMore && styles.moreLoading)}
                        onClick={loadMore}
                        disabled={loadingMore}
                        aria-busy={loadingMore}
                    >
                        {loadingMore ? t('loading-more') : t('view-more')}
                    </button>
                )}
            </div>
        </section>
    );
};

export default React.memo(Portfolios);
