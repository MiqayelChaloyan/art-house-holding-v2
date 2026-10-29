'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/src/components/components/container';

import { Inter } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    price_list: PRICE_LIST[];
};

const PriceList = ({ price_list }: Readonly<Props>) => {
    const t = useTranslations();

    const table = price_list?.map((item: PRICE_LIST) => (
        <table key={item._key} className={styles.price_list_table}>
            <thead>
                <tr className={styles.list}>
                    <td>{item?.course_title}</td>
                    <td>{item?.amount} AMD</td>
                    <td>{item?.duration}</td>
                    <td>{`${item?.duration_of_class} ${t('price-list.hour')}`}</td>
                </tr>
            </thead>
        </table>
    ));

    return (
        <section id='price-list' className={styles.section}>
            <Container className='container'>
                <div className={styles.table}>
                    <h1 className={cn(styles.title, Inter.className)}>
                        {t('sections.price-list')}
                    </h1>
                    {table}
                </div>
            </Container>
        </section>
    );
};

export default React.memo(PriceList);