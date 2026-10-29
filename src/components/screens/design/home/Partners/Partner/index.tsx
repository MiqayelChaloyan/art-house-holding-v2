'use client'

import React from 'react';

import NextImage from '@/src/components/components/image';

import { Calibri } from '@/src/constants/font';
import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


const Partner = ({
    _id,
    company_name,
    cooperation,
    implemented_projects,
    logo
}: Readonly<PARTNER_Result>) => {
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
            <p className={cn(styles.text, Calibri.className)}>{company_name}</p>
            <p className={cn(styles.text, Calibri.className)}>{cooperation}</p>
            <p className={cn(styles.text, Calibri.className)}>{implemented_projects}</p>
        </div>
    );
};

export default React.memo(Partner);
