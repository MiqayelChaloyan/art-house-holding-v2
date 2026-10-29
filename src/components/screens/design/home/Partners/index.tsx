'use client'

import React, { useMemo } from 'react';

import NextImage from '@/src/components/components/image';

import { InstrumentSerif } from '@/src/constants/font';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    clients?: CLIENT_ITEM[];
};

const Partners = ({ clients }: Readonly<Props>) => {
    const items = useMemo(
        () => (clients || []).filter((item) => item?.logo?.asset),
        [clients],
    );

    if (!items.length) return null;

    const loop = [...items, ...items];

    return (
        <section id="partners" className={styles.section} aria-label="Clients">
            <div className={styles.marquee}>
                <div className={cn(styles.track, InstrumentSerif.className)}>
                    {loop.map((client, index) => {
                        const image = urlForImage(client.logo);
                        if (!image?.src) return null;

                        return (
                            <span key={`${client._key}-${index}`} className={styles.item}>
                                <NextImage
                                    src={image.src}
                                    alt={client.logo?.alt || client.name || 'Client'}
                                    className={styles.logo}
                                    width={154}
                                    height={154}
                                />
                                <span className={styles.dot}>.</span>
                            </span>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Partners);
