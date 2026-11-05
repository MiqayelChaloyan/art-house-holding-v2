'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';

import { designFont } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    section?: CERTIFICATES_SECTION;
};

const Certificates = ({ section }: Readonly<Props>) => {
    const t = useTranslations('certificates-section');

    const copy = {
        line1: t('line-1'),
        line2: t('line-2'),
        line3: t('line-3'),
    };

    const sources = (section?.images || [])
        .filter((item) => item?.image?.asset)
        .map((item) => ({ key: item._key, image: item.image }))
        .slice(0, 10);

    if (!sources.length) return null;

    return (
        <section id="certificates" className={cn(styles.section, designFont.ui)}>
            <div className={styles.wrap}>
                    <h2 className={cn(styles.headline, designFont.serif)}>
                    <span className={styles.lead}>
                        {keepWords(copy.line1)}
                        {' '}
                        <em className={styles.emphasis}>{keepWords(copy.line2)}</em>
                    </span>
                    <span>{keepWords(copy.line3)}</span>
                </h2>
                <div className={styles.grid}>
                    {sources.map((source) => {
                        const image = urlForImage(source.image, 1300);
                        if (!image?.src) return null;
                        return (
                            <figure className={styles.frame} key={source.key}>
                                <NextImage
                                    src={image.src}
                                    alt={source.image.alt || copy.line1}
                                    className={styles.image}
                                    width={image.width}
                                    height={image.height}
                                    sizes="(max-width: 860px) 100vw, 648px"
                                />
                            </figure>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Certificates);
