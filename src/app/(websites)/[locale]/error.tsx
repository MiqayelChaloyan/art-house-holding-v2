'use client';

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from './error.module.sass';

interface Props {
    reset: () => void;
};

export default function Error({ reset }: Readonly<Props>) {
    const t = useTranslations('texts');

    return (
        <section className={styles.error} role="alert" aria-live="polite">
            <h2>{t('error-title')}</h2>
            <p>{t('error-description')}</p>
            <div className={styles.actions}>
                <button type="button" onClick={reset}>
                    {t('error-retry')}
                </button>
                <Link href="/">{t('error-home')}</Link>
            </div>
        </section>
    );
}
