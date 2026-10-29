'use client'

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';

import { Pages } from '@/src/constants/pages';
import { Arial, ArianAMU } from '@/src/constants/font';

import useWindowSize from '@/src/hooks/useWindowSize';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { ImagePath } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: QUIZ_QUERYResult[];
    locale: string;
};

const Home = ({ data, locale }: Readonly<Props>) => {
    const t = useTranslations('texts');
    const windowSize = useWindowSize();

    const links: JSX.Element[] = data?.map((lang: QUIZ_QUERYResult) => {
        const path: ImagePath = urlForImage(lang.question_logo);

        return locale && windowSize.width < 600 ? (
            <Link
                href={`/${locale}${Pages.LANGUAGE_QUIZ}/${lang.slug}`}
                aria-label={`${Pages.LANGUAGE_QUIZ}/${lang.slug}`}
                className={styles.row}
                key={lang.slug}
            >
                <NextImage
                    src={path?.src}
                    alt={lang.question_logo.alt}
                    className={styles.language}
                    width={500}
                    height={500}
                />
                <h3 className={cn(styles.language_name, ArianAMU.className)}>
                    {lang.name}
                </h3>
            </Link>
        ) : (
            <Link
                key={lang.slug}
                href={`/${locale}${Pages.LANGUAGE_QUIZ}/${lang.slug}`}
                aria-label={`${Pages.LANGUAGE_QUIZ}/${lang.slug}`}
                className={styles.link}
            >
                <NextImage
                    src={path?.src}
                    alt={lang.question_logo.alt}
                    className={styles.language}
                    width={500}
                    height={500}
                />
            </Link>
        )
    });

    return (
        <section id='quiz'>
            <h1 className={cn(styles.title, Arial.className)}>
                {t('select-language')}
            </h1>
            <div className={styles.href}>
                {links}
            </div>
        </section>
    )
};

export default React.memo(Home);