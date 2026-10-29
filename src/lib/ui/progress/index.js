'use client'

import React, { useEffect, useState } from 'react';

import { ArianAMU } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


const ProgressItem = ({ value = 0, quantity, isPlusSign }) => {
    const [percent, setPercent] = useState(value);
    const plus = isPlusSign ? '+' : '';

    useEffect(() => {
        const target = Number(quantity) || 0;
        let frame;
        const duration = 1400;
        const start = performance.now();
        const from = 0;

        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setPercent(Math.round(from + (target - from) * eased));
            if (t < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [quantity]);

    return <p className={cn(styles.percent, ArianAMU.className)}>{percent} {plus}</p>;
};

export default React.memo(ProgressItem);
