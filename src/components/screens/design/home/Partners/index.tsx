'use client'

import React, { useMemo } from 'react';

import { designFont } from '@/src/constants/font';

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

    const copies = Math.max(8, Math.ceil(16 / items.length));
    const row = (lane: string) => Array.from({ length: copies }, (_, copy) => (
        items.map((client, index) => (
            <span key={`${lane}-${copy}-${client._key || index}`} className={styles.item}>
                {(client.name || '').trim()}
                <span className={styles.dot}>.</span>
            </span>
        ))
    ));

    return (
        <section id="partners" className={styles.section} aria-label="Partners">
            <div className={styles.marquee}>
                <div className={cn(styles.track, designFont.serif)}>
                    {row('a')}
                    <span className={styles.loop} aria-hidden>
                        {row('b')}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Partners);
