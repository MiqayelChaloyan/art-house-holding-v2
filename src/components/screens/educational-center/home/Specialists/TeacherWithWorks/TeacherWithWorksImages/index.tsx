'use client'

import React from 'react';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import NextImage from '@/src/components/components/image';

import Button from '@/src/lib/ui/Button';
import { Pages } from '@/src/constants/pages';
import { ArianAMU } from '@/src/constants/font';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { ImagePath } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    specialist: SPECIALIST;
};

const TeacherWithWorksImages = ({ specialist }: Readonly<Props>) => {
    const locale = useLocale();
    const path: ImagePath = urlForImage(specialist.specialists_section_image);
    const courseHref = specialist.courseSlug
        ? `/${locale}${Pages.EDUCATIONAL_HOME}/${specialist.courseSlug}`
        : null;

    const imageGallery = specialist?.specialists_section_images.map((image: any, index: number) => {
        const path: ImagePath = urlForImage(image);

        return (
            <NextImage
                key={image._key}
                src={path?.src}
                alt={image._key}
                className={styles.work}
                width={500}
                height={500}
                style={{ objectFit: 'cover' }}
            />
        );
    });

    return (
        <div className={styles['teacher-with-works-images']}>
            <div className={styles.column}>
                <NextImage
                    key={specialist?._key}
                    src={path?.src}
                    alt={specialist.specialists_section_image?.alt}
                    className={styles.image}
                    width={500}
                    height={500}
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className={styles.column}>
                <div className={styles.header}>
                   <div className={styles.user}>
                   <div className={styles.point} />
                    <h2 className={cn(styles.teacher, ArianAMU.className)}>
                        {specialist?.title}
                    </h2>
                   </div>
                    {courseHref ? (
                        <Link href={courseHref} className={styles.courseLink}>
                            <Button
                                className={cn(styles.button, ArianAMU.className)}
                                text={specialist?.course_name}
                            />
                        </Link>
                    ) : (
                        <Button
                            className={cn(styles.button, ArianAMU.className)}
                            text={specialist?.course_name}
                        />
                    )}
                </div>
                <div className={styles.gallery}>
                    {imageGallery}
                </div>
            </div>
        </div>
    );
};

export default React.memo(TeacherWithWorksImages);
