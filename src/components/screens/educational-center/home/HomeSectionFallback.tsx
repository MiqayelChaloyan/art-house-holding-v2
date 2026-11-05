import React from 'react';

import styles from './HomeSectionFallback.module.sass';


interface Props {
    tall?: boolean;
};

const HomeSectionFallback = ({ tall }: Readonly<Props>) => (
    <div className={tall ? styles.blockTall : styles.block} aria-hidden />
);

export default HomeSectionFallback;
