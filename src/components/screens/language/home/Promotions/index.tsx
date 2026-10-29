'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/src/components/components/container';

import Promotion from '@/src/lib/ui/promotion';
import { Vrdznagir } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    discounts: DISCOUNTS_QUERYResult;
};

const Promotions = ({ discounts }: Props) => {
    const lastFour: DISCOUNTS_LANGUAGE[] = discounts?.discounts_list.slice(-4);
    const t = useTranslations();

    return (
        <section id='promotions' className={styles.section}>
            <Container className='container'>
                <h2 className={cn(styles.title, Vrdznagir.className)}>
                    {t('navigation.promotions')}
                </h2>
                <div className={styles.discounts}>
                    {lastFour?.map((discount: DISCOUNTS_LANGUAGE, index: number) =>
                        <Promotion
                            key={discount?._key}
                            discount={discount}
                            index={index}
                            classNameProperty='small'
                        />)
                    }
                </div>
            </Container>
        </section>
    )
};

export default React.memo(Promotions);