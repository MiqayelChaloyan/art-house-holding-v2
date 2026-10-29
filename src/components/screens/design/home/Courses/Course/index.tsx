'use client'

import React from 'react';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { LuArrowUpRight } from 'react-icons/lu';

import NextImage from '@/src/components/components/image';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import styles from './styles.module.sass';


interface CourseProps {
    course: HOME_COURSES;
};

const Course = ({ course }: Readonly<CourseProps>) => {
    const locale = useLocale();

    const imageSource = course.card_image || course.gallery_of_course?.[0];
    const image = imageSource ? urlForImage(imageSource) : undefined;
    const description = course.card_description || course.about_course;
    const href = course.slug ? `/${locale}/design/${course.slug}` : `/${locale}/design#design-courses`;

    return (
        <article className={styles.card}>
            <Link href={href} className={styles.media} aria-label={course.course_name}>
                {image?.src && (
                    <NextImage
                        src={image.src}
                        alt={imageSource?.alt || course.course_name}
                        className={styles.image}
                        width={640}
                        height={640}
                    />
                )}
            </Link>
            <div className={styles.body}>
                <div className={styles.titleRow}>
                    <h3 className={styles.title}>
                        <Link href={href}>{course.course_name}</Link>
                    </h3>
                    <Link href={href} className={styles.iconBtn} aria-label={course.course_name}>
                        <LuArrowUpRight aria-hidden />
                    </Link>
                </div>
                {description && <p className={styles.description}>{description}</p>}
                <footer className={styles.footer}>
                    <span className={styles.duration}>{course.duration || '\u00A0'}</span>
                    <span className={styles.level}>{course.level || '\u00A0'}</span>
                </footer>
            </div>
        </article>
    );
};

export default React.memo(Course);
