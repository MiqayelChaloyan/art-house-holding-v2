'use client'

import React from 'react';

import NextImage from '@/src/components/components/image';

import { Arial } from '@/src/constants/font';
import { ImagePath } from '@/src/types/general';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import { WORKER } from '@/src/types/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface CardProps {
    data: WORKER[];
    dataIndex: number;
    isCenterSlide: boolean;
};

const Card = ({ data, dataIndex, isCenterSlide }: Readonly<CardProps>) => {
    const { _key, worker, profession, worker_image } = data[dataIndex];
    const path: ImagePath = urlForImage(worker_image);

    return (
        <div
            key={_key}
            style={{ userSelect: 'none' }}
            className={cn(styles.card, isCenterSlide && styles['active-slide'])}
        >
            <NextImage
                src={path?.src}
                alt={worker_image?.alt}
                className=''
                width={500}
                height={500}
                draggable={false}
            />
            <div className={styles.overlay}>
                <div className={styles.items} />
                <div className={cn(styles.worker, styles.items)}>
                    <p className={Arial.className}>{worker}</p>
                    <hr />
                </div>
                <div className={cn(styles.profession, styles.items)}>
                    <p className={Arial.className}>{profession}</p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Card);