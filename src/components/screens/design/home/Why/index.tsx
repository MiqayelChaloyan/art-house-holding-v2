'use client'

import React from 'react';

import { InstrumentSerif, Inter, JetBrainsMono, Montserrat } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    section?: WHY_SECTION;
};

const Why = ({ section }: Readonly<Props>) => {
    const copy = {
        eyebrow: section?.eyebrow || '',
        line1: section?.line_1 || '',
        line2: section?.line_2 || '',
    };

    const items = (section?.items || []).slice(0, 30);

    return (
        <section id="why-art-house" className={cn(styles.section, Inter.className)}>
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {copy.eyebrow}
                    </p>
                    <h2 className={cn(styles.headline, InstrumentSerif.className)}>
                        <span>{keepWords(copy.line1)}</span>
                        <span className={styles.emphasis}>{keepWords(copy.line2)}</span>
                    </h2>
                </header>
                <ul className={styles.grid}>
                    {items.map((item) => (
                        <li key={item._key} className={styles.cell}>
                            <div className={styles.numberRow}>
                                <span className={cn(styles.number, JetBrainsMono.className)}>{item.number}</span>
                                <span className={styles.rule} aria-hidden />
                            </div>
                            <h3 className={cn(styles.title, Montserrat.className)}>{keepWords(item.title)}</h3>
                            <p className={styles.description}>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default React.memo(Why);
