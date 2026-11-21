import React from 'react';

import cn from 'classnames';

import styles from './styles.module.sass';


export type LanguageSkeletonVariant =
    | 'home'
    | 'about'
    | 'partners'
    | 'price-list'
    | 'languages'
    | 'language'
    | 'promotions'
    | 'form'
    | 'quiz';

interface Props {
    variant: LanguageSkeletonVariant;
};

const Bar = ({
    className,
    muted,
    yellow,
    blue,
}: {
    className?: string;
    muted?: boolean;
    yellow?: boolean;
    blue?: boolean;
}) => (
    <span
        className={cn(
            styles.bar,
            muted && styles.barMuted,
            yellow && styles.barYellow,
            blue && styles.barBlue,
            className,
        )}
        aria-hidden
    />
);

const Lines = ({ count = 5 }: { count?: number }) => (
    <div className={styles.copy}>
        {Array.from({ length: count }).map((_, index) => (
            <Bar
                key={index}
                muted
                className={cn(styles.line, index === count - 1 && styles.lineShort)}
            />
        ))}
    </div>
);

const AboutBlock = () => (
    <div className={styles.about}>
        <div className={styles.wrap}>
            <div className={styles.aboutSplit}>
                <div>
                    <Bar blue className={styles.aboutTitle} />
                    <Lines count={6} />
                    <div className={styles.actions}>
                        <Bar yellow className={styles.pill} />
                        <Bar muted className={styles.pill} />
                    </div>
                </div>
                <div className={styles.collage}>
                    <Bar muted className={styles.collageMain} />
                    <Bar muted className={styles.collageTop} />
                    <Bar muted className={styles.collageBottom} />
                </div>
            </div>
        </div>
    </div>
);

const renderVariant = (variant: LanguageSkeletonVariant) => {
    switch (variant) {
        case 'home':
            return (
                <>
                    <div className={styles.hero}>
                        <Bar muted className={styles.heroBanner} />
                    </div>
                    <AboutBlock />
                    <div className={styles.wrap}>
                        <div className={styles.promoGrid} style={{ paddingTop: 0 }}>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Bar key={index} muted className={styles.promoCard} />
                            ))}
                        </div>
                    </div>
                </>
            );
        case 'about':
            return (
                <div style={{ paddingTop: 40 }}>
                    <AboutBlock />
                </div>
            );
        case 'languages':
            return (
                <div className={styles.wrap}>
                    <div className={styles.grid}>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Bar key={index} muted className={styles.character} />
                        ))}
                    </div>
                </div>
            );
        case 'language':
            return (
                <div className={styles.languageDetail}>
                    <div className={styles.wrap}>
                        <div className={styles.detailSplit}>
                            <div>
                                <Bar blue className={styles.aboutTitle} />
                                <Lines count={7} />
                            </div>
                            <Bar muted className={styles.detailMedia} />
                        </div>
                        <div className={styles.promoGrid}>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Bar key={index} muted className={styles.promoCard} />
                            ))}
                        </div>
                    </div>
                </div>
            );
        case 'promotions':
            return (
                <div className={styles.wrap}>
                    <div className={styles.promoGrid}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Bar key={index} muted className={styles.promoCard} />
                        ))}
                    </div>
                </div>
            );
        case 'partners':
            return (
                <div className={styles.partners}>
                    <div className={styles.wrap}>
                        <Bar blue className={styles.priceTitle} />
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
                        <Bar blue className={styles.priceTitle} />
                        <div className={styles.rows}>
                            {Array.from({ length: 7 }).map((_, index) => (
                                <div key={index} className={styles.row}>
                                    <Bar className={styles.rowLabel} />
                                    <Bar muted className={styles.rowIcon} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        case 'form':
            return (
                <div className={styles.formPage}>
                    <div className={styles.formPanel}>
                        <span className={styles.formTitle} aria-hidden />
                        <div className={styles.fields}>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <span key={index} className={styles.field} aria-hidden />
                            ))}
                            {Array.from({ length: 3 }).map((_, index) => (
                                <span
                                    key={`wide-${index}`}
                                    className={cn(styles.field, styles.fieldWide)}
                                    aria-hidden
                                />
                            ))}
                        </div>
                        <Bar blue className={styles.submit} />
                    </div>
                </div>
            );
        case 'quiz':
            return (
                <div className={styles.quiz}>
                    <div className={styles.wrap}>
                        <Bar blue className={styles.quizTitle} />
                        <div className={styles.quizGrid}>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <Bar key={index} muted className={styles.quizCard} />
                            ))}
                        </div>
                    </div>
                </div>
            );
        default:
            return null;
    }
};

const LanguageSkeleton = ({ variant }: Readonly<Props>) => (
    <main className={styles.page} aria-busy="true" aria-label="Loading">
        {renderVariant(variant)}
    </main>
);

export default LanguageSkeleton;
