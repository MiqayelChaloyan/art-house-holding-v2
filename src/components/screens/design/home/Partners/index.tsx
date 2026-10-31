'use client'

import React, { useMemo } from 'react';

import { InstrumentSerif } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    clients?: CLIENT_ITEM[];
};

const Partners = ({ clients }: Readonly<Props>) => {
    const items = useMemo(
        () => (clients || []).filter((item) => item?.name || item?.logo?.alt),
        [clients],
    );

    if (!items.length) return null;

    const loop = [...items, ...items];

    return (
        <section id="partners" className={styles.section} aria-label="Clients">
            <div className={styles.marquee}>
                <div className={cn(styles.track, InstrumentSerif.className)}>
                    {loop.map((client, index) => {
                        const label = (client.name || client.logo?.alt || '').trim();
                        if (!label) return null;

                        return (
                            <span key={`${client._key}-${index}`} className={styles.item}>
                                {label}
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
