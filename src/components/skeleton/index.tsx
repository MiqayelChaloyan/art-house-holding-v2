'use client';

import React from 'react';

import Skeleton from './Skeleton';

import cn from 'classnames';

import styles from './styles.module.sass';

export { default as Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';

interface BlockProps {
    className?: string;
    variant?: 'default' | 'dark';
};

export const SkeletonText = ({
    lines = 3,
    className,
    variant = 'default',
}: Readonly<{ lines?: number } & BlockProps>) => (
    <div className={cn(styles.list, className)} aria-hidden="true">
        {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
                key={index}
                variant={variant}
                height={index === lines - 1 ? 12 : 16}
                width={index === lines - 1 ? '72%' : '100%'}
            />
        ))}
    </div>
);

export const SkeletonImage = ({
    width = '100%',
    height = 220,
    className,
    variant = 'default',
}: Readonly<{ width?: string | number; height?: string | number } & BlockProps>) => (
    <Skeleton variant={variant === 'dark' ? 'dark' : 'rounded'} width={width} height={height} className={className} />
);

export const SkeletonCard = ({ className, variant = 'default' }: Readonly<BlockProps>) => (
    <article className={cn(styles.cardShell, className)} aria-hidden="true">
        <div className={styles.cardImage}>
            <Skeleton variant={variant} width="100%" height="100%" className={styles.cardImageFill} />
        </div>
        <div className={styles.cardBody}>
            <Skeleton variant={variant} height={20} width="80%" />
            <SkeletonText lines={2} variant={variant} />
            <Skeleton variant={variant} height={14} width="35%" />
        </div>
    </article>
);

export const SkeletonHero = ({ className, variant = 'default' }: Readonly<BlockProps>) => (
    <section className={cn(styles.hero, className)} aria-hidden="true">
        <Skeleton variant={variant} height={48} width="60%" />
        <Skeleton variant={variant} height={24} width="45%" />
        <SkeletonImage variant={variant} height={360} />
    </section>
);

export const SkeletonNavbar = ({ className, variant = 'default' }: Readonly<BlockProps>) => (
    <div className={cn(styles.navbar, className)} aria-hidden="true">
        <Skeleton variant={variant} height={40} width={160} />
        <div className={styles.row}>
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} variant={variant} height={16} width={72} />
            ))}
        </div>
    </div>
);

export const SkeletonSidebar = ({ className, variant = 'default' }: Readonly<BlockProps>) => (
    <aside className={cn(styles.sidebar, className)} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} variant={variant} height={14} width={`${100 - index * 8}%`} />
        ))}
    </aside>
);

export const SkeletonForm = ({ className, variant = 'default' }: Readonly<BlockProps>) => (
    <div className={cn(styles.form, className)} aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} variant={variant} height={48} width="100%" />
        ))}
        <Skeleton variant={variant} height={44} width={160} />
    </div>
);

export const SkeletonTable = ({ rows = 5, className, variant = 'default' }: Readonly<{ rows?: number } & BlockProps>) => (
    <div className={cn(styles.table, className)} aria-hidden="true">
        <Skeleton variant={variant} height={20} width="100%" />
        {Array.from({ length: rows }).map((_, index) => (
            <Skeleton key={index} variant={variant} height={36} width="100%" />
        ))}
    </div>
);

export const SkeletonList = ({ items = 4, className, variant = 'default' }: Readonly<{ items?: number } & BlockProps>) => (
    <div className={cn(styles.list, className)} aria-hidden="true">
        {Array.from({ length: items }).map((_, index) => (
            <div key={index} className={styles.row}>
                <Skeleton variant={variant === 'dark' ? 'circle' : 'default'} width={48} height={48} />
                <div style={{ flex: 1 }}>
                    <Skeleton variant={variant} height={16} width="70%" />
                    <Skeleton variant={variant} height={12} width="45%" className={styles.card} />
                </div>
            </div>
        ))}
    </div>
);

export const SkeletonModal = ({ className, variant = 'default' }: Readonly<BlockProps>) => (
    <div className={cn(styles.modal, className)} aria-hidden="true">
        <Skeleton variant={variant} height={24} width="50%" />
        <SkeletonText lines={4} variant={variant} />
        <Skeleton variant={variant} height={40} width={120} />
    </div>
);

export const SkeletonBlog = ({ className, variant = 'default' }: Readonly<BlockProps>) => (
    <section className={cn(styles.page, className)} aria-busy="true" aria-label="Loading blog">
        <div className={styles.container}>
            <div className={styles.blogHero}>
                <Skeleton variant={variant} height={16} width={120} />
                <Skeleton variant={variant} height={48} width="55%" />
                <Skeleton variant={variant} height={20} width="38%" />
            </div>
            <div className={styles.grid}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonCard key={index} variant={variant} />
                ))}
            </div>
        </div>
    </section>
);

export const SkeletonGrid = ({
    count = 6,
    className,
    variant = 'default',
}: Readonly<{ count?: number } & BlockProps>) => (
    <div className={cn(styles.grid, className)} aria-hidden="true">
        {Array.from({ length: count }).map((_, index) => (
            <SkeletonCard key={index} variant={variant} />
        ))}
    </div>
);

export const SkeletonDetailPage = ({ className, variant = 'default' }: Readonly<BlockProps>) => (
    <section className={cn(styles.page, className)} aria-busy="true" aria-label="Loading page">
        <div className={styles.container}>
            <div className={styles.detail}>
                <Skeleton variant={variant} height={20} width={120} />
                <Skeleton variant={variant} height={40} width="70%" />
                <SkeletonImage variant={variant} height={420} />
                <SkeletonText lines={8} variant={variant} />
            </div>
        </div>
    </section>
);

export const SkeletonHomePage = ({ className, variant = 'default' }: Readonly<BlockProps>) => (
    <section className={cn(styles.page, className)} aria-busy="true" aria-label="Loading page">
        <div className={styles.container}>
            <SkeletonHero variant={variant} />
            <Skeleton variant={variant} height={32} width="32%" className={styles.sectionTitle} />
            <SkeletonGrid count={3} variant={variant} />
            <Skeleton variant={variant} height={32} width="28%" className={styles.sectionTitle} />
            <SkeletonGrid count={3} variant={variant} />
        </div>
    </section>
);

export const SkeletonProfile = ({ className, variant = 'default' }: Readonly<BlockProps>) => (
    <section className={cn(styles.page, className)} aria-busy="true" aria-label="Loading profile">
        <div className={styles.container}>
            <div className={styles.row}>
                <Skeleton variant="circle" width={96} height={96} />
                <div style={{ flex: 1 }}>
                    <Skeleton variant={variant} height={28} width="40%" />
                    <Skeleton variant={variant} height={16} width="60%" />
                </div>
            </div>
            <SkeletonText lines={5} variant={variant} />
        </div>
    </section>
);

export const SkeletonDashboard = ({ className, variant = 'default' }: Readonly<BlockProps>) => (
    <section className={cn(styles.page, className)} aria-busy="true" aria-label="Loading dashboard">
        <div className={styles.container}>
            <SkeletonNavbar variant={variant} />
            <div className={styles.grid}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} variant={variant} height={120} width="100%" />
                ))}
            </div>
            <SkeletonTable rows={6} variant={variant} />
        </div>
    </section>
);
