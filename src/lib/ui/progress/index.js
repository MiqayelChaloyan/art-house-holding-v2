'use client'

import React, { useEffect, useState } from 'react';

import { ArianAMU } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


const ProgressItem = ({ value = 0, quantity, isPlusSign }) => {
    const [percent, setPercent] = useState(value);
    const plus = isPlusSign && '+';

    useEffect(() => {
        if (percent < quantity) {
            setTimeout(() => setPercent(newval => newval + 1), 10);
        }
    }, [percent, quantity]);
    
    return <p className={cn(styles.percent, ArianAMU.className)}>{percent} {plus}</p>;
};

export default React.memo(ProgressItem);






