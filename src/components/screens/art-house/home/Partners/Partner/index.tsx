'use client'

import React from 'react';

import NextImage from '@/src/components/components/image';

import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import styles from './styles.module.sass';


const Partner = ({ _id, logo }: Readonly<PARTNER_Result>) => {
    const path: ImagePath = urlForImage(logo);

    return (
        <div key={_id} className={styles.partner}>
            <div className={styles.image_container}>
                <NextImage
                    src={path?.src}
                    alt={logo?.alt}
                    className={styles.image}
                    width={500}
                    height={500}
                />
            </div>
        </div>
    );
};

export default React.memo(Partner);
