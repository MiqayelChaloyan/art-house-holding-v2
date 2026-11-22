import React from 'react';

import cn from 'classnames';

import styles from './styles.module.sass';


const Bar = ({ className }: { className?: string }) => (
    <span className={cn(styles.bar, className)} aria-hidden />
);

const ArtHouseSkeleton = () => (
    <main className={styles.page} aria-busy="true" aria-label="Loading">
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
    </main>
);

export default ArtHouseSkeleton;
