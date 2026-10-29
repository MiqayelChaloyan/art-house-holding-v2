'use client'

import React from 'react';

import NextImage from '@/src/components/components/image';

import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import styles from './styles.module.sass';


interface Props {
    partner: PARTNER_Result;
};

const Partner = ({ partner }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(partner?.logo);

    return (
        <div className={styles.partner}>
            <div className={styles.logo}>
                <NextImage
                    src={path?.src}
                    alt={partner.logo.alt}
                    className={styles.svg_icon}
                    width={500}
                    height={500}
                />
            </div>
        </div>
    );
};

export default React.memo(Partner);