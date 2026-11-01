'use client'

import React from 'react';

import NextImage from '@/src/components/components/image';

import { Inter } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';

import { SlideItem as Props } from '@/src/types/design';

import cn from 'classnames';

import styles from './styles.module.sass';


const SlideItem = ({
    url,
    company_name,
    title,
    priority = false,
    loading = 'eager',
}: Readonly<Props>) => {
    return (
        <div className={styles.article}>
            {url && (
                <NextImage
                    src={url}
                    alt={company_name || title || ''}
                    className={styles.photo}
                    width={1512}
                    height={709}
                    sizes="100vw"
                    priority={priority}
                    loading={priority ? 'eager' : loading}
                />
            )}
            <div className={styles.overlay} />
            <div className={styles.container}>
                <div className={styles.contact}>
                    <h2 className={cn(styles.company_name, Inter.className)}>
                        {keepWords(company_name)}
                    </h2>
                    <h1 className={cn(styles.title, Inter.className)}>
                        {keepWords(title)}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SlideItem);
