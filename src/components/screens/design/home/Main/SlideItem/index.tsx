'use client'

import React from 'react';

import { Inter } from '@/src/constants/font';

import { SlideItem as Props } from '@/src/types/design';

import cn from 'classnames';

import styles from './styles.module.sass';


const SlideItem = ({
    url,
    company_name,
    title
}: Readonly<Props>) => {
    return (
        <div className={styles.article} style={{ backgroundImage: `url(${url})` }}>
            <div className={styles.overlay} />
            <div className={styles.container}>
                <div className={styles.contact}>
                    <h2 className={cn(styles.company_name, Inter.className)}>
                        {company_name}
                    </h2>
                    <h1 className={cn(styles.title, Inter.className)}>
                        {title}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SlideItem);
