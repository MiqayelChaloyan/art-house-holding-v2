'use client'

import React from 'react';

import NextImage from '@/src/components/components/image';
import Partners from '@/src/components/screens/design/home/Partners';

import { InstrumentSerif, Inter, Montserrat } from '@/src/constants/font';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: ABOUT_PAGE_DESIGN_QUERYResult;
    clients?: CLIENT_ITEM[];
};

const About = ({ data, clients }: Readonly<Props>) => {
    const image = data.image?.asset ? urlForImage(data.image, 1040) : undefined;
    const sections = (data.sections || []).filter((item) => item?.heading && item?.body);
    const line1 = data.line_1 || '';
    const line2 = data.line_2 || '';

    return (
        <>
            <section id="about" className={cn(styles.section, Inter.className)}>
                <div className={styles.wrap}>
                    <div className={styles.hero}>
                        <div>
                            <p className={styles.eyebrow}>
                                <span className={styles.mark} aria-hidden />
                                {data.eyebrow}
                            </p>
                            <h1 className={cn(styles.headline, InstrumentSerif.className)}>
                                <span>{line1}</span>
                                <span className={styles.emphasis}>{line2}</span>
                            </h1>
                            {data.intro && <p className={cn(styles.intro, Montserrat.className)}>{data.intro}</p>}
                        </div>
                        {image?.src && (
                            <figure className={styles.portrait}>
                                <NextImage
                                    src={image.src}
                                    alt={data.image?.alt || line2}
                                    className={styles.image}
                                    width={image.width}
                                    height={image.height}
                                    sizes="(max-width: 980px) 100vw, 518px"
                                    priority
                                />
                            </figure>
                        )}
                    </div>

                    {sections.length > 0 && (
                        <div className={cn(styles.blocks, Montserrat.className)}>
                            {sections.map((item) => (
                                <article key={item._key} className={styles.block}>
                                    <h2>{item.heading}</h2>
                                    {item.body.split(/\n{2,}/).map((paragraph, index) => (
                                        <p key={`${item._key}-${index}`}>{paragraph}</p>
                                    ))}
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <Partners clients={clients} />
        </>
    );
};

export default React.memo(About);
