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

const ContactUs = ({ lessons, lessonsArmenian }: Readonly<Props>) => {
    const activeLocale = useLocale();
    const pathname = usePathname();
    let isOpen = true;

    switch (pathname) {
        case `/${activeLocale}/design/contact`:
            isOpen = false
            break;
        case `/${activeLocale}/design/orders`:
            isOpen = false
            break;
        case `/${activeLocale}/design`:
            isOpen = false
            break;
        default:
            isOpen = true
    };

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