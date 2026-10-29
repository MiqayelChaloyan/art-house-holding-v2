'use client'

import React from 'react';

import { useLocale, useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';

import { InstrumentSerif, Inter } from '@/src/constants/font';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    section?: CERTIFICATES_SECTION;
};

const Certificates = ({ section }: Readonly<Props>) => {
    const t = useTranslations('certificates-section');
    const locale = useLocale();

    const copy = {
        line1: section?.line_1 || t('line-1'),
        line2: section?.line_2 || t('line-2'),
        line3: section?.line_3 || t('line-3'),
    };

    const certificate = section?.certificate ? urlForImage(section.certificate) : undefined;
    const diploma = section?.diploma ? urlForImage(section.diploma) : undefined;

    if (!certificate?.src && !diploma?.src) return null;

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
                    {certificate?.src && (
                        <figure className={styles.frame}>
                            <NextImage
                                src={certificate.src}
                                alt={section?.certificate?.alt || copy.line1}
                                className={styles.image}
                                width={1200}
                                height={850}
                            />
                        </figure>
                    )}
                    {diploma?.src && (
                        <figure className={styles.frame}>
                            <NextImage
                                src={diploma.src}
                                alt={section?.diploma?.alt || copy.line3}
                                className={styles.image}
                                width={1200}
                                height={850}
                            />
                        </figure>
                    )}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Certificates);
