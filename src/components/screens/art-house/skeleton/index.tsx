import React from 'react';

import cn from 'classnames';

import styles from './styles.module.sass';


export type ArtHouseSkeletonVariant = 'home' | 'about';

interface Props {
    variant: ArtHouseSkeletonVariant;
};

const Bar = ({ className, dark, red }: { className?: string; dark?: boolean; red?: boolean }) => (
    <span
        className={cn(styles.bar, dark && styles.barDark, red && styles.barRed, className)}
        aria-hidden
    />
);

const HomeSkeleton = () => (
    <>
        <div className={styles.hero}>
            <span className={styles.clock} aria-hidden />
            <div className={styles.center}>
                <Bar className={styles.logo} />
                <Bar red className={styles.tagline} />
            </div>
            <Bar red className={styles.lamp} />
        </div>
        <div className={styles.branches}>
            <div className={styles.branchGrid}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className={styles.branchCard}>
                        <Bar red className={styles.branchIcon} />
                        <Bar className={styles.branchLabel} />
                    </div>
                ))}
            </div>
        </div>
        <div className={styles.progress}>
            <div className={styles.progressGrid}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className={styles.progressItem}>
                        <Bar red className={styles.progressCircle} />
                        <Bar className={styles.progressMeta} />
                    </div>
                ))}
            </div>
        </div>
    </>
);

const AboutSkeleton = () => (
    <>
        <div className={styles.about}>
            <Bar className={styles.aboutTitle} />
            <div className={styles.aboutSplit}>
                <div className={styles.aboutCopy}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Bar
                            key={index}
                            className={cn(styles.line, index % 3 === 2 && styles.lineShort)}
                        />
                    ))}
                </div>
                <Bar className={styles.aboutImage} />
            </div>
        </div>
        <div className={styles.rating}>
            <Bar className={styles.ratingTitle} />
            <div className={styles.ratingCard}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Bar
                        key={index}
                        className={cn(styles.line, index === 3 && styles.lineShort)}
                    />
                ))}
                <Bar className={styles.avatar} />
                <Bar className={styles.progressMeta} />
            </div>
        </div>
    </>
);

const ArtHouseSkeleton = ({ variant }: Readonly<Props>) => (
    <main className={styles.page} aria-busy="true" aria-label="Loading">
        {variant === 'home' ? <HomeSkeleton /> : <AboutSkeleton />}
    </main>
);

export default ArtHouseSkeleton;
