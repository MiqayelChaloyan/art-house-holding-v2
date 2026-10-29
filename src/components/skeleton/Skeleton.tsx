'use client';

import React from 'react';

import cn from 'classnames';

import styles from './styles.module.sass';

export interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    className?: string;
    variant?: 'default' | 'dark' | 'circle' | 'rounded';
    'aria-hidden'?: boolean;
};

const Skeleton = ({
    width = '100%',
    height = 16,
    className,
    variant = 'default',
    'aria-hidden': ariaHidden = true,
}: Readonly<SkeletonProps>) => (
    <span
        className={cn(
            styles.skeleton,
            variant === 'dark' && styles.skeletonDark,
            variant === 'circle' && styles.skeletonCircle,
            variant === 'rounded' && styles.skeletonRounded,
            className,
        )}
        style={{ width, height }}
        aria-hidden={ariaHidden}
    />
);

export default React.memo(Skeleton);
