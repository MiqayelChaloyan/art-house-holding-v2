'use client'

import React from 'react';

import NextImage from '@/src/components/components/image';

import { Arial } from '@/src/constants/font';
import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import styles from './styles.module.sass';


interface Props {
    teachers: TEACHER[];
};

const Teachers = ({ teachers }: Readonly<Props>) => (
    <div className={styles.teachers}>
        {teachers?.map((item: TEACHER) => {
            const path: ImagePath = urlForImage(item.teacher_image);
            return (
                <div key={item._key} className={styles['about-teacher']} >
                    <NextImage
                        src={path?.src}
                        alt={item?.teacher_image.alt}
                        className={styles.teacher}
                        width={500}
                        height={500}
                    />
                    <div className={styles.fullName}>
                        <h3 className={Arial.className}>{item.fullName}</h3>
                    </div>
                </div>
            );
        })}
    </div>
);

export default React.memo(Teachers);