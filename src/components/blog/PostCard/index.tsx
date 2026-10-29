'use client';

import React from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';
import { BlogSiteConfig } from '@/src/components/blog/config';

import cn from 'classnames';

import styles from './styles.module.sass';

interface Props {
    post: BLOG_POST;
    siteKey: BlogSiteConfig['key'];
    config: BlogSiteConfig;
}

const PostCard = ({ post, siteKey, config }: Readonly<Props>) => {
    const locale = useLocale();
    const t = useTranslations('buttons');
    const imagePath = post.featuredImagePath;

    return (
        <article className={styles.card} data-variant={siteKey}>
            <Link
                href={`/${locale}${config.blogHome}/${post.slug}`}
                className={styles.link}
                aria-label={post.title}
            >
                <div className={styles.imageWrapper}>
                    <NextImage
                        src={imagePath?.src ?? ''}
                        alt={post.featuredImage?.alt || post.title}
                        width={600}
                        height={400}
                        className={styles.image}
                    />
                    {post.category && (
                        <span className={cn(styles.category, config.bodyFont.className)}>
                            {post.category}
                        </span>
                    )}
                </div>
                <div className={styles.content}>
                    {post.formattedDate && (
                        <time className={cn(styles.date, config.bodyFont.className)} dateTime={post.publishedAt}>
                            {post.formattedDate}
                        </time>
                    )}
                    <h3 className={cn(styles.title, config.titleFont.className)}>
                        {post.title}
                    </h3>
                    <p className={cn(styles.excerpt, config.bodyFont.className)}>
                        {post.excerpt}
                    </p>
                    <span className={cn(styles.readMore, config.bodyFont.className)}>
                        {t('read-more')}
                    </span>
                </div>
            </Link>
        </article>
    );
};

export default React.memo(PostCard);
