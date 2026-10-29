'use client'

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Container from '@/src/components/components/container';
import NextImage from '@/src/components/components/image';

import { Pages } from '@/src/constants/pages';
import blocksToText from '@/src/helpers/BlocksToText';
import { Arial, Calibri } from '@/src/constants/font';
import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: HOME_DETALIS_LANGUAGE_QUERYResult;
    locale: string;
};

const navigationLinks = [
    { path: Pages.LANGUAGE_SEND_REQUEST, label: 'send-request', className: 'send-btn' },
    { path: `${Pages.LANGUAGE_HOME}${Pages.LANGUAGE_ABOUT}`, label: 'more', className: 'more-btn' },
];

const About = ({ data, locale }: Readonly<Props>) => {
    const t = useTranslations();
    const content: string = blocksToText(data.about_us.content).slice(0, 900);

    const gallery: JSX.Element[] = data.about_us.about_us_images?.map((image: ImagePath, index: number) => {
        const path: ImagePath = urlForImage(image);

        return (
            <NextImage
                key={index}
                src={path?.src}
                alt={image?.alt}
                className={styles.image}
                width={500}
                height={500}
            />
        );
    });

    return (
        <section id='about'>
            <Container className='container'>
                <div className={styles.about}>
                    <div className={styles.column}>
                        <h1 className={cn(styles.title, Arial.className)}>
                            {t('sections.about')}
                        </h1>
                        <p className={cn(styles.text, Calibri.className)}>
                            {content}...
                        </p>
                        <div className={styles.buttons}>
                            {navigationLinks.map(({ path, label, className }) => (
                                <Link
                                    key={label}
                                    href={`/${locale}${path}`}
                                    aria-label={path}
                                    prefetch={true}
                                    className={cn(
                                        styles.button,
                                        Arial.className,
                                        styles[className]
                                    )}
                                >
                                    {t(`texts.${label}`)}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className={styles.gallery}>
                        <div className={styles.gallery_one}>
                            {gallery[0]}
                        </div>
                        <div className={styles.gallery_two}>
                            {gallery[1]}
                        </div>
                        <div className={styles.gallery_three}>
                            {gallery[2]}
                        </div>
                    </div>
                </div>
                <div className={styles.expanding_gallery}>
                    <div className={styles.expanding}>{gallery}</div>
                </div>
            </Container>
        </section>
    )
};

export default React.memo(About);