'use client'

import React from 'react';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import NextImage from '@/src/components/components/image';

import { InstrumentSerif, Inter, Montserrat } from '@/src/constants/font';
import { Pages } from '@/src/constants/pages';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    section?: PROJECTS_SECTION;
};

const Projects = ({ section }: Readonly<Props>) => {
    const locale = useLocale();

    const copy = {
        eyebrow: section?.eyebrow || '',
        line1: section?.line_1 || '',
        line2: section?.line_2 || '',
        description: section?.description || '',
    };

    const projects = (section?.projects || []).filter((item) => item?.image?.asset).slice(0, 10);
    if (!projects.length) return null;

    return (
        <section id="selected-work" className={cn(styles.section, Inter.className)}>
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <div>
                        <p className={styles.eyebrow}>
                            <span className={styles.mark} aria-hidden />
                            {copy.eyebrow}
                        </p>
                        <h2 className={cn(styles.headline, locale === 'am' && styles.headlineAm, locale === 'ru' && styles.headlineRu, InstrumentSerif.className)}>
                            <span>{copy.line1}</span>
                            <span className={styles.emphasis}>{copy.line2}</span>
                        </h2>
                    </div>
                    <p className={styles.lede}>{copy.description}</p>
                </header>

                <ul className={styles.grid}>
                    {projects.map((project, index) => {
                        const image = urlForImage(project.image, index === 0 || index === 3 ? 1400 : 1000);
                        const href = project.href
                            ? (project.href.startsWith('/') ? `/${locale}${project.href}` : project.href)
                            : `/${locale}${Pages.DESIGN_PORTFOLIOS}`;
                        const variant = index === 0 ? 'featured' : index === 3 ? 'wide' : 'small';

                        return (
                            <li key={project._key} className={cn(styles.cell, styles[variant])}>
                                <Link href={href} className={styles.card}>
                                    {image?.src && (
                                        <NextImage
                                            src={image.src}
                                            alt={project.image?.alt || project.title}
                                            className={styles.image}
                                            width={image.width}
                                            height={image.height}
                                            sizes={variant === 'wide' ? '100vw' : '(max-width: 860px) 100vw, 648px'}
                                        />
                                    )}
                                    <span className={styles.shade} aria-hidden />
                                    {project.category && <span className={styles.chip}>{project.category}</span>}
                                    <span className={styles.meta}>
                                        {project.year && <span className={styles.year}>{project.year}</span>}
                                        <span className={cn(styles.title, Montserrat.className)}>{project.title}</span>
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default React.memo(Projects);
