'use client';

import React from 'react';

import Container from '@/src/components/components/container';
import { BlogSiteKey } from '@/src/components/blog/config';
import listStyles from '@/src/components/blog/ListPage/styles.module.sass';

import Block from './Block';
import PostCardSkeleton from './PostCardSkeleton';

import cn from 'classnames';

import styles from './styles.module.sass';

const BLOG_ACCENT: Record<BlogSiteKey, string> = {
    educational: '#DF362D',
    design: '#5F401B',
    language: '#006ED2',
};

interface Props {
    siteKey: BlogSiteKey;
    count?: number;
};

const BlogListSkeleton = ({ siteKey, count = 6 }: Readonly<Props>) => {
    const blogAccent = BLOG_ACCENT[siteKey];

    return (
        <section
            className={listStyles.section}
            data-variant={siteKey}
            data-blog-page
            style={{ '--blog-accent': blogAccent } as React.CSSProperties}
            aria-busy="true"
            aria-label="Loading blog"
        >
            <div className={listStyles.hero}>
                <Container className="container">
                    <div className={listStyles.heroTop}>
                        <div className={cn(styles.backPill, styles.backPillLight)}>
                            <Block tone="hero" width={30} height={30} className={styles.backIcon} />
                            <Block tone="hero" height={14} width={72} />
                        </div>
                    </div>
                    <div className={cn(listStyles.header, styles.heroHeader)}>
                        <Block tone="hero" height={14} width={220} />
                        <Block tone="hero" height={siteKey === 'language' ? 56 : 48} width="min(560px, 72%)" />
                        <Block tone="hero" height={20} width="min(420px, 52%)" />
                    </div>
                </Container>
            </div>
            <Container className="container">
                <div className={listStyles.grid}>
                    {Array.from({ length: count }).map((_, index) => (
                        <PostCardSkeleton key={index} siteKey={siteKey} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default React.memo(BlogListSkeleton);
