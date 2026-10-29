'use client'

import React from 'react';

import { Inter } from '@/src/constants/font';

import { SlideItem as Props } from '@/src/types/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


const SlideItem = ({ url, subtitle }: Readonly<Props>) => {
    return (
        <div className={styles.article} style={{ backgroundImage: `url(${url})` }}>
            <div className={styles.container}>
                <div className={styles.contact}>
                    <h1 className={cn(styles.title, Inter.className)}>
                        {subtitle}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SlideItem);
