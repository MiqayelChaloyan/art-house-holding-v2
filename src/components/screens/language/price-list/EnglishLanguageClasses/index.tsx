'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import { Arial } from '@/src/constants/font';

import styles from './styles.module.sass';


interface EnglishLanguageClassesProps {
    data: ENGLISH_COURSE[];
};

const EnglishLanguageClasses= ({ data }: Readonly<EnglishLanguageClassesProps>) => {
    const t = useTranslations();

    const tableRows: JSX.Element[] = data?.map((item: ENGLISH_COURSE) => {
        return (
            <tr key={item._key}>
                <td>{item.language_type}</td>
                <td>{item.private_lessons}</td>
                <td>{item.duration}</td>
            </tr>
        );
    });

    return (
        <div className={Arial.className}>
            <h1 className={styles.title}>
                {t('titles.english-language-lessons')}
            </h1>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan={2} colSpan={1}>
                                {t('tables-titles.english')}
                            </th>
                            <th rowSpan={1} colSpan={1}>
                                {t('tables-titles.private-lessons')}
                            </th>
                            <th rowSpan={2} colSpan={1}>
                                {t('tables-titles.duration')}
                            </th>
                        </tr>
                        <tr>
                            <th>
                                {t('tables-titles.three-days-week')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default React.memo(EnglishLanguageClasses);