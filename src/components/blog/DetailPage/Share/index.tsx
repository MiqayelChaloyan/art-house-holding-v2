'use client';

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Facebook from '@/src/lib/icons/art-house/Facebook';
import X from '@/src/lib/icons/art-house/X';
import Telegram from '@/src/lib/icons/art-house/Telegram';
import { BlogSiteConfig } from '@/src/components/blog/config';

import cn from 'classnames';

import styles from './styles.module.sass';

interface Props {
    shareUrl: string;
    title: string;
    keywords?: string[];
    config: BlogSiteConfig;
}

const Share = ({ shareUrl, title, keywords, config }: Readonly<Props>) => {
    const t = useTranslations('texts');
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    const hashtag = keywords?.[0] ? encodeURIComponent(keywords[0].replace(/\s+/g, '')) : '';

    const shareLinks = [
        {
            name: 'Telegram',
            href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
            Icon: Telegram,
        },
        {
            name: 'X',
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${hashtag ? `&hashtags=${hashtag}` : ''}`,
            Icon: X,
        },
        {
            name: 'Facebook',
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            Icon: Facebook,
        },
    ];

    return (
        <div className={styles.share} data-variant={config.key}>
            {!!keywords?.length && (
                <div className={styles.meta}>
                    {keywords.map((keyword) => (
                        <span key={keyword} className={cn(styles.tag, config.bodyFont.className)}>
                            {keyword}
                        </span>
                    ))}
                </div>
            )}
            <div className={styles.actions}>
                <span className={cn(styles.label, config.bodyFont.className)}>
                    {t('share-post')}
                </span>
                <div className={styles.icons}>
                    {shareLinks.map(({ name, href, Icon }) => (
                        <Link
                            key={name}
                            href={href}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`${t('share-post')} ${name}`}
                            className={styles.iconLink}
                        >
                            <Icon width={22} height={22} fill='currentColor' />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Share);
