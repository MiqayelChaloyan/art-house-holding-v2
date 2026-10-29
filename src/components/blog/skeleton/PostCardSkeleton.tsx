'use client';

import React from 'react';

import cn from 'classnames';

import { BlogSiteKey } from '@/src/components/blog/config';

import Block from './Block';

import styles from './styles.module.sass';

interface Props {
    siteKey: BlogSiteKey;
};

const PostCardSkeleton = ({ siteKey }: Readonly<Props>) => (
    <article className={styles.cardShell} data-variant={siteKey} aria-hidden="true">
        <div className={styles.cardImage}>
            <Block tone="light" width="100%" height="100%" className={styles.imageFill} />
            <Block tone="accent" height={28} width={88} className={styles.cardCategory} />
        </div>
        <div className={styles.cardBody}>
            <Block tone="light" height={13} width="38%" />
            <Block tone="light" height={22} width="92%" />
            <Block tone="light" height={22} width="76%" />
            <div className={styles.excerptLines}>
                <Block tone="light" height={15} width="100%" />
                <Block tone="light" height={15} width="100%" />
                <Block tone="light" height={15} width="68%" />
            </div>
            <Block
                tone="accent"
                height={40}
                width={132}
                className={cn(
                    styles.readMoreBtn,
                    siteKey === 'language' && styles.readMoreBtnLanguage,
                )}
            />
        </div>
    </article>
);

export default React.memo(PostCardSkeleton);
