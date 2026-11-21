import React from 'react';

import cn from 'classnames';

import styles from './styles.module.sass';


export type EducationalSkeletonVariant =
    | 'home'
    | 'about'
    | 'partners'
    | 'price-list'
    | 'course';

interface Props {
    variant: EducationalSkeletonVariant;
};

const Bar = ({
    className,
    muted,
    light,
    red,
}: {
    className?: string;
    muted?: boolean;
    light?: boolean;
    red?: boolean;
}) => (
    <span
        className={cn(
            styles.bar,
            muted && styles.barMuted,
            light && styles.barLight,
            red && styles.barRed,
            className,
        )}
        aria-hidden
    />
);

const Lines = ({ count = 5, light }: { count?: number; light?: boolean }) => (
    <div className={styles.copy}>
        {Array.from({ length: count }).map((_, index) => (
            <Bar
                key={index}
                light={light}
                muted={!light}
                className={cn(styles.line, index === count - 1 && styles.lineShort)}
            />
        ))}
    </div>
);

const Cards = ({ count = 3 }: { count?: number }) => (
    <div className={styles.cards}>
        {Array.from({ length: count }).map((_, index) => (
            <div key={index} className={styles.card}>
                <Bar muted className={styles.cardMedia} />
                <Bar className={styles.cardTitle} />
            </div>
        ))}
    </div>
);

const renderVariant = (variant: EducationalSkeletonVariant) => {
    switch (variant) {
        case 'home':
            return (
                <>
                    <div className={styles.hero}>
                        <Bar className={styles.heroTitle} />
                    </div>
                    <div className={styles.about}>
                        <div className={styles.wrap}>
                            <Bar light className={styles.aboutTitle} />
                            <div className={styles.aboutSplit}>
                                <Lines light count={7} />
                                <div className={styles.mosaic}>
                                    {Array.from({ length: 9 }).map((_, index) => (
                                        <Bar key={index} light className={styles.mosaicCell} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.wrap}>
                            <Bar className={styles.sectionTitle} />
                            <Cards count={3} />
                        </div>
                    </div>
                </>
            );
        case 'about':
            return (
                <div className={cn(styles.courseBody, styles.aboutPage)}>
                    <div className={styles.wrap}>
                        <Bar light className={styles.aboutTitle} />
                        <div className={styles.aboutSplit}>
                            <Lines light count={8} />
                            <Bar light className={styles.cardMedia} />
                        </div>
                    </div>
                </div>
            );
        case 'partners':
            return (
                <div className={styles.partners}>
                    <div className={styles.wrap}>
                        <Bar className={styles.sectionTitle} />
                        <div className={styles.partnerGrid}>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <Bar key={index} muted className={styles.partner} />
                            ))}
                        </div>
                    </div>
                </div>
            );
        case 'price-list':
            return (
                <div className={styles.price}>
                    <div className={styles.wrap}>
                        <Bar className={styles.priceTitle} />
                        <div className={styles.rows}>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className={styles.row}>
                                    <Bar className={styles.rowLabel} />
                                    <Bar muted className={styles.rowChevron} />
                                    <Bar muted className={styles.rowIcon} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        case 'course':
            return (
                <>
                    <div className={styles.courseHero}>
                        <Bar className={styles.heroTitle} />
                    </div>
                    <div className={styles.courseBody}>
                        <div className={styles.wrap}>
                            <div className={styles.courseSplit}>
                                <div>
                                    <Bar light className={styles.aboutTitle} />
                                    <Lines light count={6} />
                                </div>
                                <Bar light className={styles.cardMedia} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.wrap}>
                            <Bar className={styles.sectionTitle} />
                            <Cards count={3} />
                        </div>
                    </div>
                </>
            );
        default:
            return null;
    }
};

const EducationalSkeleton = ({ variant }: Readonly<Props>) => {
    const light = variant === 'about';
    return (
        <main
            className={cn(styles.page, light && styles.pageLight)}
            aria-busy="true"
            aria-label="Loading"
        >
            {renderVariant(variant)}
        </main>
    );
};

export default EducationalSkeleton;
