'use client'

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Button from '@/src/lib/ui/Button';
import { Arial, Inter } from '@/src/constants/font';

import NextImage from '@/src/components/components/image';
import Container from '@/src/components/components/container';
import Fancybox from '@/src/components/components/fancybox';
import { options } from '@/src/components/components/fancybox/options';

import { urlForImage } from '@/sanity/imageUrlBuilder';
import { ImagePath } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    course: STUDENT_WORK[];
};

const StudentWork = ({ course }: Readonly<Props>) => {
    const [initialLoadCourses, setInitialLoadCourses] = useState<number>(8);
    const t = useTranslations();

    useEffect(() => setInitialLoadCourses(8), [course]);

    const images = course?.slice(0, initialLoadCourses).map((item: STUDENT_WORK) => {
        const path: ImagePath = urlForImage(item);

        return (
            <Link key={item._key} data-fancybox="gallery" href={path?.src}>
                <NextImage
                    src={path?.src}
                    alt={item?.alt}
                    className={styles.work_img}
                    width={500}
                    height={500}
                    style={{ objectFit: 'cover' }}
                />
            </Link>
        );
    });

    const handleLoad = () => setInitialLoadCourses(initialLoadCourses + 4);
    const handleBackLoad = () => setInitialLoadCourses(initialLoadCourses - 4);

    return (
        <section id='student-work' className={styles.container}>
            <div className={styles.triangle} />
            <Container className='container'>
                <h1 className={cn(styles.title, Inter.className)}>
                    {t('sections.student-work')}
                </h1>
                <div className={styles.student_work}>
                    <Fancybox options={options}>
                        {images}
                    </Fancybox>
                </div>
                <div className={styles.block_buttons}>
                    {course.length > 8 && course.length !== initialLoadCourses &&
                        <div className={styles.btn_group}>
                            <Button
                                className={cn(styles['view-more-btn'], Arial.className)}
                                text={course.length >= initialLoadCourses ? t('buttons.view-more') : t('buttons.show-less')}
                                onClick={course.length >= initialLoadCourses ? handleLoad : handleBackLoad}
                            />
                        </div>
                    }
                    {course.length === initialLoadCourses && course.length > 8 &&
                        <div className={styles.btn_group}>
                            <Button
                                className={cn(styles['view-more-btn'], Arial.className)}
                                text={t('buttons.show-less')}
                                onClick={handleBackLoad}
                            />
                        </div>
                    }
                </div>
            </Container>
        </section>
    );
};

export default React.memo(StudentWork);