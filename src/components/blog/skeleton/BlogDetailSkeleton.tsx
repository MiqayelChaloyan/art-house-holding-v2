'use client';

import React from 'react';

import Container from '@/src/components/components/container';
import { BlogSiteKey } from '@/src/components/blog/config';
import mainStyles from '@/src/components/blog/DetailPage/Main/styles.module.sass';

import Block from './Block';

import cn from 'classnames';

import styles from './styles.module.sass';

const BLOG_ACCENT: Record<BlogSiteKey, string> = {
    educational: '#DF362D',
    design: '#ce2421',
    language: '#006ED2',
};

interface Props {
    siteKey: BlogSiteKey;
};

const BlogDetailSkeleton = ({ siteKey }: Readonly<Props>) => {
    const blogAccent = BLOG_ACCENT[siteKey];
    const isDesign = siteKey === 'design';

    return (
        <section
            className={mainStyles.section}
            data-variant={siteKey}
            data-blog-page
            style={{ '--blog-accent': blogAccent } as React.CSSProperties}
            aria-busy="true"
            aria-label="Loading blog post"
        >
            {!isDesign && (
                <div className={mainStyles.hero}>
                    <Container className="container">
                        <div className={styles.detailHeroTop}>
                            <div className={cn(styles.backPill, styles.backPillLight)}>
                                <Block tone="hero" width={30} height={30} className={styles.backIcon} />
                                <Block tone="hero" height={14} width={72} />
                            </div>
                            <Block tone="hero" height={14} width={200} />
                        </div>
                        <div className={styles.detailHeroMeta}>
                            <Block tone="hero" height={36} width={120} />
                            <Block tone="hero" height={siteKey === 'language' ? 44 : 40} width="min(760px, 92%)" />
                            <Block tone="hero" height={18} width={160} />
                        </div>
                    </Container>
                </div>
            )}
            <Container className="container">
                {isDesign && (
                    <div className={styles.designBack}>
                        <Block tone="design" height={14} width={88} />
                    </div>
                )}
                <div className={mainStyles.layout}>
                    <article className={cn(mainStyles.content, styles.articleContent, isDesign && styles.articleContentDesign)}>
                        {isDesign && (
                            <div className={styles.designMeta}>
                                <Block tone="accent" height={14} width={96} />
                                <Block tone="design" height={56} width="min(760px, 92%)" />
                                <Block tone="design" height={48} width="min(520px, 70%)" />
                                <Block tone="designMuted" height={14} width={120} />
                            </div>
                        )}
                        <div className={cn(mainStyles.imageWrapper, isDesign && styles.featuredImageDesign)}>
                            <div className={cn(styles.featuredImageInner, isDesign && styles.featuredImageInnerDesign)}>
                                <Block
                                    tone={isDesign ? 'designMuted' : 'light'}
                                    width="100%"
                                    height="100%"
                                    className={styles.imageFill}
                                />
                            </div>
                        </div>
                        <div className={styles.excerptLines}>
                            <Block tone={isDesign ? 'designMuted' : 'light'} height={isDesign ? 20 : 20} width="88%" />
                            <Block tone={isDesign ? 'designMuted' : 'light'} height={20} width="72%" />
                        </div>
                        <div className={styles.bodyLines}>
                            {Array.from({ length: isDesign ? 7 : 8 }).map((_, index) => (
                                <Block
                                    key={index}
                                    tone={isDesign ? 'designMuted' : 'light'}
                                    height={isDesign ? 18 : 16}
                                    width={index === (isDesign ? 6 : 7) ? '64%' : index % 3 === 2 ? '92%' : '100%'}
                                />
                            ))}
                        </div>
                        <div className={styles.shareRow}>
                            <Block tone={isDesign ? 'designMuted' : 'light'} height={40} width={120} />
                            <Block tone={isDesign ? 'designMuted' : 'light'} height={40} width={40} />
                            <Block tone={isDesign ? 'designMuted' : 'light'} height={40} width={40} />
                            <Block tone={isDesign ? 'designMuted' : 'light'} height={40} width={40} />
                        </div>
                    </article>
                    <aside className={mainStyles.sidebar}>
                        <div className={cn(mainStyles.sidebarInner, isDesign && styles.sidebarInnerDesign)}>
                            <div className={cn(mainStyles.sidebarTitle, isDesign && styles.sidebarTitleDesign)}>
                                <Block tone={isDesign ? 'design' : 'sidebar'} height={isDesign ? 36 : 24} width={isDesign ? '58%' : '72%'} />
                            </div>
                            <div className={cn(styles.similarList, isDesign && styles.similarListDesign)}>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={cn(styles.similarItem, isDesign && styles.similarItemDesign)}
                                    >
                                        <div className={cn(styles.similarThumb, isDesign && styles.similarThumbDesign)}>
                                            <Block
                                                tone={isDesign ? 'designMuted' : 'sidebar'}
                                                width="100%"
                                                height="100%"
                                                className={styles.imageFill}
                                            />
                                        </div>
                                        <div className={styles.similarContent}>
                                            <Block tone={isDesign ? 'design' : 'sidebar'} height={16} width="100%" />
                                            <Block tone={isDesign ? 'design' : 'sidebar'} height={16} width="82%" />
                                            <Block tone={isDesign ? 'designMuted' : 'sidebar'} height={13} width="45%" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(BlogDetailSkeleton);
