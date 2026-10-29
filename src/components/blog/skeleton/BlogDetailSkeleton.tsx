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
    design: '#5F401B',
    language: '#006ED2',
};

interface Props {
    siteKey: BlogSiteKey;
};

const BlogDetailSkeleton = ({ siteKey }: Readonly<Props>) => {
    const blogAccent = BLOG_ACCENT[siteKey];

    return (
        <section
            className={mainStyles.section}
            data-variant={siteKey}
            data-blog-page
            style={{ '--blog-accent': blogAccent } as React.CSSProperties}
            aria-busy="true"
            aria-label="Loading blog post"
        >
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
            <Container className="container">
                <div className={mainStyles.layout}>
                    <article className={cn(mainStyles.content, styles.articleContent)}>
                        <div className={mainStyles.imageWrapper}>
                            <div className={styles.featuredImageInner}>
                                <Block tone="light" width="100%" height="100%" className={styles.imageFill} />
                            </div>
                        </div>
                        <div className={styles.excerptLines}>
                            <Block tone="light" height={20} width="88%" />
                            <Block tone="light" height={20} width="72%" />
                        </div>
                        <div className={styles.bodyLines}>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <Block
                                    key={index}
                                    tone="light"
                                    height={16}
                                    width={index === 7 ? '64%' : '100%'}
                                />
                            ))}
                        </div>
                        <div className={styles.shareRow}>
                            <Block tone="light" height={40} width={120} />
                            <Block tone="light" height={40} width={40} />
                            <Block tone="light" height={40} width={40} />
                            <Block tone="light" height={40} width={40} />
                        </div>
                    </article>
                    <aside className={mainStyles.sidebar}>
                        <div className={mainStyles.sidebarInner}>
                            <div className={mainStyles.sidebarTitle}>
                                <Block tone="sidebar" height={24} width="72%" />
                            </div>
                            <div className={styles.similarList}>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className={styles.similarItem}>
                                        <div className={styles.similarThumb}>
                                            <Block tone="sidebar" width="100%" height="100%" className={styles.imageFill} />
                                        </div>
                                        <div className={styles.similarContent}>
                                            <Block tone="sidebar" height={16} width="100%" />
                                            <Block tone="sidebar" height={16} width="82%" />
                                            <Block tone="sidebar" height={13} width="45%" />
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
