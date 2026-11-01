'use client';

import React from 'react';

import { useLocale, useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';
import Container from '@/src/components/components/container';
import BlogBackLink from '@/src/components/blog/BackLink';
import { BlogSiteConfig } from '@/src/components/blog/config';
import Gallery from '../Gallery';
import Share from '../Share';
import SimilarPosts from '../SimilarPosts';
import StickySidebar from '../StickySidebar';

import { PortableText } from '@portabletext/react';
import components from '@/src/helpers/PortableTextComponents';

import cn from 'classnames';

import styles from './styles.module.sass';

interface Props {
    siteKey: BlogSiteConfig['key'];
    config: BlogSiteConfig;
    post: BLOG_POST_DETAIL;
    similarPosts: BLOG_POST[];
    shareUrl: string;
}

const Main = ({ siteKey, config, post, similarPosts, shareUrl }: Readonly<Props>) => {
    const locale = useLocale();
    const sectionT = useTranslations('sections');
    const textsT = useTranslations('texts');
    const imagePath = post.featuredImagePath;
    const isDesign = siteKey === 'design';
    const hasDarkHero = !isDesign && Boolean(config.heroEyebrowKey);
    const heroEyebrowKey = config.heroEyebrowKey;

    const backLink = (
        <BlogBackLink
            href={`/${locale}${config.blogHome}`}
            config={config}
        />
    );

    const postMeta = (
        <>
            {post.category && (
                <span className={cn(styles.category, config.bodyFont.className)}>
                    {post.category}
                </span>
            )}
            <h1 className={cn(styles.title, config.titleFont.className)}>
                {post.title}
            </h1>
            {post.formattedDate && (
                <time className={cn(styles.date, config.bodyFont.className)} dateTime={post.publishedAt}>
                    {post.formattedDate}
                </time>
            )}
        </>
    );

    return (
        <section className={cn(styles.section, config.bodyFont.className)} data-variant={siteKey}>
            {hasDarkHero && (
                <div className={styles.hero}>
                    <Container className='container'>
                        <div className={styles.heroTop}>
                            {backLink}
                            {heroEyebrowKey && (
                                <span className={cn(styles.heroEyebrow, config.bodyFont.className)}>
                                    {textsT(heroEyebrowKey)}
                                </span>
                            )}
                        </div>
                        <div className={styles.heroMeta}>
                            {postMeta}
                        </div>
                    </Container>
                </div>
            )}
            <Container className='container'>
                {!hasDarkHero && backLink}
                <div className={styles.layout}>
                    <article className={styles.content}>
                        {!hasDarkHero && postMeta}
                        <div className={styles.imageWrapper}>
                            <NextImage
                                src={imagePath?.src ?? ''}
                                alt={post.featuredImage?.alt || post.title}
                                width={1200}
                                height={675}
                                className={styles.image}
                            />
                        </div>
                        {post.excerpt && (
                            <p className={cn(styles.excerpt, config.bodyFont.className)}>
                                {post.excerpt}
                            </p>
                        )}
                        <div className={cn(styles.body, config.bodyFont.className)}>
                            <PortableText
                                value={post.body}
                                components={components}
                            />
                        </div>
                        <Gallery images={post.gallery ?? []} caption={post.galleryCaption} config={config} />
                        <Share
                            shareUrl={shareUrl}
                            title={post.title}
                            keywords={post.keywords}
                            config={config}
                        />
                    </article>
                    {similarPosts.length > 0 && (
                        <StickySidebar
                            className={styles.sidebar}
                            innerClassName={styles.sidebarInner}
                            topOffset={isDesign ? 118 : 100}
                            mobileBreakpoint={isDesign ? 980 : 768}
                        >
                            <h2 className={cn(styles.sidebarTitle, config.titleFont.className)}>
                                {sectionT('similar-posts')}
                            </h2>
                            <SimilarPosts posts={similarPosts} config={config} />
                        </StickySidebar>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default React.memo(Main);
