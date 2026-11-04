'use client';

import React, { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';

import { designFont } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';
import { Pages } from '@/src/constants/pages';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    courses: COURSES_DESIGN_QUERYResult[];
};

const PAGE_SIZE = 9;

const Portfolios = ({ courses }: Readonly<Props>) => {
    const t = useTranslations('portfolios-page');
    const searchParams = useSearchParams();
    const locale = useLocale();
    const property = searchParams.get('name');
    const decodedProperty = property ? decodeURIComponent(property).replace(/_/g, ' ') : '';
    const [visible, setVisible] = useState(PAGE_SIZE);

    useEffect(() => {
        setVisible(PAGE_SIZE);
    }, [decodedProperty]);

    const items = useMemo(() => {
        const selected = decodedProperty
            ? courses.filter((course) => course.name === decodedProperty)
            : courses;

        return selected.flatMap((course) => (
            (course.portfolios || []).map((project) => ({
                course,
                project,
            }))
        ));
    }, [courses, decodedProperty]);

    const shown = items.slice(0, visible);

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
                    <nav className={styles.filters} aria-label={t('eyebrow')}>
                        <Link
                            href={`/${locale}${Pages.DESIGN_PORTFOLIOS}`}
                            scroll={false}
                            className={cn(styles.chip, styles.chipAll, !decodedProperty && styles.chipActive)}
                        >
                            {t('all')}
                        </Link>
                        {courses.map((course) => (
                            <Link
                                key={course._id}
                                href={{
                                    pathname: `/${locale}${Pages.DESIGN_PORTFOLIOS}`,
                                    query: { name: course.name },
                                }}
                                scroll={false}
                                className={cn(styles.chip, decodedProperty === course.name && styles.chipActive)}
                            >
                                {course.course_name || course.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {shown.length === 0 ? (
                    <p className={styles.empty}>{t('empty')}</p>
                ) : (
                    <ul className={styles.grid}>
                        {shown.map(({ course, project }) => {
                            const image = project.image ? urlForImage(project.image, 900) : undefined;
                            const href = `/${locale}${Pages.DESIGN_PORTFOLIOS}/${encodeURIComponent(course.slug)}#${encodeURIComponent(project._key)}`;

                            return (
                                <li key={project._key}>
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
                    </ul>
                )}

                {visible < items.length && (
                    <button type="button" className={styles.more} onClick={() => setVisible((count) => count + PAGE_SIZE)}>
                        {t('view-more')}
                    </button>
                )}
            </div>
        </section>
    );
};

export default React.memo(Portfolios);
