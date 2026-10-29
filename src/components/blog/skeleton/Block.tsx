'use client';

import React from 'react';

import cn from 'classnames';

import styles from './styles.module.sass';

export type BlogSkeletonTone = 'light' | 'hero' | 'sidebar' | 'accent';

interface Props {
    width?: string | number;
    height?: string | number;
    className?: string;
    tone?: BlogSkeletonTone;
};

const Block = ({
    width = '100%',
    height = 16,
    className,
    tone = 'light',
}: Readonly<Props>) => (
    <span
        className={cn(
            styles.block,
            tone === 'light' && styles.blockLight,
            tone === 'hero' && styles.blockHero,
            tone === 'sidebar' && styles.blockSidebar,
            tone === 'accent' && styles.blockAccent,
            className,
        )}
        style={{ width, height }}
        aria-hidden="true"
    />
);

export default React.memo(Block);
