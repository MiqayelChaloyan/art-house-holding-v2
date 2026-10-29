'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import OrderForm from './Form';
import OrdersGallery from './OrdersGallery';

import { Arial } from '@/src/constants/font';
import { Titles } from '@/src/constants';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
  courses: COURSES_DESIGN_QUERYResult[];
  orders: ORDER_Result[] | any[];
  ordersArmenian: ORDER_Result[] | any[];
};

const Home = ({ courses, orders, ordersArmenian }: Readonly<Props>) => {
  const t = useTranslations('sections');

  return (
    <section id='orders' className={styles.container}>
      <div className={styles.titles}>
        <div>
          <div className={cn(styles['title-line'], styles['back-line'])} />
          <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.orders}</h2>
        </div>
        <div className={styles['bottom-title']}>
          <h1 className={cn(styles.title, Arial.className)}>{t('orders')}</h1>
          <div className={cn(styles['title-line'], styles['bottom-line'])} />
        </div>
      </div>
      <OrdersGallery courses={courses} />
      <div className={styles['form-container']}>
        <div className={styles.line} />
        <OrderForm orders={orders} ordersArmenian={ordersArmenian} />
        <div className={styles.line} />
      </div>
    </section>
  );
};

export default React.memo(Home);