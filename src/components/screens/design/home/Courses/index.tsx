'use client'

import React from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { designCourseCountWord, DESIGN_COURSE_COUNT_MAX } from '@/src/utils/design-course-count-word';

import Course from './Course';

import { designFont } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    courses: Array<HOME_COURSES | COURSES_DESIGN_QUERYResult>;
    section?: COURSES_SECTION;
    numbered?: boolean;
    page?: boolean;
};

const Courses = ({ courses, section, numbered, page }: Readonly<Props>) => {
    const locale = useLocale();
    const pageT = useTranslations('design-courses-page');
    const courseCount = courses?.length ?? 0;
    const countWord = designCourseCountWord(courseCount, locale);
    const listLimit = page ? DESIGN_COURSE_COUNT_MAX : 10;

    const copy = page
        ? {
            eyebrow: pageT('eyebrow', { count: countWord }),
            line1: pageT('line-1'),
            line2: pageT('line-2'),
        }
        : {
            eyebrow: section?.eyebrow || '',
            line1: section?.line_1 || '',
            line2: section?.line_2 || '',
        };

    return (
        <section id="design-courses" className={cn(styles.section, page && styles.page, designFont.ui)}>
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {copy.eyebrow}
                    </p>
                    {page ? (
                        <h1 className={cn(styles.headline, designFont.serif)}>
                            <span>{keepWords(copy.line1)}</span>
                            <span className={styles.emphasis}>{keepWords(copy.line2)}</span>
                        </h1>
                    ) : (
                        <h2 className={cn(styles.headline, designFont.serif)}>
                            <span>{keepWords(copy.line1)}</span>
                            <span className={styles.emphasis}>{keepWords(copy.line2)}</span>
                        </h2>
                    )}
                </header>
                <ul className={styles.grid}>
                    {courses?.slice(0, listLimit).map((course, index) => (
                        <li key={course._key || ('slug' in course ? course.slug : index)}>
                            <Course course={course} index={numbered ? index : undefined} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default React.memo(Courses);
