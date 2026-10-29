'use client'

import React from 'react';

import Promotion from '@/src/lib/ui/promotion';

import styles from './styles.module.sass';


interface Props {
    data: DISCOUNTS_QUERYResult;
};

const Promotions = ({ data }: Readonly<Props>) => {
    const promotions: JSX.Element[] = data?.discounts_list.map((discount: DISCOUNTS_LANGUAGE, index: number) =>
        <Promotion key={discount._key} discount={discount} index={index} classNameProperty='large' />);

    return (
        <section id='promotions'>
            <div className={styles.discounts}>
                {promotions}
            </div>
        </section>
    )
};

export default React.memo(Promotions);