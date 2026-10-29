'use client';

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { BlogSiteConfig } from '@/src/components/blog/config';

import cn from 'classnames';

import styles from './styles.module.sass';

interface Props {
    href: string;
    config: BlogSiteConfig;
    className?: string;
};

const BlogBackLink = ({ href, config, className }: Readonly<Props>) => {
    const t = useTranslations('buttons');

    return (
        <Link
            href={href}
            className={cn(styles.backLink, config.bodyFont.className, className)}
            aria-label={t('go-back')}
        >
            <span className={styles.backIcon} aria-hidden="true">
                ←
            </span>
            <span className={styles.backLabel}>{t('go-back')}</span>
        </Link>
    );
};

export default React.memo(BlogBackLink);
