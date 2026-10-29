'use client'

import React from 'react';

import { notFound, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';

import AnimationCarousel from '../AnimationCarousel';

import { Arial } from '@/src/constants/font';
import { ImagePaths } from '@/src/constants';

import { client } from '@/sanity/client';
import { COURSE_ID_QUERY } from '@/sanity/services/design-service';

import cn from 'classnames';

import styles from './styles.module.sass';


interface CourseProps {
    course: HOME_COURSES;
    position: 'left' | 'right';
};

const Course = ({ course, position }: Readonly<CourseProps>) => {
    const t = useTranslations('buttons');
    const localActive = useLocale();
    const router = useRouter();

    const { name, course_name, about_course, categories, gallery_of_course } = course;
    let modifiedName = name.replace(" ", "\n");

    const titleClass = name.length >= 30 ? 'title-large' : 'title';
    const courseNameStyles = course_name.length >= 30 ? 'design-title-large' : 'design-title';

    let aboutCourse = about_course.slice(0, 184);
    let aboutCourseStyles = aboutCourse.length > 184 ? 'content-large' : 'content';

    const boxClass = position === 'left' ? 'box-left' : 'box-right';
    const pointerClass = position === 'left' ? 'pointer-left' : 'pointer-right';
    const titlePositionClass = position === 'left' ? 'title-left' : 'title-right';
    const cornerLargeClass = position === 'left' ? 'corner-large-left' : 'corner-large-right';
    const titleCenterClass = position === 'left' ? 'title-left-position' : 'title-right-position';
    const courceNameClass = position === 'left' ? 'course-name-left-position' : 'course-name-right-position';
    const readMoreBtnClass = position === 'left' ? 'read-btn-left-position' : 'read-btn-right-position';
    const titleDesignClass = position === 'left' ? 'design-title-left' : 'design-title-right';

    const getResources = async () => {
        const _id = categories._ref;

        try {
            const data = await client.fetch(COURSE_ID_QUERY, { _id, language: localActive }, { cache: 'no-store' });
            router.push(`design/${data.slug}`);
        } catch (error) {
            notFound();
        }
    };

    return (
        <div className={cn(styles['course-card'], styles[boxClass])}>
            <div className={styles.left}>
                <div>
                    <NextImage
                        src={ImagePaths.DESIGN.staplerURL.default.src}
                        alt='stapler'
                        className={styles.stapler}
                        width={500}
                        height={500}
                    />
                    <AnimationCarousel gallery={gallery_of_course} />
                </div>
                <div className={styles[pointerClass]}>
                    <button
                        onClick={getResources}
                        className={cn(styles['read-more-button'], styles[readMoreBtnClass], Arial.className)}
                    >
                        {t('read-more')}
                    </button>
                </div>
            </div>
            <div className={styles.right}>
                <div className={cn(styles.titleCenter, styles[titleCenterClass])}>
                    <h2 className={cn(styles[titleClass], styles[titlePositionClass], Arial.className)}>
                        {modifiedName}
                    </h2>
                </div>
                <div className={styles[cornerLargeClass]}>
                    <h3 className={cn(styles[courseNameStyles], styles[courceNameClass], Arial.className)}>
                        {course_name}
                    </h3>
                </div>
                <p className={cn(styles['design-title-mobile'], styles[titleDesignClass], Arial.className)}>
                    {course_name}
                </p>
                <p className={cn(styles[aboutCourseStyles], Arial.className)}>
                    {aboutCourse}
                </p>
                <div className={styles.readViewBtn}>
                    <button
                        onClick={getResources}
                        className={cn(styles['read-more-button-mobile'], Arial.className)}
                    >
                        {t('read-more')}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Course;