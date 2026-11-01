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
        () => (clients || []).filter((item) => item?.name?.trim()),
        [clients],
    );

    if (!items.length) return null;

    const row = (copy: number) => items.map((client, index) => (
        <span key={`${copy}-${client._key || index}`} className={styles.item}>
            {(client.name || '').trim()}
            <span className={styles.dot}>.</span>
        </span>
    ));

    return (
        <section id="partners" className={styles.section} aria-label="Partners">
            <div className={styles.marquee}>
                <div className={cn(styles.track, InstrumentSerif.className)}>
                    {row(0)}
                </div>
                <div className={cn(styles.track, InstrumentSerif.className)} aria-hidden>
                    {row(1)}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Partners);
