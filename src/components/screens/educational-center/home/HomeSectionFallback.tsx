import React from 'react';

import cn from 'classnames';

import styles from './HomeSectionFallback.module.sass';


interface Props {
    tall?: boolean;
    light?: boolean;
};

const HomeSectionFallback = ({ tall, light }: Readonly<Props>) => (
    <div
        className={cn(
            tall ? styles.blockTall : styles.block,
            light && styles.blockLight,
        )}
        aria-hidden
    />
);

export default HomeSectionFallback;
