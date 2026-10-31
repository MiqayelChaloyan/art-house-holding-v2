'use client'

import React from 'react';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import NextImage from '@/src/components/components/image';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { InstrumentSerif, Inter } from '@/src/constants/font';
import { BLOG_SITE_CONFIG } from '@/src/components/blog/config';
import { formatCardDate } from '@/src/utils/format-date';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    section?: BLOG_SECTION;
    posts: BLOG_POST[];
};

const Blog = ({ section, posts }: Readonly<Props>) => {
    const locale = useLocale();
    const config = BLOG_SITE_CONFIG.design;

    const items = posts.filter((post) => post?.slug && post?.title).slice(0, 4);
    if (!items.length) return null;

    const [featured, ...rest] = items;
    const copy = {
        eyebrow: section?.eyebrow || '',
        line1: section?.section_title || '',
        line2: section?.section_subtitle || '',
    };

    const hrefFor = (slug: string) => `/${locale}${config.blogHome}/${slug}`;
    const imageFor = (post: BLOG_POST, maxWidth: number) => (
        post.featuredImage ? urlForImage(post.featuredImage, maxWidth) : post.featuredImagePath
    );

    return (
        <section id="blog" className={cn(styles.section, Inter.className)}>
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {copy.eyebrow}
                    </p>
                    <h2 className={cn(styles.headline, locale === 'am' && styles.headlineAm, locale === 'ru' && styles.headlineRu, InstrumentSerif.className)}>
                        <span>{copy.line1}</span>
                        <span className={styles.emphasis}>{copy.line2}</span>
                    </h2>
                </header>

                <div className={styles.stage}>
                    <Link href={hrefFor(featured.slug)} className={styles.featuredFrame} aria-label={featured.title}>
                        {(() => {
                            const image = imageFor(featured, 1500);
                            if (!image?.src) return null;
                            return (
                                <NextImage
                                    src={image.src}
                                    alt={featured.featuredImage?.alt || featured.title}
                                    className={styles.featuredImage}
                                    width={image.width}
                                    height={image.height}
                                    sizes="(max-width: 860px) 100vw, 753px"
                                    priority
                                />
                            );
                        })()}
                    </Link>

                    {rest.length > 0 && (
                        <ul className={styles.list}>
                            {rest.map((post) => (
                                <li key={post._id}>
                                    <Link href={hrefFor(post.slug)} className={styles.item}>
                                        <span className={styles.thumb}>
                                            {(() => {
                                                const image = imageFor(post, 420);
                                                if (!image?.src) return null;
                                                return (
                                                    <NextImage
                                                        src={image.src}
                                                        alt={post.featuredImage?.alt || post.title}
                                                        className={styles.thumbImage}
                                                        width={image.width}
                                                        height={image.height}
                                                        sizes="201px"
                                                    />
                                                );
                                            })()}
                                        </span>
                                        <span className={styles.itemCopy}>
                                            <span className={styles.meta}>
                                                {post.category && <span className={styles.category}>{post.category}</span>}
                                                {post.category && post.publishedAt && <span className={styles.sep} aria-hidden />}
                                                {post.publishedAt && (
                                                    <time dateTime={post.publishedAt}>{formatCardDate(post.publishedAt, locale)}</time>
                                                )}
                                            </span>
                                            <span className={styles.itemTitle}>{post.title}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    <Link href={hrefFor(featured.slug)} className={styles.featuredCopy}>
                        <span className={styles.meta}>
                            {featured.category && <span className={styles.category}>{featured.category}</span>}
                            {featured.category && featured.publishedAt && <span className={styles.sep} aria-hidden />}
                            {featured.publishedAt && (
                                <time dateTime={featured.publishedAt}>{formatCardDate(featured.publishedAt, locale)}</time>
                            )}
                        </span>
                        <span className={styles.featuredTitle}>{featured.title}</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Blog);
