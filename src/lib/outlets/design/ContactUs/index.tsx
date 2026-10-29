'use client'

import React from 'react';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

import ContactUsForm from '@/src/components/components/form-design';

import styles from './styles.module.sass';


interface Props {
    lessons: SELECT_OPTIONS_DESIGN_QUERYResult;
    lessonsArmenian: SELECT_OPTIONS_DESIGN_QUERYResult;
};

const hiddenOn = (locale: string) => ([
    `/${locale}/design`,
    `/${locale}/design/about`,
    `/${locale}/design/contact`,
    `/${locale}/design/orders`,
    `/${locale}/design/privacy`,
    `/${locale}/design/terms`,
    `/${locale}/design/imprint`,
]);

const ContactUs = ({ lessons, lessonsArmenian }: Readonly<Props>) => {
    const activeLocale = useLocale();
    const pathname = usePathname();
    const isOpen = !hiddenOn(activeLocale).includes(pathname.replace(/\/$/, ''));

    return isOpen && (
        <div className={styles['form-container']}>
            <div className={styles.line} />
            <ContactUsForm
                lessons={lessons}
                lessonsArmenian={lessonsArmenian}
                classNameProperty='small'
            />
            <div className={styles.line} />
        </div>
    )
};

export default React.memo(ContactUs);