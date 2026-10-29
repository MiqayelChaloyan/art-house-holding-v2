'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import TeacherWithWorks from './TeacherWithWorks';
import Container from '@/src/components/components/container';

import { Inter } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: SPECIALIST[];
};

const Specialists = ({ data }: Readonly<Props>) => {
    const t = useTranslations('sections');

    return (
        <section id='specialists' className={styles.container}>
            <div className={styles.triangle} />
            <Container className='container'>
                <h1 className={cn(styles.title, Inter.className)}>
                    {t('specialists')}
                </h1>
                <div className={styles.specialists}>
                    <TeacherWithWorks data={data} />
                </div>
            </Container>
        </section>
    );
};

export default React.memo(Specialists);


