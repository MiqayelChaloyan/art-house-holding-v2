import React from 'react';

import cn from 'classnames';

import styles from './styles.module.sass';


type Tone = 'light' | 'dark' | 'gray' | 'red' | 'blue' | 'yellow' | 'white';

const Bar = ({ tone = 'light', className }: { tone?: Tone; className?: string }) => (
    <span className={cn(styles.bar, styles[tone], className)} aria-hidden />
);

const Lines = ({ count, tone = 'light', className }: { count: number; tone?: Tone; className?: string }) => (
    <div className={cn(styles.lines, className)}>
        {Array.from({ length: count }).map((_, index) => (
            <Bar
                key={index}
                tone={tone}
                className={cn(styles.line, index === count - 1 && styles.lineShort)}
            />
        ))}
    </div>
);

const repeat = (count: number, render: (index: number) => React.ReactNode) =>
    Array.from({ length: count }).map((_, index) => render(index));

const Shell = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={className} aria-busy="true" aria-label="Loading">
        {children}
    </div>
);


export type ArtHouseSkeletonVariant = 'home' | 'about';

const ArtHouseHeader = () => (
    <div className={styles.ahHeader}>
        <div className={cn('container', styles.ahHeaderRow)}>
            <Bar className={styles.ahLogo} />
            <div className={styles.ahNav}>
                <span className={styles.ahNavPill} />
                <span className={styles.ahNavPill} />
                <Bar className={styles.ahLang} />
            </div>
            <div className={styles.burger}>
                <span />
                <span />
                <span />
            </div>
        </div>
    </div>
);

const ArtHouseFooter = () => (
    <div className={styles.ahFooter}>
        <div className={cn('container', styles.ahFooterRow)}>
            <Lines count={2} tone="gray" className={styles.ahFooterCol} />
            <Lines count={3} tone="gray" className={styles.ahFooterCol} />
            <div className={styles.ahFooterBrand}>
                <Bar tone="gray" className={styles.ahFooterLogo} />
                <Bar tone="gray" className={styles.ahFooterCopy} />
            </div>
        </div>
    </div>
);

