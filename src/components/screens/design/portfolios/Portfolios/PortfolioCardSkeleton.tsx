'use client';

import React from 'react';

import Block from '@/src/components/blog/skeleton/Block';

import cn from 'classnames';

import styles from './styles.module.sass';

interface Props {
    index?: number;
};

const PortfolioCardSkeleton = ({ index = 0 }: Readonly<Props>) => (
    <li
        className={cn(styles.skeletonCard, styles.skeletonEnter)}
        style={{ animationDelay: `${index * 70}ms` }}
        aria-hidden
    >
        <div className={styles.skeletonMedia}>
            <Block tone="designMuted" width="100%" height="100%" className={styles.skeletonMediaFill} />
        </div>
        <Block tone="design" height={20} width="58%" className={styles.skeletonLine} />
        <Block tone="designMuted" height={14} width="36%" className={styles.skeletonLineSub} />
    </li>
);

export default React.memo(PortfolioCardSkeleton);
