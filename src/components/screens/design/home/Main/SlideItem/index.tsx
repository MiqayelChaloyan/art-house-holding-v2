'use client'

import React from 'react';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

import { Arial, Belleza } from '@/src/constants/font';
import { Pages } from '@/src/constants/pages';

import { SlideItem as Props } from '@/src/types/design';

import cn from 'classnames';

import styles from './styles.module.sass';


const SlideItem = ({
    url,
    company_name,
    title
}: Readonly<Props>) => {
    const t = useTranslations('buttons');
    const localActive = useLocale();

    return (
        <div className={styles.article} style={{ backgroundImage: `url(${url})` }}>
            <div className={styles.container}>
                <div className={styles.contact}>
                    <h2 className={cn(styles.company_name, Belleza.className)}>
                        {company_name}
                    </h2>
                    <h1 className={cn(styles.title, Arial.className)}>
                        {title}
                    </h1>
                    <Link
                        href={`/${localActive}${Pages.DESIGN_CONTACT}`}
                        aria-label={Pages.DESIGN_CONTACT}
                        className={cn(styles.link, Arial.className)}
                        prefetch={true}
                        passHref
                    >
                        {t('register')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SlideItem);