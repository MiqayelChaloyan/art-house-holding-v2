'use client'

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';

import Button from '@/src/lib/ui/Button';
import { Arial, Inter } from '@/src/constants/font';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { ContentCourse as Props } from '@/src/types/educational-center';
import { ImagePath } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


const Content = ({ content, isReadMore, minimumHeight }: Props) => (
    <p className={cn(styles.content, Inter.className)}>{isReadMore ? content.slice(0, minimumHeight) + '...' : content}</p>
);

interface Lesson {
    key?: string;
    course: LESSON;
};

const Course = ({ course }: Readonly<Lesson>) => {
    const [isReadMore, setIsReadMore] = useState<boolean>(true);
    const t = useTranslations();
    const minimumHeight = 200;

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <div className={styles.left}>
            <h2 className={cn(styles.subtitle, Inter.className)}>{course.subtitle}</h2>
            <Content content={course.content} isReadMore={isReadMore} minimumHeight={minimumHeight} />
            <div className={styles.group}>
                <div className={styles['btn-group']}>
                    <Button
                        text={isReadMore ? t('buttons.view-more') : t('buttons.show-less')}
                        className={cn(styles.button, styles['view-more-btn'], Arial.className)}
                        onClick={toggleReadMore}
                    />
                </div>
            </div>
        </div>
    )
};

const Gallery = ({ course }: Lesson) => {
    const leftPath: ImagePath = urlForImage(course.image_one);
    const rightPath: ImagePath = urlForImage(course.image_two);

    return (
        <div className={styles.right}>
            <NextImage
                src={leftPath.src}
                alt={course.image_one.alt}
                className={styles.image}
                width={500}
                height={500}
            />
            <NextImage
                src={rightPath.src}
                alt={course.image_two.alt}
                className={styles.image}
                width={500}
                height={500}
            />
        </div>
    )
};

const CourseMobileCard = ({ course }: Lesson) => {
    const leftPath: ImagePath = urlForImage(course.image_one);
    const rightPath: ImagePath = urlForImage(course.image_two);

    return (
        <div className={styles.card}>
            <div className={styles.right}>
                <NextImage
                    src={leftPath.src}
                    alt={course.image_one.alt}
                    className={styles.image}
                    width={500}
                    height={500}
                />
                <NextImage
                    src={rightPath.src}
                    alt={course.image_two.alt}
                    className={styles.image}
                    width={500}
                    height={500}
                />
            </div>
            <Course course={course} />
        </div>
    )
};

export {
    Course,
    Gallery,
    CourseMobileCard
};