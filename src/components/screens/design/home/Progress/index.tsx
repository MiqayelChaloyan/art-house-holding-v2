'use client'

import React, { useMemo } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import Container from '@/src/components/components/container';
import ProgressItem from '@/src/lib/ui/progress';

import { Inter } from '@/src/constants/font';
import { Pages } from '@/src/constants/pages';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: PROGRESS[];
};

const Progress = ({ data }: Readonly<Props>) => {
    const t = useTranslations();
    const locale = useLocale();

    const items = useMemo(() => (data || []).map((item: PROGRESS) => (
        <div key={item._key} className={styles.column}>
            <ProgressItem value={0} quantity={item.quantity} isPlusSign={item.isPlusSign} />
            <p className={styles.title}>{item.title}</p>
        </div>
    )), [data]);

    return (
        <section id="circle-progress" className={cn(styles.container, Inter.className)}>
            <Container className="container">
                <div className={styles.actions}>
                    <Link
                        href={`/${locale}${Pages.DESIGN_CONTACT}`}
                        className={styles.register}
                    >
                        {t('buttons.register-now')}
                    </Link>
                </div>
                <div className={styles.row}>
                    {items}
                </div>
            </Container>
        </section>
    );
};

export default React.memo(Progress);
