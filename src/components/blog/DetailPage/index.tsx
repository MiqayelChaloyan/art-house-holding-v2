'use client';

import React from 'react';

import { BLOG_SITE_CONFIG, BlogSiteKey } from '@/src/components/blog/config';
import Main from './Main';

import cn from 'classnames';

import styles from './styles.module.sass';

const BLOG_ACCENT: Record<BlogSiteKey, string> = {
    educational: '#DF362D',
    design: '#5F401B',
    language: '#006ED2',
};

interface Props {
    siteKey: BlogSiteKey;
    post: BLOG_POST_DETAIL;
    similarPosts: BLOG_POST[];
    shareUrl: string;
}

const DetailPage = ({ siteKey, post, similarPosts, shareUrl }: Readonly<Props>) => {
    const config = BLOG_SITE_CONFIG[siteKey];
    const blogAccent = BLOG_ACCENT[siteKey];

    return (
        <div
            className={cn(styles.root, config.bodyFont.className)}
            data-variant={siteKey}
            data-blog-page
            style={{ '--blog-accent': blogAccent } as React.CSSProperties}
        >
            <Main
                siteKey={siteKey}
                config={config}
                post={post}
                similarPosts={similarPosts}
                shareUrl={shareUrl}
            />
        </div>
    );
};

export default React.memo(DetailPage);
