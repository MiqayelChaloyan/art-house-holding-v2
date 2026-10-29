'use client';

import React from 'react';

import { useLocale, useTranslations } from 'next-intl';

import Container from '@/src/components/components/container';
import BlogBackLink from '@/src/components/blog/BackLink';
import { BLOG_SITE_CONFIG, BlogSiteKey } from '@/src/components/blog/config';
import PostCard from '@/src/components/blog/PostCard';

import cn from 'classnames';

import styles from './styles.module.sass';

const BLOG_ACCENT: Record<BlogSiteKey, string> = {
    educational: '#DF362D',
    design: '#5F401B',
    language: '#006ED2',
};

interface Props {
    siteKey: BlogSiteKey;
    posts: BLOG_POST[];
    section?: BLOG_SECTION;
}

const ListPage = ({ siteKey, posts, section }: Readonly<Props>) => {
    const locale = useLocale();
    const config = BLOG_SITE_CONFIG[siteKey];
    const t = useTranslations('navigation');
    const textsT = useTranslations('texts');
    const sectionTitle = section?.section_title || t('blog');
    const sectionSubtitle = section?.section_subtitle;
    const blogAccent = BLOG_ACCENT[siteKey];

    return (
        <section
            className={cn(styles.section, config.bodyFont.className)}
            data-variant={siteKey}
            data-blog-page
            style={{ '--blog-accent': blogAccent } as React.CSSProperties}
        >
            <div className={styles.hero}>
                <Container className='container'>
                    <div className={styles.heroTop}>
                        <BlogBackLink
                            href={`/${locale}${config.siteHome}`}
                            config={config}
                        />
                    </div>
                    <div className={styles.header}>
                        {config.heroEyebrowKey && (
                            <span className={cn(styles.eyebrow, config.bodyFont.className)}>
                                {textsT(config.heroEyebrowKey)}
                            </span>
                        )}
                        <h1 className={cn(styles.title, config.titleFont.className)}>
                            {sectionTitle}
                        </h1>
                        {sectionSubtitle && (
                            <p className={cn(styles.subtitle, config.bodyFont.className)}>
                                {sectionSubtitle}
                            </p>
                        )}
                    </div>
                </Container>
            </div>
            <Container className='container'>
                <div className={styles.grid}>
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} siteKey={siteKey} config={config} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default React.memo(ListPage);
