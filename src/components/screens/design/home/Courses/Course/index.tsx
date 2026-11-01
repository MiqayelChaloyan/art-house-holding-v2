'use client'

import React from 'react';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { LuArrowUpRight } from 'react-icons/lu';

import NextImage from '@/src/components/components/image';

import { Montserrat } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';

import cn from 'classnames';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import styles from './styles.module.sass';


interface CourseProps {
    course: HOME_COURSES | COURSES_DESIGN_QUERYResult;
    index?: number;
};

const Course = ({ course, index }: Readonly<CourseProps>) => {
    const locale = useLocale();

    const imageSource = ('card_image' in course && course.card_image) || course.gallery_of_course?.[0];
    const image = imageSource ? urlForImage(imageSource, 848) : undefined;
    const description = ('card_description' in course && course.card_description)
        || ('about_course' in course && course.about_course)
        || ('conditions' in course && course.conditions?.[0])
        || '';
    const duration = 'duration' in course ? course.duration : undefined;
    const level = 'level' in course ? course.level : undefined;
    const href = course.slug ? `/${locale}/design/${course.slug}` : `/${locale}/design#design-courses`;
    const courseName = course.course_name ?? '';
    const imageAlt = imageSource?.alt || courseName;

    return (
        <article className={styles.card}>
            <Link href={href} className={styles.media} aria-label={courseName}>
                {typeof index === 'number' && (
                    <span className={styles.badge}>N°{String(index + 1).padStart(2, '0')}</span>
                )}
                {image?.src && (
                    <NextImage
                        src={image.src}
                        alt={imageAlt}
                        className={styles.image}
                        width={image.width}
                        height={image.height}
                        sizes="(max-width: 640px) 100vw, 424px"
                    />
                )}
            </Link>
            <div className={styles.body}>
                <div className={styles.titleRow}>
                    <h3 className={cn(styles.title, Montserrat.className)}>
                        <Link href={href}>{keepWords(courseName)}</Link>
                    </h3>
                    <Link href={href} className={styles.iconBtn} aria-label={courseName}>
                        <LuArrowUpRight aria-hidden />
                    </Link>
                </div>
                {description && <p className={styles.description}>{description}</p>}
                <footer className={styles.footer}>
                    <span className={styles.duration}>{duration || '\u00A0'}</span>
                    <span className={styles.level}>{level || '\u00A0'}</span>
                </footer>
            </div>
        </article>
    );
};

export default React.memo(Course);
