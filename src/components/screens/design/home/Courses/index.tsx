'use client'

import React from 'react';

import Course from './Course';

import { InstrumentSerif, Inter } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    courses: Array<HOME_COURSES | COURSES_DESIGN_QUERYResult>;
    section?: COURSES_SECTION;
    numbered?: boolean;
    page?: boolean;
};

const Courses = ({ courses, section, numbered, page }: Readonly<Props>) => {
    const copy = {
        eyebrow: section?.eyebrow || '',
        line1: section?.line_1 || '',
        line2: section?.line_2 || '',
    };

    return (
        <section id="design-courses" className={cn(styles.section, page && styles.page, Inter.className)}>
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {copy.eyebrow}
                    </p>
                    {page ? (
                        <h1 className={cn(styles.headline, InstrumentSerif.className)}>
                            <span>{copy.line1}</span>
                            <span className={styles.emphasis}>{copy.line2}</span>
                        </h1>
                    ) : (
                        <h2 className={cn(styles.headline, InstrumentSerif.className)}>
                            <span>{copy.line1}</span>
                            <span className={styles.emphasis}>{copy.line2}</span>
                        </h2>
                    )}
                </header>
                <ul className={styles.grid}>
                    {courses?.slice(0, 10).map((course, index) => (
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
