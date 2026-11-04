'use client';

import React from 'react';

import cn from 'classnames';

import { BlogSiteKey } from '@/src/components/blog/config';

import Block from './Block';

import styles from './styles.module.sass';

interface Props {
    siteKey: BlogSiteKey;
};

const PostCardSkeleton = ({ siteKey }: Readonly<Props>) => {
    const isDesign = siteKey === 'design';

    return (
        <article className={styles.cardShell} data-variant={siteKey} aria-hidden="true">
            <div className={cn(styles.cardImage, isDesign && styles.cardImageDesign)}>
                <Block
                    tone={isDesign ? 'designMuted' : 'light'}
                    width="100%"
                    height="100%"
                    className={styles.imageFill}
                />
                {!isDesign && <Block tone="accent" height={28} width={88} className={styles.cardCategory} />}
            </div>
            <div className={cn(styles.cardBody, isDesign && styles.cardBodyDesign)}>
                <Block tone={isDesign ? 'designMuted' : 'light'} height={isDesign ? 14 : 13} width="38%" />
                <Block tone={isDesign ? 'design' : 'light'} height={isDesign ? 20 : 22} width="92%" />
                <Block tone={isDesign ? 'design' : 'light'} height={isDesign ? 20 : 22} width="76%" />
                {!isDesign && (
                    <>
                        <div className={styles.excerptLines}>
                            <Block tone="light" height={15} width="100%" />
                            <Block tone="light" height={15} width="100%" />
                            <Block tone="light" height={15} width="68%" />
                        </div>
                        <Block
                            tone="accent"
                            height={40}
                            width={132}
                            className={cn(
                                styles.readMoreBtn,
                                siteKey === 'language' && styles.readMoreBtnLanguage,
                            )}
                        />
                    </>
                )}
                {isDesign && <Block tone="design" height={14} width={96} />}
            </div>
        </article>
    );
};

export default React.memo(PostCardSkeleton);
