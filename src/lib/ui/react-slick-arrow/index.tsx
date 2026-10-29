import React from 'react';

import cn from 'classnames';

import styles from './style.module.sass';


interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={cn(className, styles.arrow_next)}
            style={{ ...style, display: 'block', width: 40, height: 40 }}
            onClick={onClick}
        />
    );
};

export const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={cn(className, styles.arrow_prev)}
            style={{ ...style, display: 'block', width: 40, height: 40 }}
            onClick={onClick}
        />
    );
};