export const ArtHouseSkeleton = ({ variant }: { variant: ArtHouseSkeletonVariant }) => (
    <Shell className={styles.ah}>
        <ArtHouseHeader />
        {variant === 'home' ? (
            <>
                <div className={styles.ahHero}>
                    <div className={cn('container', styles.ahHeroRow)}>
                        <Bar className={styles.ahClock} />
                        <div className={styles.ahHeroCopy}>
                            <Bar className={styles.ahHeroLogo} />
                            <Bar tone="red" className={styles.ahHeroTitle} />
                        </div>
                        <div className={styles.ahLamp}>
                            <span className={styles.ahCord} />
                            <span className={styles.ahBulb} />
                        </div>
                    </div>
                </div>
                <div className={styles.ahBranches}>
                    <div className={cn('container', styles.ahCards)}>
                        {repeat(5, (index) => (
                            <div key={index} className={styles.ahCard}>
                                <Bar tone="red" className={styles.ahCardLogo} />
                                <Lines count={3} className={styles.ahCardLines} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.dots}>
                        {repeat(5, (index) => <span key={index} />)}
                    </div>
                </div>
                <div className={styles.ahStats}>
                    <div className={cn('container', styles.ahStatsRow)}>
                        {repeat(4, (index) => (
                            <Bar key={index} tone="red" className={styles.ahStat} />
                        ))}
                    </div>
                    <Bar className={styles.ahPartnersTitle} />
                    <div className={styles.ahPartners}>
                        {repeat(9, (index) => (
                            <Bar key={index} className={styles.ahPartner} />
                        ))}
                    </div>
                </div>
            </>
        ) : (
            <div className={styles.ahAbout}>
                <div className={cn('container', styles.ahAboutRow)}>
                    <div className={styles.ahAboutCopy}>
                        <Bar className={styles.ahAboutTitle} />
                        <Bar className={styles.ahAboutSub} />
                        <Lines count={14} />
                    </div>
                    <Bar className={styles.ahAboutImage} />
                </div>
                <Bar className={styles.ahPartnersTitle} />
                <div className={cn('container', styles.ahReview)}>
                    <span className={styles.ahArrow} />
                    <div className={styles.ahReviewCard}>
                        <Lines count={5} className={styles.ahReviewLines} />
                        <Bar className={styles.ahAvatar} />
                        <Bar className={styles.ahReviewName} />
                    </div>
                    <span className={styles.ahArrow} />
                </div>
            </div>
        )}
        <ArtHouseFooter />
    </Shell>
);


export type EducationalSkeletonVariant = 'home' | 'course' | 'about' | 'partners' | 'price-list';

const EduTab = ({ dark }: { dark?: boolean }) => (
    <div className={cn(styles.edTabRow, dark && styles.edTabRowDark)}>
        <div className={cn('container', styles.edTabWrap)}>
            <div className={styles.edTab}>
                <Bar tone={dark ? 'dark' : 'light'} className={styles.edTabTitle} />
            </div>
        </div>
    </div>
);

const EduHero = () => (
    <div className={styles.edHero}>
        <Bar tone="dark" className={styles.edHeroTitle} />
    </div>
);

const EduVideo = () => (
    <div className={styles.edDark}>
        <EduTab dark />
        <div className="container">
            <div className={styles.edVideo}>
                <span className={styles.play} />
            </div>
        </div>
    </div>
);

const EduForm = () => (
    <div className={styles.edForm}>
        <div className={styles.edFormHead}>
            <Bar className={styles.edFormTitle} />
            <Bar className={styles.edFormIcons} />
        </div>
        {repeat(4, (index) => <span key={index} className={styles.edField} />)}
        <Bar tone="red" className={styles.edSend} />
    </div>
);

export const EducationalSkeleton = ({ variant }: { variant: EducationalSkeletonVariant }) => {
    if (variant === 'partners' || variant === 'price-list') {
        return (
            <Shell className={styles.edBlack}>
                <div className="container">
                    <Bar tone="dark" className={styles.edPageTitle} />
                    {variant === 'partners' ? (
                        <div className={styles.edPartners}>
                            {repeat(12, (index) => (
                                <div key={index} className={styles.edPartner}>
                                    <Bar tone="white" className={styles.edPartnerLogo} />
                                    <Lines count={3} tone="dark" className={styles.edPartnerLines} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.edPrices}>
                            {repeat(10, (index) => (
                                <div key={index} className={styles.edPriceRow}>
                                    <Bar tone="dark" className={styles.edPriceLabel} />
                                    <span className={styles.chevron} />
                                    <Bar tone="dark" className={styles.edPriceIcon} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Shell>
        );
    }

    if (variant === 'about') {
        return (
            <Shell className={styles.edLightPage}>
                <div className="container">
                    <Bar className={styles.edCenterTitle} />
                    {repeat(4, (index) => (
                        <div key={index} className={styles.edAboutBlock}>
                            <Bar className={styles.edSubTitle} />
                            <Lines count={index === 0 ? 4 : 3} />
                        </div>
                    ))}
                </div>
            </Shell>
        );
    }

    return (
        <Shell className={styles.ed}>
            <EduHero />
            <div className={styles.edLight}>
                <EduTab />
                <div className={cn('container', styles.edSplit)}>
                    <div className={styles.edCopy}>
                        <Bar className={styles.edSubTitle} />
                        <Lines count={4} />
                        <Bar className={styles.edSubTitle} />
                        <Lines count={variant === 'home' ? 5 : 3} />
                        <Bar className={styles.edMore} />
                    </div>
                    {variant === 'home' ? (
                        <div className={styles.edGallery}>
                            {repeat(9, (index) => <Bar key={index} className={styles.edThumb} />)}
                        </div>
                    ) : (
                        <EduForm />
                    )}
                </div>
            </div>
            <EduVideo />
            {variant === 'course' && (
                <div className={styles.edLight}>
                    <EduTab />
                    <div className={cn('container', styles.edWorks)}>
                        {repeat(4, (index) => <Bar key={index} className={styles.edWork} />)}
                    </div>
                </div>
            )}
        </Shell>
    );
};


export type LanguageSkeletonVariant =
    | 'home'
    | 'about'
    | 'languages'
    | 'language'
    | 'form'
    | 'partners'
    | 'price-list'
    | 'promotions'
    | 'quiz'
    | 'quiz-detail';

const Figure = ({ label }: { label?: boolean }) => (
    <div className={styles.lgFigure}>
        <Bar tone="blue" className={styles.lgBubble} />
        <Bar className={styles.lgBody} />
        {label && <Bar tone="blue" className={styles.lgLabel} />}
    </div>
);

const PromoCards = ({ count }: { count: number }) => (
    <div className={cn(styles.lgPromos, count === 2 && styles.lgPromosTwo)}>
        {repeat(count, (index) => (
            <div key={index} className={styles.lgPromo}>
                <Bar className={styles.lgPromoImage} />
                <div className={styles.lgPromoBody}>
                    <Lines count={2} tone="white" />
                </div>
            </div>
        ))}
    </div>
);

const renderLanguage = (variant: LanguageSkeletonVariant) => {
    switch (variant) {
        case 'home':
            return (
                <>
                    <div className={styles.lgCrowd}>
                        {repeat(8, (index) => <Figure key={index} />)}
                    </div>
                    <div className={styles.lgSplit}>
                        <div>
                            <Bar tone="blue" className={styles.lgTitle} />
                            <Lines count={8} />
                            <div className={styles.lgActions}>
                                <Bar tone="yellow" className={styles.lgPill} />
                                <span className={styles.lgPillOutline} />
                            </div>
                        </div>
                        <div className={styles.lgCollage}>
                            <Bar className={styles.lgCollageA} />
                            <Bar className={styles.lgCollageB} />
                            <Bar className={styles.lgCollageC} />
                        </div>
                    </div>
                    <div className={styles.lgSectionHead}>
                        <Bar tone="blue" className={styles.lgSectionTitle} />
                        <span className={styles.lgRule} />
                    </div>
                    <PromoCards count={3} />
                </>
            );
        case 'about':
            return (
                <>
                    <Bar tone="blue" className={styles.lgCenterTitle} />
                    <Lines count={12} />
                    <Bar tone="yellow" className={cn(styles.lgPill, styles.lgPillCenter)} />
                    <div className={styles.lgPhotos}>
                        {repeat(3, (index) => <Bar key={index} className={styles.lgPhoto} />)}
                    </div>
                    <div className={styles.lgVideos}>
                        {repeat(2, (index) => (
                            <div key={index} className={styles.lgVideo}>
                                <span className={styles.play} />
                            </div>
                        ))}
                    </div>
                </>
            );
        case 'languages':
            return (
                <div className={styles.lgLanguages}>
                    {repeat(8, (index) => <Figure key={index} label />)}
                </div>
            );
        case 'language':
            return (
                <div className={styles.lgDetail}>
                    <div className={styles.lgDetailFigure}>
                        <Figure label />
                    </div>
                    <div>
                        <Bar className={styles.lgSubTitle} />
                        <Lines count={6} />
                        <Bar className={styles.lgSubTitle} />
                        <Lines count={10} />
                        <Bar className={styles.lgSubTitle} />
                        <Lines count={6} />
                    </div>
                </div>
            );
        case 'form':
            return (
                <div className={styles.lgFormPanel}>
                    <Bar tone="white" className={styles.lgFormTitle} />
                    <div className={styles.lgFormGrid}>
                        {repeat(4, (index) => <span key={index} className={styles.lgField} />)}
                    </div>
                    <div className={styles.lgFormSelects}>
                        {repeat(3, (index) => <span key={index} className={styles.lgField} />)}
                    </div>
                    <Bar tone="blue" className={styles.lgSend} />
                </div>
            );
        case 'partners':
            return (
                <>
                    <Bar tone="blue" className={styles.lgCenterTitle} />
                    <div className={styles.lgPartners}>
                        {repeat(12, (index) => (
                            <div key={index} className={styles.lgPartner}>
                                <span />
                            </div>
                        ))}
                    </div>
                </>
            );
        case 'price-list':
            return (
                <>
                    <Bar tone="yellow" className={styles.lgCenterTitle} />
                    <div className={styles.lgTable}>
                        {repeat(36, (index) => (
                            <div key={index} className={styles.lgCell}>
                                <Bar tone="blue" className={styles.lgCellText} />
                            </div>
                        ))}
                    </div>
                </>
            );
        case 'promotions':
            return <PromoCards count={2} />;
        case 'quiz':
            return (
                <>
                    <Bar tone="blue" className={styles.lgCenterTitle} />
                    <div className={styles.lgFlags}>
                        {repeat(7, (index) => <Bar key={index} className={styles.lgFlag} />)}
                    </div>
                </>
            );
        case 'quiz-detail':
            return (
                <div className={styles.lgQuiz}>
                    <Bar className={cn(styles.lgPerson, styles.lgPersonLeft)} />
                    <div className={styles.lgQuizCard}>
                        <div className={styles.lgSteps}>
                            <Bar tone="yellow" className={styles.lgStepCount} />
                            {repeat(12, (index) => <span key={index} />)}
                        </div>
                        <Lines count={2} tone="blue" className={styles.lgQuestion} />
                        {repeat(4, (index) => (
                            <div key={index} className={styles.lgOption}>
                                <span />
                                <Bar className={styles.lgOptionText} />
                            </div>
                        ))}
                        <Bar tone="blue" className={styles.lgNext} />
                    </div>
                    <Bar className={cn(styles.lgPerson, styles.lgPersonRight)} />
                </div>
            );
        default:
            return null;
    }
};

export const LanguageSkeleton = ({ variant }: { variant: LanguageSkeletonVariant }) => (
    <Shell className={styles.lg}>
        <div className="container">{renderLanguage(variant)}</div>
    </Shell>
);
