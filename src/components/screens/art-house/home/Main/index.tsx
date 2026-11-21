'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/src/components/components/container';
import { ArianAMU } from '@/src/constants/font';

import Clock from './Clock';

import cn from 'classnames';

import styles from './styles.module.sass';


const Main = () => {
    const t = useTranslations('texts');

    return (
        <section id='main' className={styles.section}>
            <Container className='container'>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.watch}>
                            <Clock />
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.art_house_logo} />
                        <p className={cn(styles.text, ArianAMU.className)}>
                            {t('main-title')}
                        </p>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.flash_light} />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(Main);
