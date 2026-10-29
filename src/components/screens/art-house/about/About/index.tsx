'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';
import Container from '@/src/components/components/container';

import { PortableText } from '@portabletext/react';
import components from '@/src/helpers/PortableTextComponents';

import { ArianAMU } from '@/src/constants/font';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { ImagePath } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    content: TEXT;
    image: Asset;
};

const About = ({ content, image }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(image);
    const t = useTranslations('');

    return (
        <section id='about-us' className={styles.section}>
            <div className={styles.wrapper}>
                <Container className='container'>
                    <div className={styles.box}>
                        <NextImage
                            src={path?.src}
                            alt={image?.alt}
                            className={styles['right-side']}
                            width={500}
                            height={500}
                        />
                        <div>
                            <h2 className={cn(styles.title, ArianAMU.className)}>
                                {t('navigation.about')}
                            </h2>
                            <PortableText
                                value={content}
                                components={components}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    )
};

export default About;
