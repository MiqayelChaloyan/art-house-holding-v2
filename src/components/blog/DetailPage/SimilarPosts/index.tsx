'use client';

import React from 'react';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import NextImage from '@/src/components/components/image';
import { BlogSiteConfig } from '@/src/components/blog/config';

import cn from 'classnames';

import styles from './styles.module.sass';

interface Props {
    posts: BLOG_POST[];
    config: BlogSiteConfig;
}

const SimilarPosts = ({ posts, config }: Readonly<Props>) => {
    const locale = useLocale();

    if (!posts?.length) {
        return null;
    }

    return (
        <div className={styles.list} data-variant={config.key}>
            {posts.map((post) => {
                const imagePath = post.featuredImagePath;

                return (
                    <Link
                        key={post._id}
                        href={`/${locale}${config.blogHome}/${post.slug}`}
                        className={cn(styles.item, config.bodyFont.className)}
                        aria-label={post.title}
                    >
                        <div className={styles.thumbnail}>
                            <NextImage
                                src={imagePath?.src ?? ''}
                                alt={post.featuredImage?.alt || post.title}
                                width={120}
                                height={120}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.content}>
                            <h3 className={cn(styles.title, config.titleFont.className)}>{post.title}</h3>
                            {post.formattedDate && (
                                <time className={cn(styles.date, config.bodyFont.className)} dateTime={post.publishedAt}>
                                    {post.formattedDate}
                                </time>
                            )}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default React.memo(SimilarPosts);
