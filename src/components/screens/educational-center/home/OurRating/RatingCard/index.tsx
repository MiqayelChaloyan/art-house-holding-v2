'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';

import Search from '@/src/lib/icons/educational-center/Search';
import Star from '@/src/lib/icons/educational-center/Star';
import { Inter } from '@/src/constants/font';

import { Options } from '@/src/types/educational-center';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


const RatingCard = ({ options }: Readonly<Options | any>) => {
    const t = useTranslations('texts');

    return (
        <div className={styles.column} style={{ backgroundImage: `url(${options.urlForImageBackground})` }}>
            <div className={styles.rating_card_blog} style={{ marginTop: `${options.top ? options.top : 20}px` }}>
                <div className={styles.header} style={{ marginBottom: `${options.bottom ? options.bottom : 20}px` }}>
                    <div className={styles.header_text}>
                        <p className={Inter.className}>
                            {t('rating-title')}
                        </p>
                    </div>
                    <div className={styles.header_icon}>
                        <Search
                            width='25'
                            height='25'
                            fill={colors.white}
                        />
                    </div>
                </div>
                <div className={styles.card} style={{ marginLeft: `${options.left ? options.left : 10}px` }}>
                    <div className={styles.left}>
                        <NextImage
                            src={options.urlForImage}
                            alt={options.urlImageAlt}
                            className={styles.user_image}
                            width={500}
                            height={500}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.right}>
                        <p className={styles.name}>{options.name}</p>
                        <div className={styles.rating}>
                            {Array.from(Array(options.rating).keys()).map((star, index) => (
                                <Star
                                    width='20'
                                    height='20'
                                    fill={star ? colors.black : colors.white}
                                    key={index}
                                />
                            ))}
                        </div>
                        <p className={cn(styles.thinking, Inter.className)}>
                            {options.result.slice(0, 100)}...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RatingCard);