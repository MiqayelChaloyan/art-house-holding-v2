import React from 'react';

import cn from 'classnames';

import styles from './styles.module.sass';


export type DesignSkeletonVariant =
    | 'home'
    | 'courses'
    | 'course'
    | 'portfolios'
    | 'portfolio'
    | 'about'
    | 'contact'
    | 'form'
    | 'legal';

interface Props {
    variant: DesignSkeletonVariant;
};

const Bar = ({ className, muted }: { className?: string; muted?: boolean }) => (
    <span className={cn(styles.bar, muted && styles.muted, className)} aria-hidden />
);

const Heading = ({ lines = 2 }: { lines?: number }) => (
    <div className={styles.heading}>
        <div className={styles.eyebrow}>
            <span className={styles.mark} />
            <Bar muted className={styles.eyebrowText} />
        </div>
        {Array.from({ length: lines }).map((_, index) => (
            <Bar
                key={index}
                muted={index === lines - 1}
                className={cn(styles.titleLine, index === lines - 1 && styles.titleLineShort)}
            />
        ))}
    </div>
);

const Paragraph = ({ lines = 3 }: { lines?: number }) => (
    <div className={styles.paragraph}>
        {Array.from({ length: lines }).map((_, index) => (
            <Bar key={index} muted className={cn(styles.textLine, index === lines - 1 && styles.textLineShort)} />
        ))}
    </div>
);

const Actions = () => (
    <div className={styles.actions}>
        <Bar className={cn(styles.pill, styles.pillPrimary)} />
        <Bar muted className={styles.pill} />
    </div>
);

const Cards = ({ count = 3, tall }: { count?: number; tall?: boolean }) => (
    <div className={styles.cards}>
        {Array.from({ length: count }).map((_, index) => (
            <div key={index} className={styles.card}>
                <Bar className={cn(styles.cardMedia, tall && styles.cardMediaTall)} />
                <Bar className={styles.cardTitle} />
                <Bar muted className={styles.cardMeta} />
            </div>
        ))}
    </div>
);

const Chips = () => (
    <div className={styles.chips}>
        <Bar muted className={styles.chipAll} />
        {Array.from({ length: 6 }).map((_, index) => (
            <Bar key={index} muted className={styles.chip} />
        ))}
    </div>
);

const FormPanel = () => (
    <div className={styles.panel}>
        <Bar className={styles.panelTitle} />
        {Array.from({ length: 4 }).map((_, index) => (
            <Bar key={index} muted className={styles.field} />
        ))}
        <Bar className={styles.submit} />
    </div>
);

const Rows = ({ count = 5 }: { count?: number }) => (
    <div className={styles.rows}>
        {Array.from({ length: count }).map((_, index) => (
            <div key={index} className={styles.row}>
                <Bar muted className={styles.rowIndex} />
                <Bar className={styles.rowLabel} />
                <Bar muted className={styles.rowIcon} />
            </div>
        ))}
    </div>
);

const renderVariant = (variant: DesignSkeletonVariant) => {
    switch (variant) {
        case 'home':
            return (
                <div className={styles.split}>
                    <div className={styles.copy}>
                        <Heading lines={4} />
                        <Paragraph />
                        <Actions />
                    </div>
                    <div className={styles.visual}>
                        <Bar className={styles.photo} />
                        <div className={styles.stats}>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Bar key={index} muted className={styles.stat} />
                            ))}
                        </div>
                    </div>
                </div>
            );
        case 'courses':
            return (
                <>
                    <Heading />
                    <Cards count={6} tall />
                </>
            );
        case 'course':
            return (
                <>
                    <div className={styles.split}>
                        <div className={styles.copy}>
                            <Heading />
                            <Paragraph lines={4} />
                            <Actions />
                        </div>
                        <Bar className={styles.portrait} />
                    </div>
                    <div className={styles.block}>
                        <Heading />
                        <Rows />
                    </div>
                </>
            );
        case 'portfolios':
            return (
                <>
                    <Heading />
                    <Chips />
                    <Cards count={6} />
                </>
            );
        case 'portfolio':
            return (
                <>
                    <div className={styles.heading}>
                        <Bar className={styles.titleLine} />
                        <Bar muted className={styles.subtitle} />
                    </div>
                    <Bar className={styles.wide} />
                    <Cards count={3} />
                </>
            );
        case 'about':
            return (
                <>
                    <Heading />
                    <Paragraph lines={4} />
                    <Bar className={styles.wide} />
                </>
            );
        case 'contact':
        case 'form':
            return (
                <div className={styles.contact}>
                    <div className={styles.copy}>
                        <Heading />
                        {variant === 'contact' ? (
                            <div className={styles.details}>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className={styles.detail}>
                                        <span className={styles.detailIcon} />
                                        <Bar muted className={styles.detailText} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Paragraph lines={2} />
                        )}
                    </div>
                    <FormPanel />
                </div>
            );
        case 'legal':
            return (
                <>
                    <Heading />
                    <Paragraph lines={8} />
                    <Paragraph lines={6} />
                </>
            );
        default:
            return null;
    }
};

const DesignSkeleton = ({ variant }: Readonly<Props>) => (
    <section className={styles.section} aria-busy="true" aria-label="Loading">
        <div className={styles.wrap}>
            {renderVariant(variant)}
        </div>
    </section>
);

export default DesignSkeleton;
