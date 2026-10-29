'use client'

import React from 'react';

import Container from '@/src/components/components/container';

import Courses from './Courses';

import { Inter } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: SECTON;
};

const News = ({ data }: Readonly<Props>) => (


    <>
        <div className={styles.shapes}>
            <div className={styles['rounds']}>
                <div className={cn(styles.shape, styles['shape-1'])}>
                    <h1 className={cn(styles.title, data?.section_title.length >= 30 ? styles['title-large'] : styles['title-small'])}>
                        {data?.section_title}
                    </h1>
                </div>
                <div className={cn(styles.shape, styles['shape-2'])} />
            </div>
        </div>
        <section id='cooking-courses' className={styles.container}>
            <Container className='container'>
                <div className={styles.news}>
                    <Courses data={data?.lessons} />
                </div>
            </Container>
        </section>
    </>
);

export default React.memo(News);