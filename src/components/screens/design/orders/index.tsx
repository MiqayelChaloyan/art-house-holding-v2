'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import OrderForm from './Form';

import { designFont } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    lessons: SELECT_OPTIONS_DESIGN_QUERYResult;
    lessonsArmenian: SELECT_OPTIONS_DESIGN_QUERYResult;
    selectedSlug?: string;
};

const Home = ({ lessons, lessonsArmenian, selectedSlug }: Readonly<Props>) => {
    const t = useTranslations('form-page');

    return (
        <section className={cn(styles.section, designFont.ui)}>
            <div className={styles.wrap}>
                <div className={styles.grid}>
                    <div className={styles.copy}>
                        <p className={styles.eyebrow}>
                            <span className={styles.mark} aria-hidden />
                            {t('eyebrow')}
                        </p>
                        <h1 className={cn(styles.headline, designFont.serif)}>
                            <span>{keepWords(t('line-1'))}</span>
                            <span className={styles.emphasis}>{keepWords(t('line-2'))}</span>
                        </h1>
                        <p className={styles.lead}>{t('lead')}</p>
                    </div>
                    <OrderForm
                        lessons={lessons}
                        lessonsArmenian={lessonsArmenian}
                        selectedSlug={selectedSlug}
                    />
                </div>
            </div>
        </section>
    );
};

export default React.memo(Home);
