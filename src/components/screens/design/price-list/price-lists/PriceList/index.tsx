'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import useWindowSize from '@/src/hooks/useWindowSize';

import TableList from '../TableList';
import AccordionList from '../AccordionList';

import { Arial } from '@/src/constants/font';
import { Titles } from '@/src/constants';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: PRICES[];
};

const PriceList = ({ data }: Readonly<Props>) => {
    const t = useTranslations('sections');
    const windowSize = useWindowSize();

    return (
        <section id='price-list' className={styles.container}>
            <div className={styles.titles}>
                <div>
                    <div className={cn(styles['title-line'], styles['back-line'])} />
                    <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.priceList}</h2>
                </div>
                <div className={styles['bottom-title']}>
                    <h1 className={cn(styles.title, Arial.className)}>{t('price-list')}</h1>
                    <div className={cn(styles['title-line'], styles['bottom-line'])} />
                </div>
            </div>
            <div>
                {windowSize.width < 600 ?
                    <AccordionList data={data} /> :
                    <TableList data={data} />
                }
            </div>
        </section>
    )
};

export default React.memo(PriceList);