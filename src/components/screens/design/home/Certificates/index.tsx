'use client'

import React from 'react';

import { useLocale } from 'next-intl';

import NextImage from '@/src/components/components/image';

import { InstrumentSerif, Inter } from '@/src/constants/font';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    section?: CERTIFICATES_SECTION;
};

const Certificates = ({ section }: Readonly<Props>) => {
    const locale = useLocale();

    const copy = {
        line1: section?.line_1 || '',
        line2: section?.line_2 || '',
        line3: section?.line_3 || '',
    };

    const listed = (section?.images || [])
        .filter((item) => item?.image?.asset)
        .map((item) => ({ key: item._key, image: item.image }));
    const legacy = [
        section?.certificate?.asset ? { key: 'certificate', image: section.certificate } : null,
        section?.diploma?.asset ? { key: 'diploma', image: section.diploma } : null,
    ].filter((item): item is { key: string; image: Asset } => Boolean(item));
    const sources = (listed.length ? listed : legacy).slice(0, 10);

    if (!sources.length) return null;

    return (
        <section id="certificates" className={cn(styles.section, Inter.className)}>
            <div className={styles.wrap}>
                <h2 className={cn(styles.headline, locale === 'am' && styles.headlineAm, locale === 'ru' && styles.headlineRu, InstrumentSerif.className)}>
                    <span className={styles.lead}>
                        {copy.line1}
                        {' '}
                        <em className={styles.emphasis}>{copy.line2}</em>
                    </span>
                    <span>{copy.line3}</span>
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
