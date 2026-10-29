'use client'

import React, { useCallback } from 'react';

import { useTranslations } from 'next-intl';

import Course from './Course';

import { Arial } from '@/src/constants/font';
import { Titles } from '@/src/constants';

import useWindowSize from '@/src/hooks/useWindowSize';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    courses: HOME_COURSES[];
};

const Courses = ({ courses }: Readonly<Props>) => {
    const t = useTranslations('navigation');
    const windowSize = useWindowSize();

    const determinePosition = useCallback((index: number) => {
        return index % 2 === 0 && (windowSize.width > 780 || windowSize.width === undefined) ? 'right' : 'left';
    }, [windowSize]);

    return (
        <section id='design-courses' className={styles['design-courses']}>
            <div className={styles.titles}>
                <div>
                    <div className={cn(styles['title-line'], styles['back-line'])} />
                    <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.courses}</h2>
                </div>
                <div className={styles['bottom-title']}>
                    <h1 className={cn(styles.title, Arial.className)}>{t('courses')}</h1>
                    <div className={cn(styles['title-line'], styles['bottom-line'])} />
                </div>
            </div>
            {courses?.map((course, index) => (
                <Course
                    key={course._key}
                    course={course}
                    position={determinePosition(index)}
                />
            ))}
        </section>
    )
};

export default React.memo(Courses);