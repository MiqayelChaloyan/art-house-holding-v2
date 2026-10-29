'use client'

import React from 'react';

import cn from 'classnames';

import styles from './styles.module.sass';


interface PaginationProps {
    data: WORKER[];
    centerSlideDataIndex: number;
    updatePosition: (index: number) => void;
};

const Pagination = (props: PaginationProps) => {
    const { data, centerSlideDataIndex, updatePosition } = props;

    return (
        <div className={styles.pagination}>
            {data.map((_: any, index: number) => {
                const isCenterSlide = centerSlideDataIndex === index;
                return (
                    <div
                        key={index}
                        onClick={() => { updatePosition(index) }}
                        className={cn(styles['pagination-dot'], isCenterSlide ? styles.active : '')}
                    />
                );
            })}
        </div>
    );
};

export default React.memo(Pagination);