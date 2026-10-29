'use client'

import React from 'react';

import { useLocale, useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';
import Partners from '@/src/components/screens/design/home/Partners';

import { InstrumentSerif, Inter } from '@/src/constants/font';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: ABOUT_PAGE_DESIGN_QUERYResult;
    clients?: CLIENT_ITEM[];
};

const stripEnd = (value: string) => value.replace(/[.\u0589]+$/u, '');

const About = ({ data, clients }: Readonly<Props>) => {
    const locale = useLocale();
    const t = useTranslations('about-page');
    const image = data.image?.asset ? urlForImage(data.image) : undefined;
    const sections = (data.sections || []).filter((item) => item?.heading && item?.body);
    const line1 = data.line_1 || t('line-1');
    const line2 = stripEnd(data.line_2 || t('line-2'));

    return (
        <>
            <section id="about" className={cn(styles.section, Inter.className)}>
                <div className={styles.wrap}>
                    {image?.src && (
                        <figure className={styles.portrait}>
                            <NextImage
                                src={image.src}
                                alt={data.image?.alt || line2}
                                className={styles.image}
                                width={900}
                                height={1200}
                            />
                        </figure>
                    )}

                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {data.eyebrow || t('eyebrow')}
                    </p>
                    <h1 className={cn(styles.headline, locale === 'am' && styles.headlineAm, locale === 'ru' && styles.headlineRu, InstrumentSerif.className)}>
                        <span>{line1}</span>
                        <span className={styles.emphasis}>
                            {line2}
                            <span className={styles.dot}>.</span>
                        </span>
                    </h1>
                    {data.intro && <p className={styles.intro}>{data.intro}</p>}

                    <div className={styles.blocks}>
                        {sections.map((item) => (
                            <article key={item._key} className={styles.block}>
                                <h2>{item.heading}</h2>
                                {item.body.split(/\n{2,}/).map((paragraph, index) => (
                                    <p key={`${item._key}-${index}`}>{paragraph}</p>
                                ))}
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <Partners clients={clients} />
        </>
    );
};

export default React.memo(About);
