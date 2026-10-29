'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import cn from 'classnames';

import styles from './styles.module.sass';

interface Props {
    className?: string;
};

const Copyright = ({ className }: Readonly<Props>) => {
    const currentYear = new Date().getFullYear();
    const t = useTranslations('texts');

    return (
        <p className={cn(styles.copyright, className)} aria-label={t('rights')}>
            {`© ${currentYear}. ${t('rights')}.`}
        </p>
    );
};

export default React.memo(Copyright);
